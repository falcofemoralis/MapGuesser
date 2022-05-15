import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ContinentsCarousel } from '../components/ContinentsCarousel/ContinentsCarousel';
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
  const gameCard = route.params.gameCard;
  const [streetViewMode, setStreetViewMode] = React.useState(StreetViewMode.FREE);
  const [gameMode, setGameMode] = React.useState(GameMode.SINGLE);

  const playGame = () => {
    navigation.replace('Game', { gameSettings: { gameMode, playMode: gameCard.playMode, streetViewMode } });
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
          {gameCard.playMode == PlayMode.CONTINENTS && <ContinentsCarousel onSelect={() => {}} />}
          <SwitchSelector
            initial={gameMode}
            style={styles.selector}
            onPress={(value: GameMode) => setGameMode(value)}
            textColor={Colors.white}
            selectedColor={Colors.white}
            buttonColor={Colors.primaryColor}
            backgroundColor={Colors.backgroundOpposite}
            options={[
              { label: 'Normal', value: GameMode.SINGLE },
              { label: 'Rounds', value: GameMode.ROUND },
              { label: 'Time', value: GameMode.TIME }
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
              { label: 'Free', value: StreetViewMode.FREE },
              { label: 'Paid', value: StreetViewMode.PAID }
            ]}
          />
          <Text style={styles.hintText}>
            {streetViewMode == StreetViewMode.FREE
              ? "Paid games has better panorama images and they're the best for better gaming experience"
              : '   Paid game requires 10 coins to run. You will earn 0.3 coin in free game. You can watch ad or buy coins in the shop'}
          </Text>
        </View>
        <View style={[GlobalStyles.rcc, styles.buttons]}>
          <GameButton style={styles.smallButton} title='+5' img={require('../assets/advertisement.png')} titleIcon={require('../assets/coin.png')} />
          <GameButton
            style={styles.playButton}
            iconStyle={styles.playButtonIcon}
            title='Play a game'
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
