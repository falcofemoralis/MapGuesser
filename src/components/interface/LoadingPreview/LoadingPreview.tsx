import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { Colors } from '../../../values/colors';

interface LoadingPreviewProps {}
export const LoadingPreview: React.FC<LoadingPreviewProps> = () => {
  return (
    <View style={styles.container}>
      <Progress.CircleSnail color={[Colors.primaryColor, 'red', 'green', 'blue']} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    zIndex: 999
  }
});
