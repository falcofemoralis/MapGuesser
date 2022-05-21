import { Banner } from '@/components/interface/Banner/Banner';
import { GameButton } from '@/components/interface/GameButton/GameButton';
import { Position } from '@/constants/position';
import { StreetViewMode } from '@/constants/streetviewmode';
import { Unit } from '@/constants/unit';
import ProgressManager from '@/managers/progress.manager';
import { gameStore } from '@/store/game.store';
import { settingsStore } from '@/store/settings.store';
import { userStore } from '@/store/user.store';
import { formatText } from '@/translations/formatText';
import Props from '@/types/props.type';
import { GlobalColors, GlobalDimens, GlobalStyles, Keys, Misc } from '@/values';
import turfDistance from '@turf/distance';
import { point } from '@turf/helpers';
import { toJS } from 'mobx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { AdEventType, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import MapView, { LatLng, Marker, Polyline } from 'react-native-maps';
import * as Progress from 'react-native-progress';

const interstitial = InterstitialAd.createForAdRequest(__DEV__ ? TestIds.INTERSTITIAL : Keys.interstellarIds.ResultScreenNext);

const ResultScreen: React.FC<Props<'Result'>> = ({ route, navigation }) => {
  const { t } = useTranslation();
  const gameSettings = route.params.gameSettings;
  const gameData = route.params.gameData;
  const mapRef = React.useRef<MapView | null>(null); // ref to map
  const currentCoordinates = { ...route.params.from }; // spread fix error
  const from = point([currentCoordinates?.latitude, currentCoordinates?.longitude]); // 'from' point
  const playtime = route.params.playtime; // user playtime
  const [interstitialLoaded, setInterstitialLoaded] = React.useState(false);

  let selectedCoordinates: LatLng | undefined = undefined,
    distance: number,
    miles: number,
    xp: number,
    accuracy: number;
  if (route.params.to) {
    selectedCoordinates = { ...route.params.to };
    const to = point([selectedCoordinates?.latitude, selectedCoordinates?.longitude]); // 'to' point
    distance = turfDistance(from, to, { units: Unit.KM }); // calculate distance between 'from' and 'to' points (in km)
    miles = turfDistance(from, to, { units: Unit.ML }); // in miles
    xp = ProgressManager.xp(distance); // calculate xp
    accuracy = ProgressManager.accuracy(distance); // calculate accuracy
  }

  /**
   * Check round functions
   */
  const isMoreRounds = () => gameStore.rounds.length + 1 !== gameData?.rounds;
  const isLastRound = () => gameStore.rounds.length + 1 == gameData?.rounds;

  React.useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setInterstitialLoaded(true);
    });

    console.log(`ads counter: ${settingsStore.adsCounter % Misc.ADS_PER_COUNTER}`);
    if (settingsStore.adsCounter % Misc.ADS_PER_COUNTER == 0) {
      // Start loading the interstitial straight away
      interstitial.load();
    }
    settingsStore.updateAdsCounter();

    if (accuracy && xp) {
      userStore.addProgress({
        playtime,
        accuracy: [accuracy],
        xp,
        lvl: 0,
        totalXp: xp
      });
    }

    if (selectedCoordinates) {
      if (gameSettings.streetViewMode == StreetViewMode.FREE) {
        userStore.updateCoins(Misc.COINS_PER_FREE_GAME, '+');
      }
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);

    // Unsubscribe from events on unmount
    return () => {
      unsubscribe();
      backHandler.remove();
    };
  }, []);

  /**
   * BackPress override. BackPress wil do nothing.
   */
  const onBackPress = () => {
    console.log('stuck here 1');

    return true;
  };
  BackHandler.addEventListener('hardwareBackPress', onBackPress);

  const resetScreen = () => {
    BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  };

  /**
   * Navigate to next round
   */
  const toNextRound = async () => {
    if (interstitialLoaded) {
      interstitial.show();
    }
    resetScreen();
    gameStore.addRound({ from: currentCoordinates, to: selectedCoordinates });
    navigation.replace('Game', { gameSettings, gameData: route.params.gameData });
  };

  /**
   * Navigate to main screen
   */
  const toMainScreen = () => {
    if (gameSettings.isRounds) {
      gameStore.resetRounds();
    }

    if (interstitialLoaded) {
      interstitial.show();
    }

    resetScreen();
    navigation.replace('Main');
  };

  /**
   * Getters of game data
   */
  const getDistance = () =>
    `${settingsStore.unit == Unit.KM ? distance.toFixed(3) : miles.toFixed(3)} ${settingsStore.unit == Unit.KM ? t('KM_SHORT') : t('ML_SHORT')}`;
  const getXP = () => Number.parseInt(xp.toFixed(1));
  const getXProgress = () => getXP() / Misc.MAX_XP;

  return (
    <>
      <Banner position={Position.TOP} id={Keys.bannersIds.ResultScreen} />
      <MapView
        ref={mapRef}
        style={(styles.map, { height: selectedCoordinates ? SUCCESS_HEIGHT + '%' : TIME_EXPIRED_HEIGHT + '%' })}
        onMapReady={() => {
          const fitTo = selectedCoordinates ? [selectedCoordinates, currentCoordinates] : [currentCoordinates];
          mapRef?.current?.fitToCoordinates(fitTo, {
            edgePadding: { top: 30, right: 10, bottom: 5, left: 10 },
            animated: true
          });
        }}
      >
        <UserMarker from={currentCoordinates} to={selectedCoordinates} />
        {/** Other rounds except the latest one */}
        {isLastRound() && toJS(gameStore.rounds).map((round, i) => <UserMarker key={i} from={round.from} to={round.to} />)}
      </MapView>
      <View style={[styles.container, { height: selectedCoordinates ? 100 - SUCCESS_HEIGHT + '%' : 100 - TIME_EXPIRED_HEIGHT + '%' }]}>
        <View style={styles.resultContainer}>
          {selectedCoordinates ? (
            <>
              {formatText(t('RECEIVED_POINTS'), styles.resultTextXP, { style: styles.resultTextBold, text: getXP() })}
              <Progress.Bar style={styles.bar} color={GlobalColors.primaryColor} progress={getXProgress()} width={Dimensions.get('window').width - 50} />
              {formatText(t('RESULT_DISTANCE'), styles.resultText, { style: styles.resultTextBold, text: getDistance() })}
            </>
          ) : (
            <Text style={styles.resultText}>{t('TIME_EXPIRED')}</Text>
          )}

          <View style={GlobalStyles.rcc}>
            <GameButton style={styles.gameButton} img={require('@/assets/menu.png')} title={t('MAIN_MENU')} onPress={toMainScreen} />
            {gameSettings.isRounds && isMoreRounds() && (
              <GameButton style={styles.gameButton} img={require('@/assets/next.png')} title={t('NEXT_ROUND')} onPress={toNextRound} />
            )}
          </View>
        </View>
      </View>
    </>
  );
};

interface UserMarkerProps {
  from: LatLng;
  to?: LatLng;
}
const UserMarker: React.FC<UserMarkerProps> = ({ from, to }) => {
  return (
    <>
      <Marker coordinate={from}>
        <Image source={require('@/assets/user.png')} style={styles.userMarker} resizeMode='contain' />
      </Marker>
      {to && (
        <>
          <Marker coordinate={to} />
          <Polyline coordinates={[from, to]} />
        </>
      )}
    </>
  );
};

const SUCCESS_HEIGHT = 65;
const TIME_EXPIRED_HEIGHT = 77;

const styles = StyleSheet.create({
  map: {
    width: '100%'
  },
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: GlobalColors.background
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25
  },
  resultText: {
    color: GlobalColors.white,
    textAlign: 'center',
    fontSize: GlobalDimens.normalText,
    marginTop: 5
  },
  resultTextBold: {
    fontWeight: 'bold',
    color: GlobalColors.primaryColor
  },
  resultTextXP: {
    fontWeight: 'bold',
    color: GlobalColors.primaryColor,
    fontSize: 30
  },
  userMarker: {
    width: 26,
    height: 28
  },
  bar: {
    marginTop: 5,
    marginBottom: 5
  },
  gameButton: {
    margin: 10
  }
});

export default ResultScreen;
