import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import { Colors } from '../../../constants/colors';

interface LoadingPreviewProps {}
export const LoadingPreview: React.FC<LoadingPreviewProps> = () => {
  return (
    <View style={styles.loadingContainer}>
      <Progress.CircleSnail color={['red', 'green', 'blue']} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    zIndex: 999
  }
});
