import React from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface ImageButtonProps {
  /** Triggered on button press */
  img: ImageSourcePropType;
  /** Triggered on button press */
  onPress?: () => void;
  /** Button style */
  buttonStyle: StyleProp<ViewStyle>;
  /** Icon style */
  iconStyle?: StyleProp<ImageStyle>;
}
export const ImageButton: React.FC<ImageButtonProps> = ({ buttonStyle, onPress, img, iconStyle }) => {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} activeOpacity={0.5}>
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
