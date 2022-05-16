import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, BackHandler, StyleSheet, ToastAndroid } from 'react-native';
import { LatLng } from 'react-native-maps';
import { GoogleStreetView } from '../components/GoogleStreetView/GoogleStreetView';
import { ImageButton } from '../components/interface/ImageButton/ImageButton';
import Mapillary from '../components/Mapillary/Mapillary';
import { mapillaryСore } from '../components/Mapillary/MapillaryСore';
import MapPanel from '../components/MapPanel/MapPanel';
import { TopProgressBar, TOP_PROGRESS_BAR_HEIGHT } from '../components/TopProgressBar/TopProgressBar';
import { GameMode } from '../constants/gamemode';
import { StreetViewMode } from '../constants/streetviewmode';
import { gameStore } from '../store/game.store';
import { userStore } from '../store/user.store';
import Props from '../types/props.type';
import { Colors } from '../values/colors';
import { Misc } from '../values/misc';

const GameScreen: React.FC<Props<'Game'>> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const gameSettings = route.params.gameSettings;
  const playModeData = route.params.playModeData;

  let fromCoordinates: LatLng; // user street view coordinates
  let toCoordinates: LatLng; // marker coordinates
  let startTime = -1; // timer start time

  /**
   * BackPress override.
   */
  const onBackPress = () => {
    leaveGame();
    return true;
  };
  BackHandler.addEventListener('hardwareBackPress', onBackPress);

  /**
   * Leave the game handler
   */
  const leaveGame = () => {
    Alert.alert(t('LEAVE_GAME'), t('LEAVE_GAME_HINT'), [
      { text: t('STAY'), style: 'cancel', onPress: () => {} },
      {
        text: t('LEAVE'),
        style: 'destructive',
        onPress: () => {
          BackHandler.removeEventListener('hardwareBackPress', onBackPress);
          if (gameSettings.streetViewMode == StreetViewMode.FREE) {
            mapillaryСore.reset();
          }
          if (gameSettings.gameMode == GameMode.ROUND) {
            gameStore.resetRounds();
          }
          navigation.replace('Main');
        }
      }
    ]);
  };

  /**
   * Listener for streetview init
   */
  const onStreetViewInit = () => {
    startTime = Date.now();

    if (gameSettings.streetViewMode == StreetViewMode.PAID) {
      userStore.updateCoins(Misc.COINS_FOR_PAID_GAME, '-');
    }
  };

  /**
   * Triggered when user moves
   * @param coordinates - new user street view coordinates
   */
  const onMove = (coordinates: LatLng) => {
    fromCoordinates = coordinates;
  };

  /**
   * Triggered when user set the marker on the map
   * @param coordinates - marker coordinates
   */
  const onMarkerSet = (coordinates: LatLng) => {
    toCoordinates = coordinates;
  };

  /**
   * Complete button handler
   */
  const handleComplete = () => {
    if (toCoordinates && fromCoordinates) {
      const playtime = Date.now() - startTime;
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      if (gameSettings.streetViewMode == StreetViewMode.FREE) {
        mapillaryСore.reset();
      }
      navigation.replace('Result', { from: fromCoordinates, to: toCoordinates, playtime, ...route.params });
    }
  };

  /**
   * Refresh location handler
   */
  const refreshLocation = () => {
    Alert.alert(t('REFRESH_GAME'), t('REFRESH_GAME_HINT'), [
      { text: t('STAY'), style: 'cancel', onPress: () => {} },
      {
        text: t('REFRESH'),
        style: 'destructive',
        onPress: () => {
          mapillaryСore.refresh(() => {
            ToastAndroid.showWithGravityAndOffset(t('NO_REFRESH'), ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
          });
        }
      }
    ]);
  };

  /**
   * Get the heigh of header button (ex. exit, refresh) depending on the game mode
   * @returns
   */
  const getButtonHeight = () => (gameSettings.gameMode == GameMode.ROUND ? headerButtonHeight + TOP_PROGRESS_BAR_HEIGHT : headerButtonHeight);

  return (
    <>
      {gameSettings.gameMode === GameMode.ROUND && <TopProgressBar style={styles.progress} round={gameStore.rounds.length} max={Misc.MAX_ROUNDS} />}
      <ImageButton img={require('../assets/logout.png')} buttonStyle={[styles.leaveBtn, styles.button, { top: getButtonHeight() }]} onPress={leaveGame} />
      {gameSettings.streetViewMode == StreetViewMode.FREE && (
        <ImageButton
          img={require('../assets/refresh.png')}
          buttonStyle={[styles.refreshBtn, styles.button, { top: getButtonHeight() }]}
          onPress={refreshLocation}
        />
      )}
      {gameSettings.streetViewMode == StreetViewMode.FREE ? (
        <Mapillary onMove={onMove} onInit={onStreetViewInit} gameSettings={gameSettings} playModeData={playModeData} />
      ) : (
        <GoogleStreetView onMove={onMove} onInit={onStreetViewInit} gameSettings={gameSettings} playModeData={playModeData} />
      )}
      <MapPanel onMarkerSet={onMarkerSet} onComplete={handleComplete} buttonStyle={[styles.mapBtn, styles.button]} />
    </>
  );
};

const headerButtonHeight = 15;

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
