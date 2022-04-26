import * as Progress from 'react-native-progress';
import React from 'react';
import { StyleSheet, View, Dimensions, Text, StyleProp, ViewStyle } from 'react-native';

interface TopProgressBarProps {
  style: StyleProp<ViewStyle>;
}
export const TopProgressBar: React.FC<TopProgressBarProps> = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text>Round</Text>
      <Progress.Bar style={styles.progress} progress={0.5} width={Dimensions.get('window').width - Dimensions.get('window').width / 4} height={15} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  progress: {
    alignSelf: 'center'
  }
});
