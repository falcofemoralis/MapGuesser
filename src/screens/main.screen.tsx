import { CountryImages } from '@/assets/countries';
import { Banner } from '@/components/interface/Banner/Banner';
import { GameButton } from '@/components/interface/GameButton/GameButton';
import { GamesCarousel } from '@/components/mainScreen/GamesCarousel/GamesCarousel';
import { ProgressAvatar } from '@/components/mainScreen/ProgressAvatar/ProgressAvatar';
import { Settings } from '@/components/modal/Settings/Settings';
import { Country } from '@/constants/country';
import { PlayMode } from '@/constants/playmode';
import { Position } from '@/constants/position';
import ProgressManager from '@/managers/progress.manager';
import { userStore } from '@/store/user.store';
import { GameCard } from '@/types/card.type';
import Props from '@/types/props.type';
import { Utils } from '@/utils/utils';
import { GlobalColors, GlobalDimens, GlobalStyles, Keys } from '@/values';
import date from 'date-and-time';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, Text, View, ToastAndroid } from 'react-native';

const MainScreen: React.FC<Props<'Main'>> = observer(({ navigation }) => {
  const { t } = useTranslation();
  const [isSettings, setSetting] = React.useState(false); // state of modal settings window
  const [countryImage, setCountryImage] = React.useState(CountryImages[Utils.randomFromArray(Object.values(Country))]);

  /**
   * User select game handler
   * @param gameCard - selected game card
   */
  const onGameSelect = (gameCard: GameCard) => {
    navigation.navigate('Select', { gameCard });
  };

  /**
   *  Functions that return formatted user data
   */
  const getProgress = () => userStore.progress.xp / ProgressManager.lvl(userStore.progress.lvl + 1);
  const getLvl = () => userStore.progress.lvl;
  const getXP = () => userStore.progress.totalXp.toFixed(0);
  const getAccuracy = () => ProgressManager.getTotalAccuracy(userStore.progress.accuracy).toFixed(2);
  const getTime = () => date.format(new Date(userStore.progress.playtime), 'HH:mm:ss', true);
  const getCoins = () => userStore.coins.toFixed(0);

  /**
   * Window togglers
   */
  const toggleSettings = () => setSetting(!isSettings);

  const cards: GameCard[] = [
    {
      title: t('NORMAL_MODE'),
      img: require('@/assets/classic.jpg'),
      description: t('NORMAL_TITLE'),
      playMode: PlayMode.NORMAL,
      requiredLvl: 0
    },
    {
      title: t('COUNTRY_MODE'),
      img: countryImage,
      description: t('COUNTRY_TITLE'),
      playMode: PlayMode.COUNTRIES,
      requiredLvl: 0
    },
    {
      title: t('CONTINENTS_MODE'),
      img: require('@/assets/earth.jpg'),
      description: t('CONTINENTS_TITLE'),
      playMode: PlayMode.CONTINENTS,
      requiredLvl: 0
    }
  ];

  const showSoonToast = () => {
    ToastAndroid.showWithGravityAndOffset(t('SOON'), ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
  };

  return (
    <View style={[styles.container]}>
      <Settings visible={isSettings} onClose={toggleSettings} />
      <ScrollView style={styles.scroll}>
        {/** Header */}
        <View style={[GlobalStyles.rcc, styles.headerContainer]}>
          <ProgressAvatar size={50} progress={getProgress()} style={styles.avatarBtn} />
          <View style={[GlobalStyles.ccc, styles.statisticRow]}>
            <Text style={styles.lvlText}>
              {t('LEVEL')} {getLvl()}
            </Text>
            {/* <Text style={styles.username}>
              {t('LOCAL_USER')} {getLvl()}
            </Text> */}
            <Text style={styles.username}>{getTime()}</Text>
            <View style={[GlobalStyles.rcc, styles.moneyRow]}>
              <View style={[GlobalStyles.rcc, styles.itemContainer]}>
                <Text style={styles.itemText}>{getXP()}</Text>
                <Image source={require('@/assets/star.png')} style={styles.itemIcon} />
              </View>
              <View style={[GlobalStyles.rcc, styles.itemContainer]}>
                <Text style={styles.itemText}>{getCoins()}</Text>
                <Image source={require('@/assets/coin.png')} style={styles.itemIcon} />
              </View>
            </View>
          </View>
          <GameButton img={require('@/assets/settings.png')} fullIcon style={styles.settingsBtn} onPress={toggleSettings} />
        </View>
        {/** Game modes */}
        <GamesCarousel cards={cards} onSelect={onGameSelect} />
        {/** Main */}
        <View style={[styles.mainContainer]}>
          <View style={[styles.firstRow]}>
            <GameButton style={[styles.leftGameButton]} img={require('@/assets/mp.png')} title={t('MULTIPLAYER')} onPress={showSoonToast} />
            <GameButton style={[styles.leftGameButton]} img={require('@/assets/challenges.png')} title={t('CHALLENGES')} onPress={showSoonToast} />
          </View>
          <View style={[styles.secondRow]}>
            <GameButton
              style={styles.rightSmallGameButton}
              img={require('@/assets/achievements.png')}
              title={t('ACHIEVEMENTS')}
              iconStyle={styles.gameButtonIcon}
              onPress={showSoonToast}
            />
            <GameButton style={styles.rightGameButton} img={require('@/assets/shop.png')} title={t('SHOP')} onPress={showSoonToast} />
            <GameButton
              style={styles.rightSmallGameButton}
              img={require('@/assets/leaderboard.png')}
              title={t('LEADERBOARD')}
              iconStyle={styles.gameButtonIcon}
              onPress={showSoonToast}
            />
          </View>
        </View>
      </ScrollView>
      <Banner position={Position.BOTTOM} id={Keys.bannersIds.MainScreen} />
    </View>
  );
});

export const MAIN_CONTAINER_PADDING = 10;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: GlobalColors.mainBackground,
    padding: MAIN_CONTAINER_PADDING
  },
  scroll: {
    width: '100%'
  },
  headerContainer: {
    width: '100%',
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 5
  },
  avatarBtn: {
    borderRadius: 32,
    backgroundColor: GlobalColors.backgroundTransparent
  },
  statisticRow: {
    marginStart: 10,
    marginEnd: 10,
    flexGrow: 1
  },
  username: {
    color: GlobalColors.white,
    fontSize: GlobalDimens.headText,
    fontWeight: 'bold'
  },
  lvlText: {
    color: GlobalColors.gray,
    fontSize: GlobalDimens.normalText,
    alignSelf: 'center'
  },
  moneyRow: {},
  itemContainer: {
    marginStart: 25,
    marginEnd: 25
  },
  itemText: {
    color: GlobalColors.gray,
    fontSize: GlobalDimens.normalText,
    alignSelf: 'center'
  },
  itemIcon: {
    height: 10,
    width: 10,
    marginStart: 5
  },
  settingsBtn: {
    height: 50,
    width: 50,
    padding: 12,
    borderRadius: 32,
    backgroundColor: GlobalColors.backgroundTransparent
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    padding: 0, // button sizes
    paddingBottom: 35
  },
  firstRow: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginEnd: 5
  },
  secondRow: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginStart: 5
  },
  gameButtonIcon: {
    // width: '120%',
    height: '55%',
    resizeMode: 'contain'
  },
  leftGameButton: {
    width: '100%',
    marginTop: 7.5,
    marginBottom: 7.5 // 15 + 15 = 30
  },
  rightGameButton: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5
  },
  rightSmallGameButton: {
    width: '100%',
    aspectRatio: 2,
    marginTop: 5,
    marginBottom: 5 // 10 + 10 + 10 = 30
  },
  headerText: {
    color: GlobalColors.white,
    fontSize: GlobalDimens.headText,
    fontWeight: 'bold'
  }
});

export default MainScreen;
