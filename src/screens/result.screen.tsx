import * as turf from '@turf/turf';
import { toJS } from 'mobx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, Image, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { GameButton } from '../components/interface/GameButton/GameButton';
import { Mode } from '../constants/mode';
import { Unit } from '../constants/unit';
import ProgressManager from '../managers/progress.manager';
import { gameStore } from '../store/game.store';
import { settingsStore } from '../store/settings.store';
import Props from '../types/props.type';
import { Colors } from '../values/colors';
import { Dimens } from '../values/dimens';
import { Misc } from '../values/misc';
import { GlobalStyles } from '../values/styles';

const ResultScreen: React.FC<Props<'Result'>> = ({ route, navigation }) => {
  const { t } = useTranslation();
  const mapRef = React.useRef<MapView | null>(null);
  const currentCoordinates = { ...route.params.from }; // spread fix error
  const selectedCoordinates = { ...route.params.to };
  const from = turf.point([currentCoordinates?.latitude, currentCoordinates?.longitude]);
  const to = turf.point([selectedCoordinates?.latitude, selectedCoordinates?.longitude]);
  const distance = turf.distance(from, to, { units: Unit.KM });
  const miles = turf.distance(from, to, { units: Unit.ML });
  const xp = ProgressManager.xp(distance);
  const accuracy = ProgressManager.accuracy(distance);
  const playtime = route.params.playtime;

  const isRounds = () => route.params.mode === Mode.ROUND && route.params.data;
  const isMoreRounds = () => isRounds() && (route.params.data?.round ?? 0) + 1 !== Misc.MAX_ROUNDS;
  const isLastRound = () => isRounds() && (route.params.data?.round ?? 0) + 1 == Misc.MAX_ROUNDS;

  /**
   * BackPress override.
   */
  BackHandler.addEventListener('hardwareBackPress', () => true);

  /**
   * Navigate to nextRound
   */
  const onNextRound = async () => {
    const data = route.params.data;
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
    navigation.replace('Main');
  };

  const getDistance = () => {
    return `${settingsStore.unit == Unit.KM ? distance.toFixed(3) : miles.toFixed(3)} ${settingsStore.unit == Unit.KM ? t('KM_SHORT') : t('ML_SHORT')}`;
  };

  const getXP = () => {
    return Number.parseInt(xp.toFixed(1));
  };

  if (isMoreRounds()) {
    gameStore.addRound({ from: currentCoordinates, to: selectedCoordinates });
  }

  gameStore.updateProgress({
    playtime,
    accuracy: [accuracy],
    xp,
    lvl: 0
  });

  return (
    <>
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
          <Text style={styles.resultText}>
            {t('RESULT_DISTANCE_1')} <Text style={styles.resultTextBold}>{getDistance()}</Text> {t('RESULT_DISTANCE_2')}
          </Text>
          <Text style={styles.resultText}>
            {t('RECEIVED_POINTS_1')} <Text style={styles.resultTextBold}>{getXP()}</Text> {t('RECEIVED_POINTS_2')}
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
  userMarker: {
    width: 26,
    height: 28
  }
});

export default ResultScreen;
