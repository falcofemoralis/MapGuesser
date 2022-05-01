import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import * as Progress from 'react-native-progress';
import { settingsStore } from '../../store/settings.store';
import { Colors } from '../../values/colors';
import { ImageButton } from '../interface/ImageButton/ImageButton';

interface ProgressAvatarProps {
  style?: StyleProp<ViewStyle>;
  size: number;
  progress: number;
}
export const ProgressAvatar: React.FC<ProgressAvatarProps> = observer(({ style, size, progress }) => {
  const onAvatarPress = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', maxHeight: size * 2, maxWidth: size * 2 });
    if (result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      settingsStore.updateUser({ avatar: asset.uri });
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
        }
      ]}
    >
      <ImageButton
        buttonStyle={styles.avatar}
        img={settingsStore.user ? { uri: settingsStore.user.avatar } : require('../../assets/africa.jpg')}
        onPress={onAvatarPress}
      />
      <Progress.Circle color={Colors.primaryColor} fill={Colors.black} style={styles.progress} progress={progress} size={size} thickness={7} />
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
  },
  progress: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1
  }
});
