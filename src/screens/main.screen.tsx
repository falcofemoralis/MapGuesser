import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GamesCarousel } from '../components/GamesCarousel/GamesCarousel';
import { ImageButton } from '../components/interface/ImageButton/ImageButton';
import { ProgressAvatar } from '../components/interface/ProgressAvatar/ProgressAvatar';
import { ProgressValue } from '../components/interface/ProgressValue/ProgressValue';
import { Settings } from '../components/Settings/Settings';
import { Colors } from '../constants/colors';
import { Dimens } from '../constants/dimens';
import { Game } from '../constants/gametype';
import { Mode } from '../constants/mode';
import { Strings } from '../constants/strings';
import { GlobalStyles } from '../constants/styles';
import ProgressManager from '../managers/progress.manager';
import { gameStore } from '../store/game.store';
import { GameType } from '../types/game.type';
import Props from '../types/props.type';
import { GameData } from './index';
import date from 'date-and-time';
import { ContinentsSelector } from '../components/ContinentsSelector/ContinentsSelector';
import { Continent } from '../constants/continent';

const MainScreen: React.FC<Props<'Main'>> = observer(({ navigation }) => {
  const [isSettings, setSetting] = React.useState(false);
  const [isContinents, setContinents] = React.useState(false);
  const [selectedGame, setGame] = React.useState<GameType | null>(null);
  const [selectedData, setData] = React.useState<GameData | null>(null);

  const games: GameType[] = [
    { title: 'Classic', preview: require('../assets/preview.png'), description: 'Play a single round anywhere', mode: Mode.SINGLE, game: Game.CLASSIC },
    { title: 'Set of rounds', preview: require('../assets/rounds.jpg'), description: 'Play several rounds anywhere', mode: Mode.ROUND, game: Game.CLASSIC },
    {
      title: 'Continents',
      preview: require('../assets/earth.jpg'),
      description: 'Select on of the continents to start playing',
      mode: Mode.ROUND,
      game: Game.CONTINENTS
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
    return gameStore.progress?.xp?.toFixed(0) ?? '';
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
        <ProgressAvatar size={100} avatar={require('./../assets/user.png')} progress={getProgress()} />
        <Text style={styles.username}>User #3324</Text>
        <Text style={styles.lvlText}>Level {getLvl()}</Text>
      </View>
      <View style={[GlobalStyles.rcc, styles.progressesContainer]}>
        <ProgressValue value={getXP()} text={Strings.XP} />
        <ProgressValue value={getTime()} unit='' text={Strings.playtime} />
        <ProgressValue value={getAccuracy()} unit='%' text='Accuracy' />
      </View>
      <GamesCarousel games={games} onSelect={i => onGameSelect(games[i])} />
      <ContinentsSelector visible={isContinents} onClose={toggleContinents} onSelect={onContinentSelect} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 16,
    paddingTop: Dimens.statusBarHeight
  },
  headerContainer: {
    position: 'absolute',
    right: 16,
    top: 16 + Dimens.statusBarHeight
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
