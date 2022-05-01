import { toJS } from 'mobx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { AdEventType, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Progress from 'react-native-progress';
import { Banner } from '../components/Banner/Banner';
import { GameButton } from '../components/interface/GameButton/GameButton';
import { Mode } from '../constants/mode';
import { Position } from '../constants/position';
import { Unit } from '../constants/unit';
import ProgressManager from '../managers/progress.manager';
import { gameStore } from '../store/game.store';
import { settingsStore } from '../store/settings.store';
import Props from '../types/props.type';
import { Colors } from '../values/colors';
import { Dimens } from '../values/dimens';
import { Misc } from '../values/misc';
import { GlobalStyles } from '../values/styles';
import turfDistance from '@turf/distance';
import { point } from '@turf/helpers';

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing']
});

const ResultScreen: React.FC<Props<'Result'>> = ({ route, navigation }) => {
  const { t } = useTranslation();
  const mapRef = React.useRef<MapView | null>(null);
  const currentCoordinates = { ...route.params.from }; // spread fix error
  const selectedCoordinates = { ...route.params.to };
  const from = point([currentCoordinates?.latitude, currentCoordinates?.longitude]);
  const to = point([selectedCoordinates?.latitude, selectedCoordinates?.longitude]);
  const distance = turfDistance(from, to, { units: Unit.KM });
  const miles = turfDistance(from, to, { units: Unit.ML });
  const xp = ProgressManager.xp(distance);
  const accuracy = ProgressManager.accuracy(distance);
  const playtime = route.params.playtime;

  const isRounds = () => route.params.mode === Mode.ROUND && route.params.data;
  const isMoreRounds = () => isRounds() && (route.params.data?.round ?? 0) + 1 !== Misc.MAX_ROUNDS;
  const isLastRound = () => isRounds() && (route.params.data?.round ?? 0) + 1 == Misc.MAX_ROUNDS;

  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  /**
   * BackPress override.
   */
  BackHandler.addEventListener('hardwareBackPress', () => true);

  /**
   * Navigate to nextRound
   */
  const onNextRound = async () => {
    const data = route.params.data;
    if (loaded && settingsStore.adsCounter % Misc.ADS_PER_COUNTER == 0) {
      interstitial.show();
    }

    settingsStore.updateAdsCounter();

    if (data) {
      navigation.replace('Game', { mode: route.params.mode, game: route.params.game, data: { ...data, round: (data.round ?? 0) + 1 } });
    }
  };

  /**
   * Navigate to main menu
   */
  const toMenu = () => {
    if (isRounds()) {
      gameStore.resetRounds();
    }

    if (loaded && settingsStore.adsCounter % Misc.ADS_PER_COUNTER == 0) {
      interstitial.show();
    }

    settingsStore.updateAdsCounter();

    navigation.replace('Main');
  };

  const getDistance = () => {
    return `${settingsStore.unit == Unit.KM ? distance.toFixed(3) : miles.toFixed(3)} ${settingsStore.unit == Unit.KM ? t('KM_SHORT') : t('ML_SHORT')}`;
  };

  const getXP = () => {
    return Number.parseInt(xp.toFixed(1));
  };

  const getXProgress = () => {
    return getXP() / Misc.MAX_XP;
  };

  if (isMoreRounds()) {
    gameStore.addRound({ from: currentCoordinates, to: selectedCoordinates });
  }

  gameStore.updateProgress({
    playtime,
    accuracy: [accuracy],
    xp,
    lvl: 0,
    totalXp: xp
  });

  return (
    <>
      <Banner position={Position.TOP} />
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
        <Marker coordinate={currentCoordinates}>
          <Image source={require('../assets/user.png')} style={styles.userMarker} resizeMode='contain' />
        </Marker>
        <Marker coordinate={selectedCoordinates} />
        <Polyline coordinates={[currentCoordinates, selectedCoordinates]} />
        {isLastRound() &&
          toJS(gameStore.rounds).map(round => (
            <>
              <Marker coordinate={round.from}>
                <Image source={require('../assets/user.png')} style={styles.userMarker} resizeMode='contain' />
              </Marker>
              <Marker coordinate={round.to} />
              <Polyline coordinates={[round.from, round.to]} />
            </>
          ))}
      </MapView>
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultTextXP}>
            {getXP()} {t('RECEIVED_POINTS_2')}
          </Text>
          <Progress.Bar style={styles.bar} progress={getXProgress()} width={Dimensions.get('window').width - 50} />
          <Text style={styles.resultText}>
            {t('RESULT_DISTANCE_1')} <Text style={styles.resultTextBold}>{getDistance()}</Text> {t('RESULT_DISTANCE_2')}
          </Text>
          {/* <Text style={[styles.resultText, { marginTop: 5 }]}>
            Playtime <Text style={styles.resultTextBold}>{ProgressManager.getTotalPlaytime(playtime)}</Text> TODOminutes.
          </Text> */}
          <View style={GlobalStyles.rcc}>
            <GameButton img={require('../assets/menu.png')} text={t('MAIN_MENU')} onPress={toMenu} />
            {isMoreRounds() && <GameButton img={require('../assets/next.png')} text={t('NEXT_ROUND')} onPress={onNextRound} />}
          </View>
        </View>
      </View>
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
  }
});

export default ResultScreen;
