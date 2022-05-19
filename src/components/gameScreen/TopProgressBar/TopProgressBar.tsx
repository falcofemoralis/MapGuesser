import ProgressStep from '@/components/libs/ProgressSteps/ProgressStep';
import ProgressSteps from '@/components/libs/ProgressSteps/ProgressSteps';
import { GlobalColors, GlobalDimens } from '@/values';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

export const TOP_PROGRESS_BAR_MARGIN = 56;

interface TopProgressBarProps {
  /** Container style */
  style: StyleProp<ViewStyle>;
  /** Current round in range 0...n */
  round: number;
  /** Max rounds */
  max: number;
}

export const TopProgressBar: React.FC<TopProgressBarProps> = ({ style, round, max }) => {
  return (
    <View style={[styles.container, style]}>
      <ProgressSteps
        activeStep={round}
        activeStepNumColor={GlobalColors.primaryColor}
        completedProgressBarColor={GlobalColors.primaryColor}
        completedStepIconColor={GlobalColors.primaryColor}
        activeStepIconBorderColor={GlobalColors.primaryColor}
        labelFontSize={0}
        disabledStepIconColor={GlobalColors.gray}
        progressBarColor={GlobalColors.gray}
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
  text: {
    color: GlobalColors.white,
    fontSize: GlobalDimens.headText
  }
});
