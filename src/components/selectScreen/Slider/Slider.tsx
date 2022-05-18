import { GlobalDimens, GlobalColors, GlobalStyles, Misc } from '@/values';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MultiSlider from '../../libs/react-native-multi-slider-master';

interface SliderProps {
  min: number;
  max: number;
  unit: string;
  initial?: number;
  step?: number;
  onSelect: (value: number) => void;
}
export const Slider: React.FC<SliderProps> = ({ min, max, unit, onSelect, initial, step }) => {
  return (
    <View style={[GlobalStyles.rcc, styles.slider]}>
      <Text style={styles.text}>
        {min} {unit}
      </Text>
      <MultiSlider
        values={[initial ?? 0]}
        enableLabel
        showSteps
        showStepLabels={false}
        smoothSnapped
        min={min}
        max={max}
        step={step ?? 1}
        sliderLength={240}
        onValuesChangeFinish={(v: any) => onSelect(v[0])}
        trackStyle={{ backgroundColor: GlobalColors.backgroundOpposite }}
        selectedStyle={{ backgroundColor: GlobalColors.primaryColor }}
        pressedMarkerStyle={{ backgroundColor: GlobalColors.primaryColor }}
        markerStyle={{ backgroundColor: GlobalColors.primaryColor }}
      />
      <Text style={styles.text}>
        {max} {unit}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: GlobalColors.white,
    fontSize: GlobalDimens.normalText
  },
  slider: {
    width: '100%',
    marginLeft: 10,
    marginRight: 10
  }
});
