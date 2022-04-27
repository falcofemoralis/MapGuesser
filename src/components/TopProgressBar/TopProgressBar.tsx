import * as Progress from 'react-native-progress';
import React from 'react';
import { StyleSheet, View, Dimensions, Text, StyleProp, ViewStyle } from 'react-native';
import { Misc } from '../../constants/misc';
import { Colors } from '../../constants/colors';

interface TopProgressBarProps {
  style: StyleProp<ViewStyle>;
  round: number;
  max: number;
}
export const TopProgressBar: React.FC<TopProgressBarProps> = ({ style, round, max }) => {
  return (
    <View style={[styles.container, style]}>
      <Text>
        Round {round}/{max}
      </Text>
      <Progress.Bar style={styles.progress} progress={round / max} width={Dimensions.get('window').width - Dimensions.get('window').width / 4} height={15} />
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
  },
  text: {
    color: Colors.white,
    fontSize: 20
  }
});
