import { MAIN_CONTAINER_PADDING } from '@/screens/main.screen';
import { userStore } from '@/store/user.store';
import { formatText } from '@/translations/formatText';
import { GameCard } from '@/types/card.type';
import { GlobalColors, GlobalDimens } from '@/values';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json

const SLIDER_WIDTH = Dimensions.get('window').width - MAIN_CONTAINER_PADDING * 2;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.95);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 5) / 9);

const DECK_SIZE = '35%';
const SMALL_DECK_SIZE = '23%';

interface GamesCarouselProps {
  /** Cards */
  cards: GameCard[];
  /** Triggered on game select */
  onSelect: (gameCard: GameCard) => void;
}
export const GamesCarousel: React.FC<GamesCarouselProps> = ({ onSelect, cards }) => {
  const { t } = useTranslation();
  const [currentIndex, setIndex] = React.useState(0); // index of current item

  /**
   * Return true if game is available to play
   * @param lvl - minimum lvl of the game
   * @returns true if game is unlocked, false otherwise
   */
  const isUnlocked = (lvl: number) => {
    return userStore.progress.lvl >= lvl;
  };

  const _renderItem = ({ item, index }: { item: GameCard; index: number }) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => onSelect(item)} disabled={index != currentIndex || !isUnlocked(item.requiredLvl)}>
        <Image style={styles.preview} source={item.img} />
        <View style={[styles.deck, { height: isUnlocked(item.requiredLvl) ? SMALL_DECK_SIZE : DECK_SIZE }]} />
        <View style={[styles.deckContainer, { height: isUnlocked(item.requiredLvl) ? SMALL_DECK_SIZE : DECK_SIZE }]}>
          <Text style={styles.title}>{item.title}</Text>
          {!isUnlocked(item.requiredLvl) && formatText(t('UNLOCKED_AT'), styles.level, { text: item.requiredLvl })}
          {/* <Text style={styles.description}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Carousel
      containerCustomStyle={styles.carouselContainer}
      firstItem={currentIndex}
      layout={'default'}
      data={cards}
      enableMomentum={true}
      decelerationRate={'normal'}
      renderItem={_renderItem}
      sliderWidth={SLIDER_WIDTH}
      itemWidth={ITEM_WIDTH}
      itemHeight={ITEM_HEIGHT}
      onSnapToItem={index => setIndex(index)}
    />
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 15,
    marginBottom: 15 //60
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GlobalColors.backgroundOpposite,
    borderRadius: 16,
    overflow: 'hidden'
  },
  preview: {
    height: '100%',
    width: '100%',
    zIndex: 1
  },
  deck: {
    position: 'absolute',
    opacity: 0.6,
    backgroundColor: '#000',
    width: '100%',
    bottom: 0,
    zIndex: 5
  },
  deckContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 6,
    padding: 12
  },
  title: {
    color: GlobalColors.white,
    fontSize: GlobalDimens.normalText,
    fontWeight: 'bold'
  },
  description: {
    marginTop: 4,
    color: GlobalColors.white,
    fontSize: GlobalDimens.normalText
  },
  level: {
    color: GlobalColors.gray,
    fontSize: GlobalDimens.normalText,
    marginBottom: 5
  }
});
