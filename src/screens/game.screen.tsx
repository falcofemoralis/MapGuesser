import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, BackHandler, StyleSheet } from 'react-native';
import { LatLng } from 'react-native-maps';
import Mapillary from '../components/Mapillary/Mapillary';
import MapPanel from '../components/MapPanel/MapPanel';
import { TopProgressBar } from '../components/TopProgressBar/TopProgressBar';
import { Mode } from '../constants/mode';
import Props from '../types/props.type';
import { Misc } from '../values/misc';

const GameScreen: React.FC<Props<'Game'>> = ({ navigation, route }) => {
  const { t } = useTranslation();
  let fromCoordinates: LatLng, toCoordinates: LatLng;
  let startTime = -1;

  /**
   * BackPress override. If game wasn't complete - show Alert dialog, otherwise navigate to
   */
  const onBackPress = () => {
    Alert.alert(t('LEAVE_GAME'), t('LEAVE_GAME_HINT'), [
      { text: t('STAY'), style: 'cancel', onPress: () => {} },
      {
        text: t('LEAVE'),
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
        <TopProgressBar style={styles.progress} round={(route.params.data.round ?? 0) + 1} max={Misc.MAX_ROUNDS} />
      )}
      <Mapillary onMove={onMove} onInit={onMapillaryInit} game={route.params.game} mode={route.params.mode} data={route.params.data} />
      <MapPanel onMarkerSet={onMarkerSet} onComplete={handleComplete} buttonStyle={[styles.mapBtn]} />
    </>
  );
};

const styles = StyleSheet.create({
  progress: {
    position: 'absolute',
    zIndex: 10
  },
  mapBtn: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1,
    right: 15,
    bottom: 25
  }
});

export default GameScreen;
