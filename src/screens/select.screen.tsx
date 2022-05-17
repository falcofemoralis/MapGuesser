import { GameButton } from '@/components/interface/GameButton/GameButton';
import SwitchSelector from '@/components/libs/SwitchSelector/SwitchSelector';
import { ContinentsCarousel } from '@/components/selectScreen/ContinentsCarousel/ContinentsCarousel';
import { Continent } from '@/constants/continent';
import { GameMode } from '@/constants/gamemode';
import { PlayMode } from '@/constants/playmode';
import { StreetViewMode } from '@/constants/streetviewmode';
import { userStore } from '@/store/user.store';
import { formatText } from '@/translations/formatText';
import Props from '@/types/props.type';
import { Keys, Misc, GlobalStyles, GlobalColors, Dimens } from '@/values';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { MAIN_CONTAINER_PADDING } from './main.screen';

const rewarded = RewardedAd.createForAdRequest(__DEV__ ? TestIds.REWARDED : Keys.rewardIds.SelectScreen);

export const SelectScreen: React.FC<Props<'Select'>> = observer(({ navigation, route }) => {
  const { t } = useTranslation();
  const gameCard = route.params.gameCard;
  const [streetViewMode, setStreetViewMode] = React.useState(StreetViewMode.FREE);
  const [gameMode, setGameMode] = React.useState(GameMode.SINGLE);
  let selectedContinent: Continent;

  const [adLoaded, setAdLoaded] = React.useState(false);

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

  const showAd = () => {
    if (adLoaded) {
      rewarded.show();
    }
  };

  const isPaidPlayable = () => {
    if (streetViewMode == StreetViewMode.PAID && userStore.coins >= 10) {
      return true;
    } else if (streetViewMode == StreetViewMode.FREE) {
      return true;
    } else {
      return false;
    }
  };

  const playGame = () => {
    if (!isPaidPlayable()) {
      ToastAndroid.showWithGravityAndOffset('Not allowed', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
      return;
    }

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
            textColor={GlobalColors.white}
            selectedColor={GlobalColors.white}
            buttonColor={GlobalColors.primaryColor}
            backgroundColor={GlobalColors.backgroundOpposite}
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
            textColor={GlobalColors.white}
            selectedColor={GlobalColors.white}
            buttonColor={GlobalColors.primaryColor}
            backgroundColor={GlobalColors.backgroundOpposite}
            options={[
              { label: t('FREE'), value: StreetViewMode.FREE },
              { label: t('PAID'), value: StreetViewMode.PAID }
            ]}
          />
          {streetViewMode == StreetViewMode.FREE
            ? formatText(t('FREE_MODE_DESC'), styles.hintText)
            : formatText(
                t('PAID_MODE_DESC'),
                styles.hintText,
                {
                  style: styles.hintBold,
                  text: Misc.COINS_FOR_PAID_GAME
                },
                { style: styles.hintBold, text: userStore.coins }
              )}
        </View>
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
            disabled={!isPaidPlayable()}
            style={[styles.playButton]}
            iconStyle={styles.playButtonIcon}
            title={t('PLAY')}
            subTitle={streetViewMode == StreetViewMode.PAID ? `- ${Misc.COINS_FOR_PAID_GAME}` : undefined}
            subTitleIcon={streetViewMode == StreetViewMode.PAID ? require('@/assets/coin.png') : undefined}
            textStyle={{ fontWeight: 'bold' }}
            textIconStyle={{ width: '15%' }}
            onPress={playGame}
          />
          <GameButton style={styles.smallButton} title={t('SHOP')} img={require('@/assets/shop.png')} />
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
    fontSize: Dimens.headText,
    fontWeight: 'bold'
  },
  descriptionText: {
    color: GlobalColors.white,
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
    fontSize: Dimens.normalText
  },
  hintBold: {
    color: GlobalColors.secondaryColor,
    fontWeight: 'bold'
  }
});
