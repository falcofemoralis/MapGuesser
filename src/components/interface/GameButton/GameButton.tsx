import React from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '../../../constants/colors';

interface ImageButtonProps {
  img: ImageSourcePropType;
  text: string;
  buttonStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  imgStyle?: StyleProp<ImageStyle>;
}
export const GameButton: React.FC<ImageButtonProps> = ({ buttonStyle, onPress, img, text, imgStyle }) => {
  return (
    <TouchableOpacity style={[styles.gamePlate, buttonStyle]} onPress={onPress}>
      <Image style={[styles.img, imgStyle]} source={img} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gamePlate: {
    aspectRatio: 1,
    width: '30%',
    backgroundColor: Colors.backgroundOpposite,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 15,
    padding: 6
  },
  img: {
    width: '45%',
    height: '45%'
  },
  text: {
    paddingStart: 3,
    paddingEnd: 3,
    marginTop: 5,
    color: Colors.white,
    fontSize: 16
  }
});
