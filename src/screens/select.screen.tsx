import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ContinentsCarousel } from '../components/ContinentsCarousel/ContinentsCarousel';
import { ContinentsSelector } from '../components/ContinentsSelector/ContinentsSelector';
import { GameButton } from '../components/interface/GameButton/GameButton';
import SwitchSelector from '../components/libs/SwitchSelector/SwitchSelector';
import { GameMode } from '../constants/gamemode';
import { PlayMode } from '../constants/playmode';
import { StreetViewMode } from '../constants/streetviewmode';
import Props from '../types/props.type';
import { Colors } from '../values/colors';
import { Dimens } from '../values/dimens';
import { GlobalStyles } from '../values/styles';
import { MAIN_CONTAINER_PADDING } from './main.screen';

export const SelectScreen: React.FC<Props<'Select'>> = ({ navigation, route }) => {
  const { t } = useTranslation();
  let streetViewMode: StreetViewMode = StreetViewMode.FREE;

  const playGame = () => {
    navigation.replace('Game', { gameMode: GameMode.SINGLE, playMode: PlayMode.NORMAL, streetViewMode });
  };

  return (
    <View style={styles.container}>
      <View style={styles.previewContainer}>
        <Image source={require('../assets/europe.jpg')} style={styles.previewImg} />
        <View style={styles.previewTitle}>
          <Text style={styles.previewText}>NORMAL</Text>
          <Text style={styles.descriptionText}>{t('CLASSIC_TITLE')}</Text>
        </View>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={[GlobalStyles.ccc, styles.mainContainer]}>
          {true && <ContinentsCarousel onSelect={() => {}} />}
          {/* <SwitchSelector
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
          /> */}
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
          <SwitchSelector
            initial={0}
            style={styles.selector}
            onPress={(value: StreetViewMode) => (streetViewMode = value)}
            textColor={Colors.white}
            selectedColor={Colors.white}
            buttonColor={Colors.primaryColor}
            backgroundColor={Colors.backgroundOpposite}
            options={[
              { label: 'Free', value: StreetViewMode.FREE },
              { label: 'Paid', value: StreetViewMode.PAID }
            ]}
          />
          <Text style={styles.hintText}>
            Paid game requires 10 coins to run. You will earn 0.3 coin in free game. You can watch ad or buy coins in the shop
          </Text>
        </View>
        {/* <Text style={styles.hintText}>Paid games has better panorama images and they're the best for better gaming experience.</Text> */}
        <View style={[GlobalStyles.rcc, styles.buttons]}>
          <GameButton style={styles.smallButton} title='+5' img={require('../assets/advertisement.png')} titleIcon={require('../assets/coin.png')} />
          <GameButton
            style={styles.playButton}
            iconStyle={styles.playButtonIcon}
            title='Play game'
            subTitle='-10'
            subTitleIcon={require('../assets/coin.png')}
            textStyle={{ fontWeight: 'bold' }}
            textIconStyle={{ width: '15%' }}
            onPress={playGame}
          />
          {/* <GameButton style={styles.playButton} iconStyle={styles.playButtonIcon} img={require('../assets/paid.jpg')} title='Paid' />  */}
          <GameButton style={styles.smallButton} title='shop' img={require('../assets/shop.png')} />
        </View>
      </ScrollView>
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
    height: '30%',
    width: '100%'
  },
  previewImg: {
    height: '100%',
    width: '100%'
  },
  previewTitle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: 10,
    backgroundColor: Colors.backgroundTransparent
  },
  previewText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 40
  },
  descriptionContainer: {
    marginTop: 5,
    marginBottom: 10
  },
  descriptionTitle: {
    color: Colors.white,
    fontSize: Dimens.headText,
    fontWeight: 'bold'
  },
  descriptionText: {
    color: Colors.white,
    fontSize: Dimens.normalText
  },
  mainContainer: {
    padding: 5
  },
  selector: {
    marginTop: 10,
    marginBottom: 10
  },
  buttons: {
    width: '100%',
    padding: 5
  },
  playButton: {
    aspectRatio: 3,
    width: SCREEN_WIDTH / 2,
    backgroundColor: Colors.secondaryColor
  },
  playButtonIcon: {
    position: 'absolute',
    height: '120%',
    width: '120%'
  },
  smallButton: {
    width: SCREEN_WIDTH / 4 / 1.5
  },
  hintText: {
    color: Colors.white,
    fontSize: Dimens.normalText
  }
});
