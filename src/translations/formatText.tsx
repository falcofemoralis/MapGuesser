import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

interface FormatStringSettings {
  text: string | number;
  style?: StyleProp<TextStyle>;
}
export const formatText = (text: string, style: StyleProp<TextStyle>, ...args: FormatStringSettings[]) => {
  let str = text.split(/(\s+)/);
  let i = 0;

  const getString = (s: string) => {
    if (s.includes('$s')) {      
      const arg = args[i];
      i++;      
      return <Text key={`${s}_${i}_${arg.text}`} style={arg.style}>{s.replace('$s', arg.text.toString())}</Text>;
    } else {
      return s;
    }
  };

  return <Text style={style}>{str.map(s => getString(s))}</Text>;
};
