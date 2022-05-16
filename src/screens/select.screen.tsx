import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ContinentsCarousel } from '../components/ContinentsCarousel/ContinentsCarousel';
import { GameButton } from '../components/interface/GameButton/GameButton';
import SwitchSelector from '../components/libs/SwitchSelector/SwitchSelector';
import { Continent } from '../constants/continent';
import { GameMode } from '../constants/gamemode';
import { PlayMode } from '../constants/playmode';
import { StreetViewMode } from '../constants/streetviewmode';
import { formatText } from '../translations/formatText';
import Props from '../types/props.type';
import { Colors } from '../values/colors';
import { Dimens } from '../values/dimens';
import { Misc } from '../values/misc';
import { GlobalStyles } from '../values/styles';
import { MAIN_CONTAINER_PADDING } from './main.screen';

export const SelectScreen: React.FC<Props<'Select'>> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const gameCard = route.params.gameCard;
  const [streetViewMode, setStreetViewMode] = React.useState(StreetViewMode.FREE);
  const [gameMode, setGameMode] = React.useState(GameMode.SINGLE);
  let selectedContinent: Continent;

  const playGame = () => {
    navigation.replace('Game', { gameSettings: { gameMode, playMode: gameCard.playMode, streetViewMode }, playModeData: { continent: selectedContinent } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.previewContainer}>
        <Image source={gameCard.preview} style={styles.previewImg} />
        <View style={styles.previewTitle}>
          <Text style={styles.previewText}>{gameCard.title}</Text>
          <Text style={styles.descriptionText}>{gameCard.description}</Text>
        </View>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={[GlobalStyles.ccc, styles.mainContainer]}>
          {gameCard.playMode == PlayMode.CONTINENTS && <ContinentsCarousel onSelect={continentCard => (selectedContinent = continentCard.continent)} />}
          <SwitchSelector
            initial={gameMode}
            style={styles.selector}
            onPress={(value: GameMode) => setGameMode(value)}
            textColor={Colors.white}
            selectedColor={Colors.white}
            buttonColor={Colors.primaryColor}
            backgroundColor={Colors.backgroundOpposite}
            options={[
              { label: t('SINGLE'), value: GameMode.SINGLE },
              { label: t('ROUNDS'), value: GameMode.ROUND },
              { label: t('TIME'), value: GameMode.TIME }
            ]}
          />
          <SwitchSelector
            initial={streetViewMode}
            style={styles.selector}
            onPress={(value: StreetViewMode) => setStreetViewMode(value)}
            textColor={Colors.white}
            selectedColor={Colors.white}
            buttonColor={Colors.primaryColor}
            backgroundColor={Colors.backgroundOpposite}
            options={[
              { label: t('FREE'), value: StreetViewMode.FREE },
              { label: t('PAID'), value: StreetViewMode.PAID }
            ]}
          />
          {formatText(streetViewMode == StreetViewMode.FREE ? t('FREE_MODE_DESC') : t('PAID_MODE_DESC'), styles.hintText, {
            style: styles.hintBold,
            text: Misc.COINS_PER_PAID_GAME
          })}
        </View>
        <View style={[GlobalStyles.rcc, styles.buttons]}>
          <GameButton style={styles.smallButton} title='+5' img={require('../assets/advertisement.png')} titleIcon={require('../assets/coin.png')} />
          <GameButton
            style={styles.playButton}
            iconStyle={styles.playButtonIcon}
            title='Play'
            subTitle={streetViewMode == StreetViewMode.PAID ? '-10' : undefined}
            subTitleIcon={streetViewMode == StreetViewMode.PAID ? require('../assets/coin.png') : undefined}
            textStyle={{ fontWeight: 'bold' }}
            textIconStyle={{ width: '15%' }}
            onPress={playGame}
          />
          <GameButton style={styles.smallButton} title={t('SHOP')} img={require('../assets/shop.png')} />
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
  },
  hintBold: {
    color: Colors.secondaryColor,
    fontWeight: 'bold'
  }
});
