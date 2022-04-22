import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '.';

type mainScreenProp = StackNavigationProp<RootStackParamList, 'Main'>;

const Main = () => {
  console.log("Main");

  const navigation = useNavigation<mainScreenProp>();

  return (
    <View>
      <Button title='Start Game' onPress={() => navigation.navigate('Game')}></Button>
    </View>
  );
};

export default Main;
