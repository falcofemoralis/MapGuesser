import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { Colors } from '../../../values/colors';

interface LoadingPreviewProps {
  /** Progress value between 0 and 1 */
  progress: number;
}
export const LoadingPreview: React.FC<LoadingPreviewProps> = ({ progress }) => {
  return (
    <View style={styles.container}>
      <Progress.CircleSnail color={[Colors.primaryColor, 'red', 'green', 'blue']} />
      <Progress.Bar style={styles.bar} color={Colors.primaryColor} progress={progress} width={Dimensions.get('window').width - 50} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainBackground,
    zIndex: 999
  },
  bar: {
    marginTop: 25
  }
});
