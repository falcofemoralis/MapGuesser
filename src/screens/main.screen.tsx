import NetInfo from '@react-native-community/netinfo';
import date from 'date-and-time';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { Banner } from '../components/Banner/Banner';
import { GamesCarousel } from '../components/GamesCarousel/GamesCarousel';
import { GameButton } from '../components/interface/GameButton/GameButton';
import { ImageButton } from '../components/interface/ImageButton/ImageButton';
import { ProgressAvatar } from '../components/ProgressAvatar/ProgressAvatar';
import { Settings } from '../components/Settings/Settings';
import { Continent } from '../constants/continent';
import { GameMode } from '../constants/gamemode';
import { PlayMode } from '../constants/playmode';
import { Position } from '../constants/position';
import ProgressManager from '../managers/progress.manager';
import { userStore } from '../store/user.store';
import { GameCard } from '../types/gamecard.type';
import Props from '../types/props.type';
import { Colors } from '../values/colors';
import { Dimens } from '../values/dimens';
import { Keys } from '../values/keys';
import { GlobalStyles } from '../values/styles';
import { GameData } from './index';

const MainScreen: React.FC<Props<'Main'>> = observer(({ navigation }) => {
  const { t } = useTranslation();

  const [isSettings, setSetting] = React.useState(false); // state of modal settings window
  const [isContinents, setContinents] = React.useState(false); // state of modal continent window
  const [selectedGameCard, setGameCard] = React.useState<GameCard | null>(null); // state of selected game
  const [selectedGameData, setGameData] = React.useState<GameData | null>(null); // state

  /**
   * User select game handler
   * @param gameInfo - selected game card
   */
  const onGameSelect = (gameInfo: GameCard) => {
    const gameData: GameData = {};

    // depending on the game mode init data of the game
    if (gameInfo.gameMode == GameMode.ROUND) {
      gameData.round = 0;
    }

    setGameCard(gameInfo);
    setGameData(gameData);

    // depending on play mode, perform required action
    if (gameInfo.playMode == PlayMode.CLASSIC) {
      // in classic we just start a game
      startGame(gameInfo, gameData);
    } else if (gameInfo.playMode == PlayMode.CONTINENTS) {
      // in continents we toggle continent selection window
      toggleContinents();
    }
  };

  /**
   * User select continent handler
   * @param continent - selected continent
   */
  const onContinentSelect = (continent: Continent) => {
    const data = { ...selectedGameData };

    // updating data with required data
    data.continent = continent;

    if (selectedGameCard) {
      startGame(selectedGameCard, data);
    }
  };

  /**
   * Start game
   * @param gameCard - selected game card
   * @param gameData - data of the game
   */
  const startGame = (gameCard: GameCard, gameData: GameData) => {
    // check if Internet exists
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        navigation.replace('Game', { playMode: gameCard.playMode, gameMode: gameCard.gameMode, gameData: gameData });
      } else {
        ToastAndroid.showWithGravityAndOffset(t('NO_INTERNET'), ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
      }
    });
  };

  /**
   * Set of functions that returns formatted user data
   */
  const getProgress = () => userStore.progress.xp / ProgressManager.lvl(userStore.progress.lvl + 1);
  const getLvl = () => userStore.progress.lvl;
  const getXP = () => userStore.progress.totalXp.toFixed(0);
  const getAccuracy = () => ProgressManager.getTotalAccuracy(userStore.progress.accuracy).toFixed(2);
  const getTime = () => date.format(new Date(userStore.progress.playtime), 'HH:mm:ss', true);

  /**
   * Window togglers
   */
  const toggleSettings = () => setSetting(!isSettings);
  const toggleContinents = () => setContinents(!isContinents);

  return (
    <View style={[styles.container]}>
      <Settings visible={isSettings} onClose={toggleSettings} />
      <ScrollView style={styles.scroll}>
        {/** Header */}
        <View style={[GlobalStyles.rcc, styles.headerContainer]}>
          <ProgressAvatar size={50} progress={getProgress()} style={styles.avatarBtn} />
          <View style={[GlobalStyles.ccc, styles.statisticRow]}>
            <Text style={styles.lvlText}>
              {t('LEVEL')} {getLvl()}
            </Text>
            <Text style={styles.username}>
              {t('LOCAL_USER')} {getLvl()}
            </Text>
            <View style={[GlobalStyles.rcc, styles.moneyRow]}>
              <View style={[GlobalStyles.rcc, styles.itemContainer]}>
                <Text style={styles.itemText}>50</Text>
                <Image source={require('../assets/star.png')} style={styles.itemIcon} />
              </View>
              <View style={[GlobalStyles.rcc, styles.itemContainer]}>
                <Text style={styles.itemText}>100</Text>
                <Image source={require('../assets/coin.png')} style={styles.itemIcon} />
              </View>
            </View>
          </View>
          <ImageButton img={require('./../assets/settings.png')} buttonStyle={styles.settingsBtn} onPress={toggleSettings} />
        </View>
        {/** Game modes */}
        <GamesCarousel onSelect={onGameSelect} />
        {/** Main */}
        <View style={[styles.mainContainer]}>
          <View style={[styles.firstRow]}>
            <GameButton style={[styles.leftGameButton]} img={require('../assets/mp.png')} title='Multiplayer' onPress={() => navigation.navigate('Select')} />
            <GameButton style={[styles.leftGameButton]} img={require('../assets/challenges.png')} title='Challenges' />
          </View>
          <View style={[styles.secondRow]}>
            <GameButton style={styles.rightSmallGameButton} img={require('../assets/achievements.png')} title='Achievements' iconStyle={styles.gameButtonIcon} />
            <GameButton style={styles.rightGameButton} img={require('../assets/shop.png')} title='Shop' />
            <GameButton style={styles.rightSmallGameButton} img={require('../assets/leaderboard.png')} title='Leaderboard' iconStyle={styles.gameButtonIcon} />
          </View>
        </View>
        {/* <Text style={styles.headerText}>Game modes</Text> */}
      </ScrollView>
      {/* <View style={[GlobalStyles.rcc, styles.progressesContainer]}>
        <ProgressValue value={getXP()} text={t('XP')} />
        <ProgressValue value={getTime()} unit='' text={t('PLAYTIME')} />
        <ProgressValue value={getAccuracy()} unit='%' text={t('ACCURACY')} />
      </View> */}
      {/* <GamesCarousel onSelect={onGameSelect} />
      <ContinentsSelector visible={isContinents} onClose={toggleContinents} onSelect={onContinentSelect} /> */}
      <Banner position={Position.BOTTOM} id={Keys.bannersIds.MainScreen} />
    </View>
  );
});

export const MAIN_CONTAINER_PADDING = 10;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.mainBackground,
    padding: MAIN_CONTAINER_PADDING
  },
  scroll: {
    width: '100%'
  },
  headerContainer: {
    width: '100%',
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 5
  },
  avatarBtn: {
    borderRadius: 32,
    backgroundColor: Colors.backgroundTransparent
  },
  statisticRow: {
    marginStart: 10,
    marginEnd: 10,
    flexGrow: 1
  },
  username: {
    color: Colors.white,
    fontSize: Dimens.headText,
    fontWeight: 'bold'
  },
  lvlText: {
    color: Colors.gray,
    fontSize: Dimens.normalText,
    alignSelf: 'center'
  },
  moneyRow: {},
  itemContainer: {
    marginStart: 25,
    marginEnd: 25
  },
  itemText: {
    color: Colors.gray,
    fontSize: Dimens.normalText,
    alignSelf: 'center'
  },
  itemIcon: {
    height: 10,
    width: 10,
    marginStart: 5
  },
  settingsBtn: {
    height: 50,
    width: 50,
    padding: 12,
    borderRadius: 32,
    backgroundColor: Colors.backgroundTransparent
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    padding: 0, // button sizes
    paddingBottom: 35
  },
  firstRow: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginEnd: 5
  },
  secondRow: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginStart: 5
  },
  gameButtonIcon: {
    // width: '120%',
    height: '55%',
    resizeMode: 'contain'
  },
  leftGameButton: {
    width: '100%',
    marginTop: 7.5,
    marginBottom: 7.5 // 15 + 15 = 30
  },
  rightGameButton: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5
  },
  rightSmallGameButton: {
    width: '100%',
    aspectRatio: 2,
    marginTop: 5,
    marginBottom: 5 // 10 + 10 + 10 = 30
  },
  headerText: {
    color: Colors.white,
    fontSize: Dimens.headText,
    fontWeight: 'bold'
  }
});

export default MainScreen;
