import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { LogBox } from 'react-native';
import 'react-native-gesture-handler';
import { RootStackParamList } from './src/screens';
import Game from './src/screens/Game';
import Main from './src/screens/Main';
import Result from './src/screens/Result';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  console.log('App');

  LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Main' component={Main} options={{ headerShown: false }} />
        <Stack.Screen name='Game' component={Game} options={{ headerShown: false }} />
        <Stack.Screen name='Result' component={Result} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
