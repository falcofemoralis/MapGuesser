import React from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface ImageButtonProps {
  img: ImageSourcePropType;
  buttonStyle: StyleProp<ViewStyle>;
  onPress?: () => void;
  imgStyle?: StyleProp<ImageStyle>;
}
export const ImageButton: React.FC<ImageButtonProps> = ({ buttonStyle, onPress, img, imgStyle }) => {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Image style={[styles.img, imgStyle]} source={img} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {
    height: '100%',
    width: '100%'
  }
});
