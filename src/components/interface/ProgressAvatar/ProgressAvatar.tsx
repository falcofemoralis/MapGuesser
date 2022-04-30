import React from 'react';
import { Image, ImageSourcePropType, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import * as Progress from 'react-native-progress';
import { Colors } from '../../../constants/colors';

interface ProgressAvatarProps {
  avatar: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  size: number;
  progress: number;
}
export const ProgressAvatar: React.FC<ProgressAvatarProps> = ({ avatar, style, size, progress }) => {
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
      <Image style={[styles.avatar]} source={avatar}></Image>
      <Progress.Circle color={Colors.primaryColor} fill={Colors.black} style={styles.progress} progress={progress} size={size} thickness={7} />
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: '80%',
    width: '80%',
    zIndex: 2
  },
  progress: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1
  }
});
