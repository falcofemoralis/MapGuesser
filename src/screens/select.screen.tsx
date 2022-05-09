import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { GameButton } from '../components/interface/GameButton/GameButton';
import SwitchSelector from '../components/libs/SwitchSelector/SwitchSelector';
import Props from '../types/props.type';
import { Colors } from '../values/colors';
import { Dimens } from '../values/dimens';
import { GlobalStyles } from '../values/styles';
import { MAIN_CONTAINER_PADDING } from './main.screen';

export const SelectScreen: React.FC<Props<'Select'>> = ({ navigation, route }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.previewContainer}>
        <Image source={require('../assets/europe.jpg')} style={styles.preview} />
        <Text style={styles.previewText}>NORMAL</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{t('CLASSIC_TITLE')}</Text>
        </View>
        <View style={[GlobalStyles.ccc]}>
          <SwitchSelector
            initial={0}
            style={styles.selector}
            onPress={(value: any) => console.log(value)}
            textColor={Colors.white}
            selectedColor={Colors.white}
            buttonColor={Colors.primaryColor}
            backgroundColor={Colors.backgroundOpposite}
            options={[
              { label: 'Easy', value: 'f' }, //images.feminino = require('./path_to/assets/img/feminino.png')
              { label: 'Normal', value: 'm' }, //images.masculino = require('./path_to/assets/img/masculino.png')
              { label: 'Hard', value: 'm' } //images.masculino = require('./path_to/assets/img/masculino.png')
            ]}
          />
          <SwitchSelector
            initial={0}
            style={styles.selector}
            onPress={(value: any) => console.log(value)}
            textColor={Colors.white}
            selectedColor={Colors.white}
            buttonColor={Colors.primaryColor}
            backgroundColor={Colors.backgroundOpposite}
            options={[
              { label: 'Normal', value: 'f' }, //images.feminino = require('./path_to/assets/img/feminino.png')
              { label: 'Rounds', value: 'm' }, //images.masculino = require('./path_to/assets/img/masculino.png')
              { label: 'Time', value: 'm' } //images.masculino = require('./path_to/assets/img/masculino.png')
            ]}
          />
        </View>
      </ScrollView>
      <View style={[GlobalStyles.rcc, styles.buttons]}>
        <GameButton style={styles.smallButton} text='+5' img={require('../assets/coin.png')} />
        <GameButton style={styles.playButton} img={require('../assets/menu.png')} text='SD' />
        <GameButton style={styles.playButton} img={require('../assets/menu.png')} text='HD (-10 coins)' />
        <GameButton style={styles.smallButton} text='shop' img={require('../assets/shop.png')} />
      </View>
    </View>
  );
};

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground
  },
  scroll: {
    width: '100%',
    height: '100%',
    padding: MAIN_CONTAINER_PADDING
  },
  previewContainer: {
    height: '35%',
    width: '100%'
  },
  preview: {
    height: '100%',
    width: '100%'
  },
  previewText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 10,
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 40
  },
  descriptionContainer: {
    marginTop: 10,
    marginBottom: 10
  },
  descriptionTitle: {
    color: Colors.white,
    fontSize: Dimens.headText,
    fontWeight: 'bold'
  },
  descriptionText: {
    color: Colors.gray,
    fontSize: Dimens.normalText
  },
  selector: {
    marginTop: 10,
    marginBottom: 10
  },
  buttons: {
    position: 'absolute',
    bottom: 0,
    marginTop: 10,
    width: '100%',
    padding: 15
  },
  playButton: {
    margin: 0,
    width: SCREEN_WIDTH / 4
  },
  smallButton: {
    margin: 0,
    width: SCREEN_WIDTH / 4 / 2,
    borderRadius: 5
  }
});
