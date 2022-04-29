import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../constants/colors';

interface SettingsScreenProps {}
export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  }
});
