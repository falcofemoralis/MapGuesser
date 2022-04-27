import React from 'react';
import { Alert, BackHandler, StyleSheet } from 'react-native';
import { LatLng } from 'react-native-maps';
import Mapillary from '../components/Mapillary/Mapillary';
import MapPanel from '../components/MapPanel/MapPanel';
import { TopProgressBar } from '../components/TopProgressBar/TopProgressBar';
import { Misc } from '../constants/misc';
import { Mode } from '../constants/mode';
import { Strings } from '../constants/strings';
import Props from '../types/props.type';

const GameScreen: React.FC<Props<'Game'>> = ({ navigation, route }) => {
  let fromCoordinates: LatLng, toCoordinates: LatLng;
  let startTime = -1;

  /**
   * BackPress override. If game wasn't complete - show Alert dialog, otherwise navigate to
   */
  const onBackPress = () => {
    Alert.alert(Strings.leaveGame, Strings.leaveGameHint, [
      { text: Strings.stay, style: 'cancel', onPress: () => {} },
      {
        text: Strings.leave,
        style: 'destructive',
        onPress: () => {
          BackHandler.removeEventListener('hardwareBackPress', onBackPress);
          navigation.replace('Main');
        }
      }
    ]);

    return true;
  };
  BackHandler.addEventListener('hardwareBackPress', onBackPress);

  const onMapillaryInit = () => {
    startTime = Date.now();
  };

  /**
   * Triggered when user moves on the map
   * @param coordinates - current user coordinates
   */
  const onMove = (coordinates: LatLng) => {
    fromCoordinates = coordinates;
  };

  /**
   * Triggered when user set marker on the map
   * @param coordinates - marker coordinates
   */
  const onMarkerSet = (coordinates: LatLng) => {
    toCoordinates = coordinates;
  };

  /**
   * Triggered when user press complete button
   */
  const handleComplete = () => {
    if (toCoordinates && fromCoordinates) {
      const playtime = Date.now() - startTime;
      navigation.navigate('Result', { from: fromCoordinates, to: toCoordinates, playtime, ...route.params });
    }
  };

  return (
    <>
      {route.params.mode === Mode.ROUND && route.params.data && (
        <TopProgressBar style={styles.progress} round={route.params.data.round + 1} max={Misc.MAX_ROUNDS} />
      )}
      <Mapillary onMove={onMove} onInit={onMapillaryInit} />
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

export default GameScreen;
