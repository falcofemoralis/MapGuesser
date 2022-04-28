import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors } from '../../../constants/colors';
import { Dimens } from '../../../constants/dimens';
import { GlobalStyles } from '../../../constants/styles';

interface ProgressValueProps {
  value: string;
  unit?: string;
  text: string;
  style?: StyleProp<ViewStyle>;
}
export const ProgressValue: React.FC<ProgressValueProps> = ({ value, unit, text, style }) => {
  return (
    <View style={[GlobalStyles.ccc, style, styles.container]}>
      <Text style={styles.value}>
        {value}
        {unit}
      </Text>
      <Text style={styles.title}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  value: {
    color: Colors.white,
    fontSize: Dimens.headText,
    fontWeight: 'bold'
  },
  title: {
    color: Colors.gray,
    fontSize: Dimens.normalText
  }
});
