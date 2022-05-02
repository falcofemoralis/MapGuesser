import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, BackHandler, StyleSheet, ToastAndroid } from 'react-native';
import { LatLng } from 'react-native-maps';
import { ImageButton } from '../components/interface/ImageButton/ImageButton';
import Mapillary from '../components/Mapillary/Mapillary';
import MapPanel from '../components/MapPanel/MapPanel';
import { TopProgressBar, TOP_PROGRESS_BAR_HEIGHT } from '../components/TopProgressBar/TopProgressBar';
import { Game } from '../constants/gametype';
import { Mode } from '../constants/mode';
import { Image } from '../services/images.service';
import { core } from '../store/core.store';
import Props from '../types/props.type';
import { Colors } from '../values/colors';
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
          leaveGame();
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
      core.reset();
      navigation.navigate('Result', { from: fromCoordinates, to: toCoordinates, playtime, ...route.params });
    }
  };

  const leaveGame = () => {
    Alert.alert(t('LEAVE_GAME'), t('LEAVE_GAME_HINT'), [
      { text: t('STAY'), style: 'cancel', onPress: () => {} },
      {
        text: t('LEAVE'),
        style: 'destructive',
        onPress: () => {
          BackHandler.removeEventListener('hardwareBackPress', onBackPress);
          core.reset();
          navigation.replace('Main');
        }
      }
    ]);
  };

  const refreshLocation = () => {
    core.refresh(() => {
      ToastAndroid.showWithGravityAndOffset(t('NO_REFRESH'), ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
    });
  };

  const getButtonHeight = () => {
    const height = 15;
    return route.params.mode == Mode.ROUND ? height + TOP_PROGRESS_BAR_HEIGHT : height;
  };

  return (
    <>
      {route.params.mode === Mode.ROUND && route.params.data && (
        <TopProgressBar style={styles.progress} round={(route.params.data.round ?? 0) + 1} max={Misc.MAX_ROUNDS} />
      )}
      <ImageButton img={require('../assets/logout.png')} buttonStyle={[styles.leaveBtn, styles.button, { top: getButtonHeight() }]} onPress={leaveGame} />
      <ImageButton
        img={require('../assets/refresh.png')}
        buttonStyle={[styles.refreshBtn, styles.button, { top: getButtonHeight() }]}
        onPress={refreshLocation}
      />
      <Mapillary onMove={onMove} onInit={onMapillaryInit} game={route.params.game} mode={route.params.mode} data={route.params.data} />
      <MapPanel onMarkerSet={onMarkerSet} onComplete={handleComplete} buttonStyle={[styles.mapBtn, styles.button]} />
    </>
  );
};

const styles = StyleSheet.create({
  progress: {
    position: 'absolute',
    zIndex: 10
  },
  button: {
    position: 'absolute',
    backgroundColor: Colors.backgroundButton,
    borderRadius: 32,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 1
  },
  mapBtn: {
    height: 64,
    width: 64,
    padding: 16,
    right: 15,
    bottom: 25
  },
  leaveBtn: {
    height: 52,
    width: 52,
    padding: 14,
    left: 10
  },
  refreshBtn: {
    height: 52,
    width: 52,
    padding: 14,
    right: 10
  }
});

export default GameScreen;
