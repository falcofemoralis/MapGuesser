import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { LogBox } from 'react-native';
import 'react-native-gesture-handler';
import { RootStackParamList } from './src/screens';
import GameScreen from './src/screens/game.screen';
import MainScreen from './src/screens/main.screen';
import ResultScreen from './src/screens/result.screen';
import { SettingsScreen } from './src/screens/settings.screen';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Main' component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Game' component={GameScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Result' component={ResultScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Settings' component={SettingsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
