import { CountryImages } from '@/assets/countries';
import { GameButton } from '@/components/interface/GameButton/GameButton';
import { SelectCarousel } from '@/components/selectScreen/Carousel/Carousel';
import { Slider } from '@/components/selectScreen/Slider/Slider';
import { Switch } from '@/components/selectScreen/Switch/Switch';
import { Continent } from '@/constants/continent';
import { Country } from '@/constants/country';
import { Difficulty } from '@/constants/difficulty';
import { PlayMode } from '@/constants/playmode';
import { StreetViewMode } from '@/constants/streetviewmode';
import { userStore } from '@/store/user.store';
import { formatText } from '@/translations/formatText';
import { ContinentCard, CountryCard } from '@/types/card.type';
import { GameMode } from '@/types/gamemode.type';
import Props from '@/types/props.type';
import { GlobalColors, GlobalDimens, GlobalStyles, Keys, Misc } from '@/values';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

const rewarded = RewardedAd.createForAdRequest(__DEV__ ? TestIds.REWARDED : Keys.rewardIds.SelectScreen);

const SelectScreen: React.FC<Props<'Select'>> = observer(({ navigation, route }) => {
  const { t } = useTranslation();
  const gameCard = route.params.gameCard;
  const [streetViewMode, setStreetViewMode] = React.useState(StreetViewMode.FREE);
  const [gameMode, setGameMode] = React.useState<GameMode>({ isRounds: false, isTimer: false });
  const [difficulty, setDifficulty] = React.useState(
    userStore.progress.lvl <= Misc.UNLOCK_ALL_LVL && gameCard.playMode == PlayMode.NORMAL ? Difficulty.EASY : Difficulty.NORMAL
  );
  console.log(difficulty);

  const [time, setTime] = React.useState(Misc.GAME_MODE_TIME_ST);
  const [rounds, setRounds] = React.useState(Misc.GAME_MODE_ROUNDS_ST);
  const [adLoaded, setAdLoaded] = React.useState(false);
  let selectedContinent: Continent;
  let selectedCountry: Country;

  React.useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setAdLoaded(true);
    });

    const unsubscribeEarned = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, reward => {
      userStore.updateCoins(Misc.COINS_PER_AD, '+');
      setAdLoaded(false);
    });

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  /**
   * Start a game
   */
  const playGame = () => {
    if (!isGamePlayable()) {
      ToastAndroid.showWithGravityAndOffset('Not allowed', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
      return;
    }

    if (selectedCountry == Country.Ukraine && streetViewMode == StreetViewMode.FREE) {
      ToastAndroid.showWithGravityAndOffset(t('SOON'), ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
      return;
    }

    navigation.replace('Game', {
      gameSettings: {
        playMode: gameCard.playMode,
        streetViewMode,
        difficulty,
        isRounds: gameMode.isRounds,
        isTimer: gameMode.isTimer
      },
      gameData: { continent: selectedContinent, country: selectedCountry, time, rounds }
    });
  };

  /**
   * Show reward advert
   */
  const showAd = () => {
    if (adLoaded) {
      rewarded.show();
    }
  };

  /**
   * Identifies if user can play the the game
   * @returns true - playable, false - user can't play the paid game
   */
  const isGamePlayable = () => {
    if (streetViewMode == StreetViewMode.PAID && userStore.coins >= Misc.COINS_FOR_PAID_GAME) {
      // selected paid game mode and user has required coins
      return true;
    } else if (streetViewMode == StreetViewMode.FREE) {
      // free mode don't have any restrictions
      return true;
    } else {
      // not allowed
      return false;
    }
  };

  const showSoonToast = () => {
    ToastAndroid.showWithGravityAndOffset(t('SOON'), ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
  };

  /**
   * Switches data
   */
  const gameModes: { label: string; value: GameMode }[] = [
    { label: t('SINGLE'), value: { isTimer: false, isRounds: false } },
    { label: t('ROUNDS'), value: { isTimer: false, isRounds: true } },
    { label: t('TIME'), value: { isTimer: true, isRounds: false } },
    { label: t('TIME_ROUNDS'), value: { isTimer: true, isRounds: true } }
  ];
  const streetViewModes = [
    { label: t('FREE'), value: StreetViewMode.FREE },
    { label: t('PAID'), value: StreetViewMode.PAID }
  ];
  const difficulties = [
    { label: t('EASY'), value: Difficulty.EASY },
    { label: t('NORMAL'), value: Difficulty.NORMAL }
  ];

  /**
   * Hints for selected street view mode
   */
  const freeHintText = formatText(t('FREE_MODE_DESC'), styles.hintText);
  const paidHintText = formatText(
    t('PAID_MODE_DESC'),
    styles.hintText,
    {
      style: styles.hintBold,
      text: Misc.COINS_FOR_PAID_GAME
    },
    { style: styles.hintBold, text: userStore.coins.toFixed(0) }
  );

  /**
   * Carousels data
   */
  const continentCards: ContinentCard[] = [
    { title: t('AS'), img: require('@/assets/asia.jpg'), continent: Continent.as },
    { title: t('EU'), img: require('@/assets/europe.jpg'), continent: Continent.eu },
    { title: t('NA'), img: require('@/assets/north_america.jpg'), continent: Continent.na },
    { title: t('SA'), img: require('@/assets/south_america.jpg'), continent: Continent.sa },
    { title: t('AF'), img: require('@/assets/africa.jpg'), continent: Continent.af },
    { title: t('AU'), img: require('@/assets/australia.jpg'), continent: Continent.au }
  ];

  const getCountryCards = (): CountryCard[] => {
    const cards: CountryCard[] = [];
    for (const country of Object.values(Country)) {
      cards.push({ title: t(country.toString() as any), img: CountryImages[country], country });
    }

    return cards;
  };

  return (
    <View style={styles.container}>
      <View style={styles.previewContainer}>
        <Image source={gameCard.img} style={styles.previewImg} />
        <View style={styles.previewTitle}>
          <Text style={styles.previewText}>{gameCard.title}</Text>
          <Text style={styles.descriptionText}>{gameCard.description}</Text>
        </View>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={[GlobalStyles.ccc, styles.mainContainer]}>
          {gameCard.playMode == PlayMode.CONTINENTS && (
            <SelectCarousel cards={continentCards} onSelect={continentCard => (selectedContinent = continentCard.continent)} />
          )}
          {gameCard.playMode == PlayMode.COUNTRIES && (
            <SelectCarousel cards={getCountryCards()} onSelect={countryCard => (selectedCountry = countryCard.country)} />
          )}
          <Switch initial={0} onSelect={value => setGameMode(value)} options={gameModes} />
          {gameMode.isTimer && (
            <Slider
              min={Misc.GAME_MODE_TIME_MIN}
              max={Misc.GAME_MODE_TIME_MAX}
              onSelect={v => setTime(v)}
              unit={t('TIME_UNIT')}
              initial={Misc.GAME_MODE_TIME_ST}
            />
          )}
          {gameMode.isRounds && (
            <Slider
              min={Misc.GAME_MODE_ROUNDS_MIN}
              max={Misc.GAME_MODE_ROUNDS_MAX}
              onSelect={v => setRounds(v)}
              unit={t('ROUNDS_UNIT')}
              initial={Misc.GAME_MODE_ROUNDS_ST}
            />
          )}
          <Switch initial={streetViewMode} onSelect={value => setStreetViewMode(value)} options={streetViewModes} />
          {streetViewMode == StreetViewMode.FREE ? freeHintText : paidHintText}
          {streetViewMode == StreetViewMode.FREE && gameCard.playMode == PlayMode.NORMAL && (
            <Switch initial={difficulty} onSelect={value => setDifficulty(value)} options={difficulties} />
          )}
          <View style={[GlobalStyles.rcc, styles.buttons]}>
            <GameButton
              disabled={!adLoaded}
              style={[styles.smallButton]}
              title={`+ ${Misc.COINS_PER_AD}`}
              img={require('@/assets/advertisement.png')}
              titleIcon={require('@/assets/coin.png')}
              onPress={showAd}
            />
            <GameButton
              disabled={!isGamePlayable()}
              style={[styles.playButton]}
              iconStyle={styles.playButtonIcon}
              title={t('PLAY')}
              subTitle={streetViewMode == StreetViewMode.PAID ? `- ${Misc.COINS_FOR_PAID_GAME}` : undefined}
              subTitleIcon={streetViewMode == StreetViewMode.PAID ? require('@/assets/coin.png') : undefined}
              textStyle={{ fontWeight: 'bold' }}
              textIconStyle={{ width: '15%' }}
              onPress={playGame}
            />
            <GameButton style={styles.smallButton} img={require('@/assets/shop.png')} onPress={showSoonToast} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
});

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.mainBackground
  },
  scroll: {
    width: '100%',
    height: '100%'
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
    backgroundColor: GlobalColors.backgroundTransparent
  },
  previewText: {
    color: GlobalColors.white,
    fontWeight: 'bold',
    fontSize: 40
  },
  descriptionContainer: {
    marginTop: 5,
    marginBottom: 10
  },
  descriptionTitle: {
    color: GlobalColors.white,
    fontSize: GlobalDimens.headText,
    fontWeight: 'bold'
  },
  descriptionText: {
    color: GlobalColors.white,
    fontSize: GlobalDimens.normalText
  },
  mainContainer: {
    padding: 5
  },
  buttons: {
    width: '100%',
    marginTop: 5
  },
  playButton: {
    aspectRatio: 3,
    width: SCREEN_WIDTH / 2,
    backgroundColor: GlobalColors.secondaryColor
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
    color: GlobalColors.white,
    fontSize: GlobalDimens.normalText
  },
  hintBold: {
    color: GlobalColors.secondaryColor,
    fontWeight: 'bold'
  }
});

export default SelectScreen;
