import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ProgressStep, ProgressSteps } from 'react-native-progress-steps';
import { Colors } from '../../values/colors';
import { Dimens } from '../../values/dimens';

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
