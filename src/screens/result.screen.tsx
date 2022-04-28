import * as turf from '@turf/turf';
import { round } from '@turf/turf';
import { toJS } from 'mobx';
import React from 'react';
import { BackHandler, Image, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { GameButton } from '../components/interface/GameButton/GameButton';
import { Colors } from '../constants/colors';
import { Dimens } from '../constants/dimens';
import { Misc } from '../constants/misc';
import { Mode } from '../constants/mode';
import { GlobalStyles } from '../constants/styles';
import ProgressManager from '../managers/progress.manager';
import { gameStore } from '../store/game.store';
import Props from '../types/props.type';

const ResultScreen: React.FC<Props<'Result'>> = ({ route, navigation }) => {
  const mapRef = React.useRef<MapView | null>(null);
  const currentCoordinates = { ...route.params.from }; // spread fix error
  const selectedCoordinates = { ...route.params.to };
  const from = turf.point([currentCoordinates?.latitude, currentCoordinates?.longitude]);
  const to = turf.point([selectedCoordinates?.latitude, selectedCoordinates?.longitude]);
  const distance = turf.distance(from, to, { units: 'kilometers' }); // calculated distance
  const xp = ProgressManager.xp(distance);
  const accuracy = ProgressManager.accuracy(distance);
  const playtime = route.params.playtime;

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
      navigation.replace('Game', { mode: route.params.mode, game: route.params.game, data: { ...data, round: data.round + 1 } });
    }
  };

  /**
   * Navigate to main menu
   */
  const toMenu = () => {
    if (route.params.mode === Mode.ROUND) {
      gameStore.resetRounds();
    }
    navigation.replace('Main');
  };

  if (route.params.data && route.params.data?.round + 1 != Misc.MAX_ROUNDS) {
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
          <Image source={require('../assets/user.png')} style={{ width: 26, height: 28 }} resizeMode='contain' />
        </Marker>
        <Marker coordinate={selectedCoordinates} />
        <Polyline coordinates={[currentCoordinates, selectedCoordinates]} />
        {route.params.mode === Mode.ROUND &&
          route.params.data &&
          route.params.data?.round + 1 == Misc.MAX_ROUNDS &&
          toJS(gameStore.rounds).map(round => (
            <>
              <Marker coordinate={round.from}>
                <Image source={require('../assets/user.png')} style={{ width: 26, height: 28 }} resizeMode='contain' />
              </Marker>
              <Marker coordinate={round.to} />
              <Polyline coordinates={[round.from, round.to]} />
            </>
          ))}
      </MapView>
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            Your place was <Text style={styles.resultTextBold}>{distance.toFixed(3)}km</Text> away from the correct location.
          </Text>
          <Text style={[styles.resultText, { marginTop: 5 }]}>
            Received <Text style={styles.resultTextBold}>{Number.parseInt(xp.toFixed(1))}</Text> points.
          </Text>
          {/* <Text style={[styles.resultText, { marginTop: 5 }]}>
            Playtime <Text style={styles.resultTextBold}>{ProgressManager.getTotalPlaytime(playtime)}</Text> TODOminutes.
          </Text> */}
          <View style={GlobalStyles.rcc}>
            <GameButton img={require('../assets/menu.png')} text='Main menu' onPress={toMenu} />
            {route.params.mode === Mode.ROUND && route.params.data && route.params.data?.round + 1 !== Misc.MAX_ROUNDS && (
              <GameButton img={require('../assets/next.png')} text='Next round' onPress={onNextRound} />
            )}
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
    fontSize: Dimens.normalText
  },
  resultTextBold: {
    fontWeight: 'bold',
    color: Colors.primaryColor
  }
});

export default ResultScreen;
