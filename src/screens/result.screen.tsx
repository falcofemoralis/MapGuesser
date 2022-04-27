import * as turf from '@turf/turf';
import { round } from '@turf/turf';
import { toJS } from 'mobx';
import React from 'react';
import { BackHandler, Image, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { GameButton } from '../components/interface/GameButton/GameButton';
import { Colors } from '../constants/colors';
import { Misc } from '../constants/misc';
import { Mode } from '../constants/mode';
import { GlobalStyles } from '../constants/styles';
import { gameStore } from '../store/game.store';
import Props from '../types/props.type';

const ResultScreen: React.FC<Props<'Result'>> = ({ route, navigation }) => {
  const mapRef = React.useRef<MapView | null>(null);
  const currentCoordinates = { ...route.params.from }; // spread fix error
  const selectedCoordinates = { ...route.params.to };
  const from = turf.point([currentCoordinates?.latitude, currentCoordinates?.longitude]);
  const to = turf.point([selectedCoordinates?.latitude, selectedCoordinates?.longitude]);
  const distance = turf.distance(from, to, { units: 'kilometers' }).toFixed(3); // calculated distance

  /**
   * BackPress override.
   */
  BackHandler.addEventListener('hardwareBackPress', () => true);

  const calcXp = (): number => {
    // TODO EXP FORMULA
    // const ZERO_XP = 5000.0;
    // const XP_PER_KM = 1.2;
    // const km = (ZERO_XP - Number.parseFloat(distance));
    // if(km > 0) {

    // } else{
    //   return 0;
    // }
    // return (ZERO_XP - Number.parseFloat(distance))
    return 10;
  };

  const calcAccuracy = (): number => {
    // const ZERO_ACCURACY = 5000.0; // in km
    // const accuracy = 100 - (100.0 * Number.parseFloat(distance)) / ZERO_ACCURACY;
    // return accuracy;
    return 1;
  };

  /**
   * Navigate to nextRound
   */
  const onNextRound = async () => {
    const data = route.params.data;
    if (data) {
      navigation.replace('Game', { mode: route.params.mode, gameType: route.params.gameType, data: { ...data, round: data.round + 1 } });
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
    accuracy: calcAccuracy(),
    playtime: route.params.playtime,
    xp: calcXp()
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
          <Image source={require('../assets/final_user.png')} style={{ width: 26, height: 28 }} resizeMode='contain' />
        </Marker>
        <Marker coordinate={selectedCoordinates} />
        <Polyline coordinates={[currentCoordinates, selectedCoordinates]} />
        {route.params.mode === Mode.ROUND &&
          route.params.data &&
          route.params.data?.round + 1 == Misc.MAX_ROUNDS &&
          toJS(gameStore.rounds).map(round => (
            <>
              <Marker coordinate={round.from}>
                <Image source={require('../assets/final_user.png')} style={{ width: 26, height: 28 }} resizeMode='contain' />
              </Marker>
              <Marker coordinate={round.to} />
              <Polyline coordinates={[round.from, round.to]} />
            </>
          ))}
      </MapView>
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            Your place was <Text style={styles.resultTextBold}>{distance}km</Text> away from the correct location.
          </Text>
          <Text style={[styles.resultText, { marginTop: 5 }]}>
            Received <Text style={styles.resultTextBold}>500</Text> points.
          </Text>
          <View style={GlobalStyles.rcc}>
            <GameButton img={require('../assets/settings.png')} text='Main menu' onPress={toMenu} />
            {route.params.mode === Mode.ROUND && route.params.data && route.params.data?.round + 1 !== Misc.MAX_ROUNDS && (
              <GameButton img={require('../assets/settings.png')} text='Next round' onPress={onNextRound} />
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
    fontSize: 20
  },
  resultTextBold: {
    fontWeight: 'bold',
    color: Colors.primaryColor
  }
});

export default ResultScreen;
