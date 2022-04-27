import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors } from '../../../constants/colors';
import { GlobalStyles } from '../../../constants/styles';

interface ProgressValueProps {
  value: number;
  text: string;
  style?: StyleProp<ViewStyle>;
}
export const ProgressValue: React.FC<ProgressValueProps> = ({ value, text, style }) => {
  return (
    <View style={[GlobalStyles.rcc, style, styles.bg]}>
      <Text style={styles.text}>{value}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: Colors.backgroundOpposite,
    padding: 15,
    flexGrow: 1,
    borderRadius: 15,
    marginBottom: 15
  },
  text: {
    color: Colors.white,
    fontSize: 20
  }
});
