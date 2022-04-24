import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '.';

type mainScreenProp = StackNavigationProp<RootStackParamList, 'Main'>;

const Main = () => {
  console.log('Main');

  const navigation = useNavigation<mainScreenProp>();

  return (
    <View style={styles.container}>
      <Button title='Start Game' onPress={() => navigation.navigate('Game')}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Main;
