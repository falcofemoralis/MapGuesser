import React from 'react';
import { Dimensions, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import * as Progress from 'react-native-progress';
import { ProgressStep, ProgressSteps } from 'react-native-progress-steps';
import { Colors } from '../../constants/colors';
import { Dimens } from '../../constants/dimens';

interface TopProgressBarProps {
  style: StyleProp<ViewStyle>;
  round: number;
  max: number;
}
export const TopProgressBar: React.FC<TopProgressBarProps> = ({ style, round, max }) => {
  return (
    <View style={[styles.container, style]}>
      <ProgressSteps
        activeStep={round}
        activeStepNumColor={Colors.primaryColor}
        completedProgressBarColor={Colors.primaryColor}
        completedStepIconColor={Colors.primaryColor}
        activeStepIconBorderColor={Colors.primaryColor}
        labelFontSize={0}
        disabledStepIconColor={Colors.backgroundTransparent}
        progressBarColor={Colors.backgroundTransparent}
        topOffset={15}
        marginBottom={0}
      >
        {[...Array(max)].map((x, i) => (
          <ProgressStep key={i} removeBtnRow={true} />
        ))}
      </ProgressSteps>
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
    alignSelf: 'center',
    marginTop: 5
  },
  text: {
    color: Colors.white,
    fontSize: Dimens.headText
  }
});
