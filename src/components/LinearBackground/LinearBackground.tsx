import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet } from 'react-native';
import { Dimens } from '../../values/dimens';

interface LinearBackgroundProps {
  children?: React.ReactNode;
}
export const LinearBackground: React.FC<LinearBackgroundProps> = ({ children }) => {
  return (
    <LinearGradient colors={['#070a0f', '#081426', '#03193d']} start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} style={styles.linearGradient}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 16
  }
});
