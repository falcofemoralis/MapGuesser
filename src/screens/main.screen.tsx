import date from 'date-and-time';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import LinearGradient from 'react-native-linear-gradient';
import { Banner } from '../components/Banner/Banner';
import { ContinentsSelector } from '../components/ContinentsSelector/ContinentsSelector';
import { GamesCarousel } from '../components/GamesCarousel/GamesCarousel';
import { ImageButton } from '../components/interface/ImageButton/ImageButton';
import { ProgressAvatar } from '../components/interface/ProgressAvatar/ProgressAvatar';
import { ProgressValue } from '../components/interface/ProgressValue/ProgressValue';
import { LinearBackground } from '../components/LinearBackground/LinearBackground';
import { Settings } from '../components/Settings/Settings';
import { Continent } from '../constants/continent';
import { Game } from '../constants/gametype';
import { Mode } from '../constants/mode';
import { Position } from '../constants/position';
import ProgressManager from '../managers/progress.manager';
import { gameStore } from '../store/game.store';
import { GameType } from '../types/game.type';
import Props from '../types/props.type';
import { Colors } from '../values/colors';
import { Dimens } from '../values/dimens';
import { GlobalStyles } from '../values/styles';
import { GameData } from './index';

const MainScreen: React.FC<Props<'Main'>> = observer(({ navigation }) => {
  const [isSettings, setSetting] = React.useState(false);
  const [isContinents, setContinents] = React.useState(false);
  const [selectedGame, setGame] = React.useState<GameType | null>(null);
  const [selectedData, setData] = React.useState<GameData | null>(null);
  const { t } = useTranslation();

  const games: GameType[] = [
    {
      title: t('CLASSIC_NAME'),
      preview: require('../assets/classic.jpg'),
      description: t('CLASSIC_TITLE'),
      mode: Mode.SINGLE,
      game: Game.CLASSIC,
      requiredLvl: 0
    },
    {
      title: t('SETS_ROUND_NAME'),
      preview: require('../assets/rounds.jpg'),
      description: t('SETS_ROUND_TITLE'),
      mode: Mode.ROUND,
      game: Game.CLASSIC,
      requiredLvl: 3
    },
    {
      title: t('CONTINENTS_NAME'),
      preview: require('../assets/earth.jpg'),
      description: t('CONTINENTS_TITLE'),
      mode: Mode.ROUND,
      game: Game.CONTINENTS,
      requiredLvl: 10
    }
  ];

  const onGameSelect = (game: GameType) => {
    const data: GameData = {};
    if (game.mode == Mode.ROUND) {
      data.round = 0;
    }

    setGame(game);
    setData(data);

    if (game.game == Game.CLASSIC) {
      startGame(game, data);
    } else if (game.game == Game.CONTINENTS) {
      toggleContinents();
    }
  };

  const onContinentSelect = (continent: Continent) => {
    const data = { ...selectedData };
    data.continent = continent;

    if (selectedGame) {
      startGame(selectedGame, data);
    }
  };

  const startGame = (game: GameType, data: GameData) => {
    navigation.replace('Game', { game: game.game, mode: game.mode, data });
  };

  const getProgress = () => {
    return (gameStore.progress?.xp ?? 1) / ProgressManager.lvl((gameStore.progress?.lvl ?? 1) + 1);
  };

  const getLvl = () => {
    return gameStore.progress?.lvl ?? 1;
  };

  const getXP = () => {
    return gameStore.progress?.totalXp?.toFixed(0) ?? '0';
  };

  const getTime = () => {
    const time = gameStore.progress?.playtime ?? 0;
    const now = new Date(time);
    return date.format(now, 'HH:mm:ss', true);
  };

  const getAccuracy = () => {
    return ProgressManager.getTotalAccuracy(gameStore.progress?.accuracy ?? [1]).toFixed(2);
  };

  const toggleSettings = () => {
    setSetting(!isSettings);
  };

  const toggleContinents = () => {
    setContinents(!isContinents);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageButton img={require('./../assets/settings.png')} buttonStyle={styles.settingsBtn} onPress={toggleSettings} />
      </View>
      <Settings visible={isSettings} onClose={toggleSettings} />
      <View style={[GlobalStyles.ccc, styles.avatarContainer]}>
        <ProgressAvatar size={100} progress={getProgress()} />
        {/* <Text style={styles.username}>{t('LOCAL_USER')}</Text> */}
        <Text style={styles.lvlText}>
          {t('LEVEL')} {getLvl()}
        </Text>
      </View>
      <View style={[GlobalStyles.rcc, styles.progressesContainer]}>
        <ProgressValue value={getXP()} text={t('XP')} />
        <ProgressValue value={getTime()} unit='' text={t('PLAYTIME')} />
        <ProgressValue value={getAccuracy()} unit='%' text={t('ACCURACY')} />
      </View>
      <GamesCarousel games={games} onSelect={i => onGameSelect(games[i])} />
      <ContinentsSelector visible={isContinents} onClose={toggleContinents} onSelect={onContinentSelect} />
      <Banner position={Position.BOTTOM} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.mainBackground,
    padding: 16
  },
  headerContainer: {
    position: 'absolute',
    right: 16,
    top: 16
  },
  settingsBtn: {
    height: 50,
    width: 50,
    padding: 12,
    borderRadius: 32,
    backgroundColor: Colors.backgroundTransparent
  },
  avatarContainer: {
    marginTop: 16,
    width: '100%'
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
  progressesContainer: {
    width: '70%',
    marginTop: 10,
    marginBottom: 15
  }
});

export default MainScreen;
