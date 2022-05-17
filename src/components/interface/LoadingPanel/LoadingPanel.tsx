import { GlobalColors } from '@/values';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';

interface LoadingPanelProps {
  /** Progress value between 0 and 1 */
  progress?: number;
}
export const LoadingPanel: React.FC<LoadingPanelProps> = ({ progress }) => {
  return (
    <View style={styles.container}>
      <Progress.CircleSnail color={[GlobalColors.primaryColor, 'red', 'green', 'blue']} />
      {progress != undefined && <Progress.Bar style={styles.bar} color={GlobalColors.primaryColor} progress={progress} width={Dimensions.get('window').width - 50} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalColors.mainBackground,
    zIndex: 999
  },
  bar: {
    marginTop: 25
  }
});
