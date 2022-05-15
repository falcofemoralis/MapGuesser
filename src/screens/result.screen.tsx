import turfDistance from '@turf/distance';
import { point } from '@turf/helpers';
import { toJS } from 'mobx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { AdEventType, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import MapView, { LatLng, Marker, Polyline } from 'react-native-maps';
import * as Progress from 'react-native-progress';
import { Banner } from '../components/Banner/Banner';
import { GameButton } from '../components/interface/GameButton/GameButton';
import { GameMode } from '../constants/gamemode';
import { Position } from '../constants/position';
import { Unit } from '../constants/unit';
import ProgressManager from '../managers/progress.manager';
import { gameStore } from '../store/game.store';
import { settingsStore } from '../store/settings.store';
import { userStore } from '../store/user.store';
import Props from '../types/props.type';
import { Colors } from '../values/colors';
import { Dimens } from '../values/dimens';
import { Keys } from '../values/keys';
import { Misc } from '../values/misc';
import { GlobalStyles } from '../values/styles';

const interstitial = InterstitialAd.createForAdRequest(__DEV__ ? TestIds.INTERSTITIAL : Keys.interstellarIds.ResultScreenNext);

const ResultScreen: React.FC<Props<'Result'>> = ({ route, navigation }) => {
  const { t } = useTranslation();
  const gameSettings = route.params.gameSettings;
  const mapRef = React.useRef<MapView | null>(null); // ref to map
  const currentCoordinates = { ...route.params.from }; // spread fix error
  const selectedCoordinates = { ...route.params.to };
  const from = point([currentCoordinates?.latitude, currentCoordinates?.longitude]); // 'from' point
  const to = point([selectedCoordinates?.latitude, selectedCoordinates?.longitude]); // 'to' point
  const distance = turfDistance(from, to, { units: Unit.KM }); // calculate distance between 'from' and 'to' points (in km)
  const miles = turfDistance(from, to, { units: Unit.ML }); // in miles
  const xp = ProgressManager.xp(distance); // calculate xp
  const accuracy = ProgressManager.accuracy(distance); // calculate accuracy
  const playtime = route.params.playtime; // user playtime
  const [interstitialLoaded, setInterstitialLoaded] = React.useState(false);

  /**
   * Check round functions
   */
  const isMoreRounds = () => gameStore.rounds.length + 1 !== Misc.MAX_ROUNDS;
  const isLastRound = () => gameStore.rounds.length + 1 == Misc.MAX_ROUNDS;

  /**
   * Load interstitial ad
   */
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

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  /**
   * BackPress override. BackPress wil do nothing.
   */
  BackHandler.addEventListener('hardwareBackPress', () => true);

  /**
   * Navigate to next round
   */
  const toNextRound = async () => {
    if (interstitialLoaded) {
      interstitial.show();
    }
    gameStore.addRound({ from: currentCoordinates, to: selectedCoordinates });
    navigation.replace('Game', { gameSettings, playModeData: route.params.playModeData });
  };

  /**
   * Navigate to main screen
   */
  const toMainScreen = () => {
    if (gameSettings.gameMode == GameMode.ROUND) {
      gameStore.resetRounds();
    }

    if (interstitialLoaded) {
      interstitial.show();
    }

    navigation.replace('Main');
  };

  /**
   * Getters of game data
   */
  const getDistance = () =>
    `${settingsStore.unit == Unit.KM ? distance.toFixed(3) : miles.toFixed(3)} ${settingsStore.unit == Unit.KM ? t('KM_SHORT') : t('ML_SHORT')}`;
  const getXP = () => Number.parseInt(xp.toFixed(1));
  const getXProgress = () => getXP() / Misc.MAX_XP;

  /**
   * Update user progress
   */
  userStore.addProgress({
    playtime,
    accuracy: [accuracy],
    xp,
    lvl: 0,
    totalXp: xp
  });

  return (
    <>
      <Banner position={Position.TOP} id={Keys.bannersIds.ResultScreen} />
      <MapView
        ref={mapRef}
        style={styles.map}
        onMapReady={() =>
          mapRef?.current?.fitToCoordinates([selectedCoordinates, currentCoordinates], {
            edgePadding: { top: 30, right: 10, bottom: 5, left: 10 },
            animated: true
          })
        }
      >
        <UserMarker to={currentCoordinates} from={selectedCoordinates} />
        {isLastRound() && toJS(gameStore.rounds).map((round, i) => <UserMarker key={i} from={round.from} to={round.to} />)}
      </MapView>
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultTextXP}>
            {getXP()} {t('RECEIVED_POINTS_2')}
          </Text>
          <Progress.Bar style={styles.bar} color={Colors.primaryColor} progress={getXProgress()} width={Dimensions.get('window').width - 50} />
          <Text style={styles.resultText}>
            {t('RESULT_DISTANCE_1')} <Text style={styles.resultTextBold}>{getDistance()}</Text> {t('RESULT_DISTANCE_2')}
          </Text>
          {/* <Text style={[styles.resultText, { marginTop: 5 }]}>
            Playtime <Text style={styles.resultTextBold}>{ProgressManager.getTotalPlaytime(playtime)}</Text> TODOminutes.
          </Text> */}
          <View style={GlobalStyles.rcc}>
            <GameButton style={styles.gameButton} img={require('../assets/menu.png')} title={t('MAIN_MENU')} onPress={toMainScreen} />
            {gameSettings.gameMode == GameMode.ROUND && isMoreRounds() && (
              <GameButton style={styles.gameButton} img={require('../assets/next.png')} title={t('NEXT_ROUND')} onPress={toNextRound} />
            )}
          </View>
        </View>
      </View>
    </>
  );
};

interface UserMarkerProps {
  from: LatLng;
  to: LatLng;
}
const UserMarker: React.FC<UserMarkerProps> = ({ from, to }) => {
  return (
    <>
      <Marker coordinate={from}>
        <Image source={require('../assets/user.png')} style={styles.userMarker} resizeMode='contain' />
      </Marker>
      <Marker coordinate={to} />
      <Polyline coordinates={[from, to]} />
    </>
  );
};


const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '70%'
  },
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '35%', // 100 - 70 + 5
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: Colors.background
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25
  },
  resultText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: Dimens.normalText,
    marginTop: 5
  },
  resultTextBold: {
    fontWeight: 'bold',
    color: Colors.primaryColor
  },
  resultTextXP: {
    fontWeight: 'bold',
    color: Colors.primaryColor,
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

