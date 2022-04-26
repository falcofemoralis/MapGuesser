import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '.';
import { GameButton } from '../components/interface/GameButton/GameButton';
import { ImageButton } from '../components/interface/ImageButton/ImageButton';
import { ProgressAvatar } from '../components/interface/ProgressAvatar/ProgressAvatar';
import { ProgressValue } from '../components/interface/ProgressValue/ProgressValue';
import { Colors } from '../constants/colors';
import { Strings } from '../constants/strings';
import { GlobalStyles } from '../constants/styles';

type mainScreenProp = StackNavigationProp<RootStackParamList, 'Main'>;

const Main = () => {
  const navigation = useNavigation<mainScreenProp>();

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
          <ProgressValue value={50} text='XP' />
          <ProgressValue value={50} text='XP' />
          <ProgressValue value={50} text='XP' />
        </View>
      </View>
      <View style={GlobalStyles.rcc}>
        <GameButton img={require('./../assets/settings.png')} text={Strings.startGame} onPress={() => navigation.navigate('Game')} />
        <GameButton img={require('./../assets/settings.png')} text='Classic' />
        <GameButton img={require('./../assets/settings.png')} text='Classic' />
      </View>
    </View>
  );
};

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

export default Main;
