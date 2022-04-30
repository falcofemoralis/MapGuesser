import React from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '../../../values/colors';
import { Dimens } from '../../../values/dimens';

interface ImageButtonProps {
  img: ImageSourcePropType;
  text: string;
  buttonStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  iconStyle?: StyleProp<ImageStyle>;
}
export const GameButton: React.FC<ImageButtonProps> = ({ buttonStyle, onPress, img, text, iconStyle }) => {
  return (
    <TouchableOpacity style={[styles.container, buttonStyle]} onPress={onPress}>
      <Image style={[styles.icon, iconStyle]} source={img} />
      <Text style={styles.title}>{text}</Text>
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
    paddingStart: 3,
    paddingEnd: 3,
    marginTop: 5,
    color: Colors.white,
    fontSize: Dimens.normalText,
    textAlign: 'center'
  }
});
