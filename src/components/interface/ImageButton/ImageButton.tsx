import React from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface ImageButtonProps {
  img: ImageSourcePropType;
  buttonStyle: StyleProp<ViewStyle>;
  onPress?: () => void;
  iconStyle?: StyleProp<ImageStyle>;
}
export const ImageButton: React.FC<ImageButtonProps> = ({ buttonStyle, onPress, img, iconStyle }) => {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Image style={[styles.icon, iconStyle]} source={img} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: '100%',
    width: '100%'
  }
});
