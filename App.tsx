import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { LogBox, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import mobileAds from 'react-native-google-mobile-ads';
import { RootStackParamList } from './src/screens';
import GameScreen from './src/screens/game.screen';
import MainScreen from './src/screens/main.screen';
import ResultScreen from './src/screens/result.screen';
import { Colors } from './src/values/colors';

mobileAds()
  .initialize()
  .then(adapterStatuses => {
    // Initialization complete!
  });

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  //if (__DEV__) console.warn('Running in dev mode');

  LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        showHideTransition='fade'
        backgroundColor={Colors.black}
        // translucent={true}
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Main' component={MainScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Game' component={GameScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Result' component={ResultScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default App;
