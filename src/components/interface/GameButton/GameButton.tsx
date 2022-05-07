import React from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '../../../values/colors';
import { Dimens } from '../../../values/dimens';

interface ImageButtonProps {
  /** Image to display. Use 'require' to get the image */
  img: ImageSourcePropType;
  /** Button title */
  text: string;
  /** Button style */
  buttonStyle?: StyleProp<ViewStyle>;
  /** Triggered on button press */
  onPress?: () => void;
  /** Icon style */
  iconStyle?: StyleProp<ImageStyle>;
  /** Text style */
  textStyle?: StyleProp<TextStyle>;
}
export const GameButton: React.FC<ImageButtonProps> = ({ buttonStyle, onPress, img, text, iconStyle, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.container, buttonStyle]} onPress={onPress}>
      <Image style={[styles.icon, iconStyle]} source={img} />
      <Text style={[styles.title, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    width: '30%',
    backgroundColor: Colors.backgroundOpposite,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 15,
    padding: 6
  },
  icon: {
    width: '45%',
    height: '45%'
  },
  title: {
    paddingStart: 0,
    paddingEnd: 0,
    marginTop: 5,
    color: Colors.white,
    fontSize: Dimens.normalText,
    textAlign: 'center'
  }
});
