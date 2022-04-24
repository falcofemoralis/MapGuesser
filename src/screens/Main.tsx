import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet, View, Image, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '.';
import { Strings } from '../constants/strings';
import { Colors } from '../constants/colors';

type mainScreenProp = StackNavigationProp<RootStackParamList, 'Main'>;

const Main = () => {
  console.log('Main');

  const navigation = useNavigation<mainScreenProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>{Strings.appName}</Text>
      <Button title={Strings.startGame} onPress={() => navigation.navigate('Game')} color={Colors.primaryColorRed}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryColorBlue
  },
  logo: {
    color: Colors.white,
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 100
  }
});

export default Main;
