import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ProgressStep, ProgressSteps } from 'react-native-progress-steps';
import { Colors } from '../../values/colors';
import { Dimens } from '../../values/dimens';

export const TOP_PROGRESS_BAR_HEIGHT = 56;

interface TopProgressBarProps {
  /** Container style */
  style: StyleProp<ViewStyle>;
  /** Current round in range 1...n */
  round: number;
  /** Max rounds */
  max: number;
}
export const TopProgressBar: React.FC<TopProgressBarProps> = ({ style, round, max }) => {
  return (
    <View style={[styles.container, style]}>
      <ProgressSteps
        activeStep={round - 1}
        activeStepNumColor={Colors.primaryColor}
        completedProgressBarColor={Colors.primaryColor}
        completedStepIconColor={Colors.primaryColor}
        activeStepIconBorderColor={Colors.primaryColor}
        labelFontSize={0}
        disabledStepIconColor={Colors.gray}
        progressBarColor={Colors.gray}
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
