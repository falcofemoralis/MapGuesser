import React from 'react';
import { ImageSourcePropType, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import * as Progress from 'react-native-progress';
import { Colors } from '../../../values/colors';
import { ImageButton } from '../ImageButton/ImageButton';
import { launchImageLibrary } from 'react-native-image-picker';
import { settingsStore } from '../../../store/settings.store';
import { observer } from 'mobx-react-lite';

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
        {
          height: size,
          width: size,
          justifyContent: 'center',
          alignItems: 'center'
        }
      ]}
    >
      <ImageButton
        buttonStyle={styles.avatar}
        img={settingsStore.user ? settingsStore.user.avatar : require('../../../assets/user.png')}
        onPress={onAvatarPress}
      />
      <Progress.Circle color={Colors.primaryColor} fill={Colors.black} style={styles.progress} progress={progress} size={size} thickness={7} />
    </View>
  );
});

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
