import React from 'react';
import { Image, ImageSourcePropType, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import * as Progress from 'react-native-progress';

interface ProgressAvatarProps {
  img: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  size: number;
  progress: number;
}
export const ProgressAvatar: React.FC<ProgressAvatarProps> = ({ img, style, size, progress }) => {
  return (
    <View
      style={[
        style,
        {
          height: size,
          width: size,
          justifyContent: 'center',
          alignItems: 'center'
        }
      ]}
    >
      <Image style={[styles.img]} source={img}></Image>
      <Progress.Circle style={styles.progress} progress={progress} size={size} thickness={7} />
    </View>
  );
};

const styles = StyleSheet.create({
  progress: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1
  },
  img: {
    height: '80%',
    width: '80%',
    zIndex: 2
  }
});
