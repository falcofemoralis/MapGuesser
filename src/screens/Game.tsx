import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as turf from '@turf/turf';
import React from 'react';
import { LatLng } from 'react-native-maps';
import MapButton from '../components/MapButton/MapButton';
import Mapillary from '../components/Mapillary/Mapillary';
import { RootStackParamList } from '../screens';
import { gameStore } from '../store/GameStore';
import { generateCoordinate } from '../utils/CoordinatesUtil';
import { StyleSheet } from 'react-native';

type gameScreenProp = StackNavigationProp<RootStackParamList, 'Game'>;

const Game = () => {
  console.log('Game');

  const navigation = useNavigation<gameScreenProp>();

  const onMove = (coordinates: LatLng) => {
    gameStore.currentCoordinates = coordinates;
  };

  const onMarkerSet = (coordinates: LatLng) => {
    gameStore.selectedCoordinates = coordinates;
  };

  const handleComplete = () => {
    if (gameStore.currentCoordinates && gameStore.selectedCoordinates) {
      navigation.navigate('Result', { from: gameStore.currentCoordinates, to: gameStore.selectedCoordinates });
    }
  };

  return (
    <>
      <Mapillary onMove={onMove} />
      <MapButton onMarkerSet={onMarkerSet} onComplete={handleComplete} style={styles.mapBtn} />
    </>
  );
};

const styles = StyleSheet.create({
  mapBtn: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    width: 80,
    height: 80
  }
});

export default Game;
