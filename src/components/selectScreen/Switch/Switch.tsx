import SwitchSelector from '@/components/libs/SwitchSelector/SwitchSelector';
import { GlobalColors } from '@/values';
import React from 'react';
import { StyleSheet } from 'react-native';

interface Option<T> {
  label: string;
  value: T;
}

interface SwitchProps<T> {
  initial: number;
  onSelect: (value: T) => void;
  options: Option<T>[];
}
export const Switch = <T extends any>({ initial, onSelect, options }: SwitchProps<T>) => {
  return (
    <SwitchSelector
      initial={initial}
      style={styles.selector}
      onPress={onSelect}
      textColor={GlobalColors.white}
      selectedColor={GlobalColors.white}
      buttonColor={GlobalColors.primaryColor}
      backgroundColor={GlobalColors.backgroundOpposite}
      options={options}
    />
  );
};

const styles = StyleSheet.create({
  selector: {
    marginTop: 10,
    marginBottom: 10
  }
});
