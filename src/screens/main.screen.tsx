import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GamesCarousel } from '../components/GamesCarousel/GamesCarousel';
import { ImageButton } from '../components/interface/ImageButton/ImageButton';
import { ProgressAvatar } from '../components/interface/ProgressAvatar/ProgressAvatar';
import { ProgressValue } from '../components/interface/ProgressValue/ProgressValue';
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
import { RoundData } from './index';

const MainScreen: React.FC<Props<'Main'>> = observer(({ navigation }) => {
  if (!gameStore.progress) {
    gameStore.initProgress();
  }

  const games: GameType[] = [
    { title: 'Classic', preview: require('../assets/preview.png'), mode: Mode.SINGLE, game: Game.CLASSIC },
    { title: 'Set of rounds', preview: require('../assets/preview.png'), mode: Mode.ROUND, game: Game.CLASSIC }
  ];

  const onModeSelect = (game: GameType) => {
    let data: RoundData | undefined = undefined;
    if (game.mode == Mode.ROUND) {
      data = { round: 0 };
    }
    navigation.replace('Game', { game: game.game, mode: game.mode, data });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageButton img={require('./../assets/settings.png')} buttonStyle={styles.settingsBtn}></ImageButton>
      </View>
      <View style={[GlobalStyles.ccc, styles.avatarContainer]}>
        <ProgressAvatar
          size={100}
          avatar={require('./../assets/user.png')}
          progress={gameStore.progress.xp / ProgressManager.lvl(gameStore.progress.lvl + 1)}
        />
        <Text style={styles.username}>User #3324</Text>
        <Text style={styles.lvlText}>Level {gameStore.progress.lvl}</Text>
      </View>
      <View style={[GlobalStyles.rcc, styles.progressesContainer]}>
        <ProgressValue value={gameStore.progress.xp.toFixed(0)} text={Strings.XP} />
        <ProgressValue value={ProgressManager.getTotalPlaytime(gameStore.progress.playtime)} unit='m' text={Strings.playtime} />
        <ProgressValue value={ProgressManager.getTotalAccuracy(gameStore.progress.accuracy).toFixed(2)} unit='%' text='Accuracy' />
      </View>
      <GamesCarousel games={games} onSelect={i => onModeSelect(games[i])} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.background,
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
