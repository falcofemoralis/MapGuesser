import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json
import { getContinentCards } from '../../data/continentCards';
import { getGameCards } from '../../data/gameCards';
import { MAIN_CONTAINER_PADDING } from '../../screens/main.screen';
import { userStore } from '../../store/user.store';
import { ContinentCard } from '../../types/continentcard.type';
import { GameCard } from '../../types/gamecard.type';
import { Colors } from '../../values/colors';
import { Dimens } from '../../values/dimens';

const SLIDER_WIDTH = Dimensions.get('window').width - MAIN_CONTAINER_PADDING * 2;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.3);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 5) / 5);

const DECK_SIZE = '35%';
const SMALL_DECK_SIZE = '23%';

interface ContinentsCarouselProps {
  /** Triggered on game select */
  onSelect: (gameCard: ContinentCard) => void;
}
export const ContinentsCarousel: React.FC<ContinentsCarouselProps> = ({ onSelect }) => {
  const { t } = useTranslation();
  const [currentIndex, setIndex] = React.useState(0); // index of current item

  const _renderItem = ({ item, index }: { item: ContinentCard; index: number }) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => onSelect(item)} disabled={index != currentIndex}>
        <Image style={styles.preview} source={item.img} />
        <Text style={styles.title}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Carousel
      containerCustomStyle={styles.carouselContainer}
      firstItem={currentIndex}
      layout={'default'}
      data={getContinentCards(t)}
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
    height: ITEM_HEIGHT + 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  preview: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden'
  },
  title: {
    color: Colors.white,
    fontSize: Dimens.normalText,
    fontWeight: 'bold'
  }
});
