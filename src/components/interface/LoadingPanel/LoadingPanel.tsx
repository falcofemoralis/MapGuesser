import { GlobalColors, GlobalDimens } from '@/values';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';

interface LoadingPanelProps {
  /** Progress value between 0 and 1 */
  progress?: number;
}
export const LoadingPanel: React.FC<LoadingPanelProps> = ({ progress }) => {
  const { t } = useTranslation();
  const hints = [t('LOADING_HINT_1'), t('LOADING_HINT_2'), t('LOADING_HINT_3'), t('LOADING_HINT_4')];
  const [index, setIndex] = React.useState(0);
  let isMounted = true;

  React.useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  const updateHint = () => {
    setTimeout(() => {
      if (isMounted) {
        const i = index + 1;

        if (i > hints.length - 1) {
          return;
        }

        // infinity
        // if (i > (hints.length - 1)) {
        //   i = 0;
        // }

        setIndex(i);
      }
    }, 3000 + index * 1000);
  };

  updateHint();

  return (
    <View style={styles.container}>
      <Progress.CircleSnail color={[GlobalColors.primaryColor, 'red', 'green', 'blue']} />
      {progress != undefined && (
        <Progress.Bar style={styles.bar} color={GlobalColors.primaryColor} progress={progress} width={Dimensions.get('window').width - 50} />
      )}
      <Text style={styles.text}>{hints[index]}</Text>
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
    marginTop: 15
  },
  text: {
    marginTop: 15,
    fontWeight: 'bold',
    color: GlobalColors.white,
    fontSize: GlobalDimens.normalText
  }
});
