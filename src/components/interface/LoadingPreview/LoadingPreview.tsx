import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { Colors } from '../../../values/colors';
import { Misc } from '../../../values/misc';

interface LoadingPreviewProps {
  attempts?: number;
}
export const LoadingPreview: React.FC<LoadingPreviewProps> = ({ attempts }) => {
  return (
    <View style={styles.container}>
      <Progress.CircleSnail color={[Colors.primaryColor, 'red', 'green', 'blue']} />
      <Progress.Bar
        style={styles.bar}
        color={Colors.primaryColor}
        progress={(attempts ?? 0) / Misc.MAX_SEARCH_ATTEMPTS}
        width={Dimensions.get('window').width - 50}
      />
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
