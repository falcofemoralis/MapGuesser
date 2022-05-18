import { GlobalColors } from '@/values';
import React from 'react';
import { Dimensions, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import * as Progress from 'react-native-progress';
import { useCountdown } from './useCountdown';

export const COUNT_DOWN_TIMER_MARGIN = 40;

interface CountdownTimerProps {
  time: [number, number];
  style?: StyleProp<ViewStyle>;
  onFinish: () => void;
}
export const CountdownTimer: React.FC<CountdownTimerProps> = ({ time, onFinish, style }) => {
  const [countDown, days, hours, minutes, seconds] = useCountdown(time[0]);

  const zeroPad = (num: number) => {
    const numZeroes = 2 - num.toString().length + 1;
    if (numZeroes > 0) {
      return Array(+numZeroes).join('0') + num;
    }
    return num;
  };

  if (days + hours + minutes + seconds <= 0) {
    onFinish();
    return <></>;
  } else {
    return (
      <View style={[styles.container, style]}>
        <Progress.Bar color={GlobalColors.primaryColor} progress={1 - countDown / time[1]} width={Dimensions.get('window').width - 20} />
        <Text style={styles.text}>
          {zeroPad(minutes)} : {zeroPad(seconds)}
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 5,
    alignSelf: 'center',
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: GlobalColors.backgroundButton
  },
  text: {
    color: GlobalColors.white
  }
});
