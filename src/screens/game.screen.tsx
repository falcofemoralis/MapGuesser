import { CountdownTimer, COUNT_DOWN_TIMER_MARGIN } from '@/components/gameScreen/CountdownTimer/CountdownTimer';
import MapPanel from '@/components/gameScreen/MapPanel/MapPanel';
import { GoogleStreetView } from '@/components/gameScreen/streetview/GoogleStreetView/GoogleStreetView';
import { Mapillary } from '@/components/gameScreen/streetview/Mapillary/Mapillary';
import { TopProgressBar, TOP_PROGRESS_BAR_MARGIN } from '@/components/gameScreen/TopProgressBar/TopProgressBar';
import { GameButton } from '@/components/interface/GameButton/GameButton';
import { StreetViewMode } from '@/constants/streetviewmode';
import { gameStore } from '@/store/game.store';
import { userStore } from '@/store/user.store';
import Props from '@/types/props.type';
import { GlobalColors, Misc } from '@/values';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, BackHandler, StyleSheet, ToastAndroid } from 'react-native';
import { LatLng } from 'react-native-maps';

const GameScreen: React.FC<Props<'Game'>> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const gameSettings = route.params.gameSettings;
  const gameData = route.params.gameData;
  const [startTime, setStartTime] = React.useState<number | null>();

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      leaveGame();

      return true;
    });
    return () => backHandler.remove();
  }, []);

  const leaveGame = () => {
    Alert.alert(t('LEAVE_GAME'), t('LEAVE_GAME_HINT'), [
      { text: t('STAY'), style: 'cancel', onPress: () => {} },
      {
        text: t('LEAVE'),
        style: 'destructive',
        onPress: () => {
          if (gameSettings.isRounds) {
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
    setStartTime(Date.now());

    if (gameSettings.streetViewMode == StreetViewMode.PAID && gameStore.rounds.length == 0) {
      console.log('minus');
      
      userStore.updateCoins(Misc.COINS_FOR_PAID_GAME, '-');
    }
  };

  /**
   * Triggered when user moves
   * @param coordinates - new user street view coordinates
   */
  const onMove = (coordinates: LatLng) => {
    gameStore.fromCoordinates = coordinates;
  };

  /**
   * Triggered when user set the marker on the map
   * @param coordinates - marker coordinates
   */
  const onMarkerSet = (coordinates: LatLng) => {
    gameStore.toCoordinates = coordinates;
  };

  /**
   * Complete button handler
   */
  const handleComplete = () => {
    console.log(gameStore.fromCoordinates);

    if (gameStore.fromCoordinates) {
      navigation.replace('Result', { from: gameStore.fromCoordinates, to: gameStore.toCoordinates, playtime: getPlaytime(), ...route.params });
      gameStore.resetCoordinates();
    }
  };

  /**
   * Get the heigh of header button (ex. exit, refresh) depending on the game mode
   * @returns
   */
  const getButtonMargin = () => {
    let margin = 0;
    if (gameSettings.isRounds) {
      margin += TOP_PROGRESS_BAR_MARGIN;
    }
    if (gameSettings.isTimer) {
      margin += COUNT_DOWN_TIMER_MARGIN;
    }
    return margin;
  };

  const getRounds = () => {
    if (!gameData?.rounds) throw new Error("Rounds wasn't provided");
    return gameData?.rounds;
  };

  const getTime = (): [number, number] => {
    if (!gameData?.time) throw new Error("Time wasn't provided");
    const TOTAL_TIME = gameData?.time * 60 * 1000;
    const NOW_IN_MS = new Date().getTime();
    return [NOW_IN_MS + TOTAL_TIME, TOTAL_TIME];
  };

  const getPlaytime = () => {
    if (startTime) {
      return Date.now() - startTime;
    } else {
      return 0;
    }
  };

  return (
    <>
      {gameSettings.isTimer && startTime && <CountdownTimer onFinish={handleComplete} time={getTime()} />}
      {gameSettings.isRounds && (
        <TopProgressBar
          style={[styles.progress, { marginTop: gameSettings.isTimer ? COUNT_DOWN_TIMER_MARGIN : 0 }]}
          round={gameStore.rounds.length}
          max={getRounds()}
        />
      )}
      <GameButton
        img={require('@/assets/logout.png')}
        fullIcon
        style={[styles.leaveBtn, styles.button, { top: getButtonMargin() + BTN_MARGIN }]}
        onPress={leaveGame}
      />
      {gameSettings.streetViewMode == StreetViewMode.FREE ? (
        <Mapillary
          onMove={onMove}
          onInit={onStreetViewInit}
          gameSettings={gameSettings}
          gameData={gameData}
          sequenceTop={getButtonMargin()}
          buttonStyle={[styles.button, styles.refreshBtn]}
          buttonTop={getButtonMargin() + BTN_MARGIN}
        />
      ) : (
        <GoogleStreetView onMove={onMove} onInit={onStreetViewInit} gameSettings={gameSettings} gameData={gameData} />
      )}
      <MapPanel onMarkerSet={onMarkerSet} onComplete={handleComplete} buttonStyle={[styles.mapBtn, styles.button]} />
    </>
  );
};

const BTN_MARGIN = 15;

const styles = StyleSheet.create({
  progress: {
    position: 'absolute',
    zIndex: 10
  },
  button: {
    position: 'absolute',
    backgroundColor: GlobalColors.backgroundButton,
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
