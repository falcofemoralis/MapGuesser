import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

type SearchProps = {
  onPress: () => void;
  rootStyle?: object;
  iconStyle?: object;
};

export const Search = ({ onPress, rootStyle, iconStyle }: SearchProps) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => onPress()} style={[SearchStyles.closeButton, rootStyle]}>
      <Image source={require('@/assets/search.png')} style={SearchStyles.iconLine} />
    </TouchableOpacity>
  );
};

const SearchStyles = StyleSheet.create({
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    position: 'absolute',
    right: 15,
    top: 15,
    backgroundColor: '#e2e2e2',
    zIndex: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8
  },
  iconLine: {
    width: '100%',
    height: '100%'
  }
});
