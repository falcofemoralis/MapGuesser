import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GameButton } from '../components/interface/GameButton/GameButton';
import { ImageButton } from '../components/interface/ImageButton/ImageButton';
import { ProgressAvatar } from '../components/interface/ProgressAvatar/ProgressAvatar';
import { ProgressValue } from '../components/interface/ProgressValue/ProgressValue';
import { Colors } from '../constants/colors';
import { GameType } from '../constants/gametype';
import { Mode } from '../constants/mode';
import { Strings } from '../constants/strings';
import { GlobalStyles } from '../constants/styles';
import { gameStore } from '../store/game.store';
import Props from '../types/props.type';
import { RoundData } from './index';

const MainScreen: React.FC<Props<'Main'>> = observer(({ navigation }) => {
  if (!gameStore.progress) {
    gameStore.initProgress();
  }

  const onModeSelect = (mode: Mode, gameType: GameType, data?: RoundData) => {
    navigation.replace('Game', { mode, data, gameType });
  };

  return (
    <View style={styles.container}>
      <View style={[GlobalStyles.rcc, styles.settingsContainer]}>
        <Text style={styles.username}>User</Text>
        <ImageButton img={require('./../assets/settings.png')} buttonStyle={styles.settingsBtn}></ImageButton>
      </View>
      <Text style={styles.logo}>{Strings.appName}</Text>
      <View style={[GlobalStyles.rcc, styles.profileContainer]}>
        <View style={styles.avatarContainer}>
          <ProgressAvatar size={150} img={require('./../assets/user.png')} progress={0.5} />
        </View>
        <View style={styles.progressesContainer}>
          <ProgressValue value={gameStore.progress?.xp} text='XP' />
          <ProgressValue value={new Date(gameStore.progress?.playtime ?? 1).getMinutes()} text='Playtime' />
          <ProgressValue value={50} text='Accuracy' />
        </View>
      </View>
      <View style={GlobalStyles.rcc}>
        <GameButton img={require('./../assets/settings.png')} text='Single' onPress={() => onModeSelect(Mode.SINGLE, GameType.CLASSIC)} />
        <GameButton img={require('./../assets/settings.png')} text='Rounds' onPress={() => onModeSelect(Mode.ROUND, GameType.CLASSIC, { round: 0 })} />
        <GameButton img={require('./../assets/settings.png')} text='Regions' />
      </View>
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
  logo: {
    color: Colors.white,
    fontSize: 64,
    fontWeight: 'bold',
    marginTop: 7
  },
  settingsContainer: {
    width: '100%'
  },
  username: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold'
  },
  settingsBtn: {
    height: 42,
    width: 42
  },
  profileContainer: {
    width: '100%',
    marginTop: 15
  },
  avatarContainer: {
    marginEnd: 25
  },
  progressesContainer: {
    height: '100%',
    flexGrow: 1
  }
});

export default MainScreen;
