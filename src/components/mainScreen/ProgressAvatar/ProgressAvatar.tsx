import { GameButton } from '@/components/interface/GameButton/GameButton';
import { userStore } from '@/store/user.store';
import { GlobalColors, GlobalStyles } from '@/values';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import * as Progress from 'react-native-progress';

interface ProgressAvatarProps {
  /** Container style */
  style?: StyleProp<ViewStyle>;
  /** Avatar size */
  size: number;
  /** Progress value between 0 and 1 */
  progress: number;
}
export const ProgressAvatar: React.FC<ProgressAvatarProps> = observer(({ style, size, progress }) => {
  /**
   * Avatar press handler, that will launch the gallery picker.
   */
  const onAvatarPress = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', maxHeight: size * 2, maxWidth: size * 2 });
    if (result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      userStore.updateUser({ avatar: asset.uri });
    }
  };

  return (
    <View
      style={[
        style,
        styles.container,
        {
          height: size,
          width: size
        },
      ]}
    >
      <GameButton
        img={userStore.user ? { uri: userStore.user.avatar } : require('@/assets/user.png')}
        fullIcon
        style={styles.avatar}
        onPress={onAvatarPress}
      />
      <Progress.Circle color={GlobalColors.primaryColor} fill={GlobalColors.black} style={styles.progress} progress={progress} size={size} thickness={7} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    height: '80%',
    width: '80%',
    zIndex: 2,
    borderRadius: 100,
    overflow: 'hidden',
    padding: 2
  },
  progress: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1
  }
});
