import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors } from '../../../values/colors';
import { Dimens } from '../../../values/dimens';
import { GlobalStyles } from '../../../values/styles';

interface ProgressValueProps {
  /** Value to display */
  value: string;
  /** Unit of the value. Optional */
  unit?: string;
  /** Title of the progress */
  text: string;
  /** Container style */
  containerStyle?: StyleProp<ViewStyle>;
}
export const ProgressValue: React.FC<ProgressValueProps> = ({ value, unit, text, containerStyle }) => {
  return (
    <View style={[GlobalStyles.ccc, containerStyle]}>
      <Text style={styles.value}>
        {value}
        {unit}
      </Text>
      <Text style={styles.title}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
