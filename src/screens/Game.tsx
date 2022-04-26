import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { LatLng } from 'react-native-maps';
import Mapillary from '../components/Mapillary/Mapillary';
import MapPanel from '../components/MapPanel/MapPanel';
import { Strings } from '../constants/strings';
import { RootStackParamList } from '../screens';
import { gameStore } from '../store/GameStore';
import { TopProgressBar } from '../components/TopProgressBar/TopProgressBar';

type gameScreenProp = StackNavigationProp<RootStackParamList, 'Game'>;

const Game = () => {
  let isCompleted = false;
  const navigation = useNavigation<gameScreenProp>();

  /**
   * BackPress override. If game wasn't complete - show Alert dialog, otherwise navigate to
   */
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();

        if (!isCompleted) {
          Alert.alert(Strings.leaveGame, Strings.leaveGameHint, [
            { text: Strings.stay, style: 'cancel', onPress: () => {} },
            {
              text: Strings.leave,
              style: 'destructive',
              onPress: () => {
                isCompleted = true;
                navigation.navigate('Main');
              }
            }
          ]);
        } else {
          navigation.dispatch(e.data.action);
        }
      }),
    [navigation]
  );

  /**
   * Triggered when user moves on the map
   * @param coordinates - current user coordinates
   */
  const onMove = (coordinates: LatLng) => {
    gameStore.currentCoordinates = coordinates;
  };

  /**
   * Triggered when user set marker on the map
   * @param coordinates - marker coordinates
   */
  const onMarkerSet = (coordinates: LatLng) => {
    gameStore.selectedCoordinates = coordinates;
  };

  /**
   * Triggered when user press complete button
   */
  const handleComplete = () => {
    if (gameStore.currentCoordinates && gameStore.selectedCoordinates) {
      isCompleted = true;
      navigation.navigate('Result', { from: gameStore.currentCoordinates, to: gameStore.selectedCoordinates });
    }
  };

  return (
    <>
      <TopProgressBar style={styles.progress} />
      <Mapillary onMove={onMove} />
      <MapPanel onMarkerSet={onMarkerSet} onComplete={handleComplete} buttonStyle={styles.mapBtn} />
    </>
  );
};

const styles = StyleSheet.create({
  progress: {
    position: 'absolute',
    top: 10,
    zIndex: 10
  },
  mapBtn: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    zIndex: 1
  }
});

export default Game;
