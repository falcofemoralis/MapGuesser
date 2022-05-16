import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json
import { MAIN_CONTAINER_PADDING } from '../../screens/main.screen';
import { ContinentCard } from '../../types/continentcard.type';
import { Arrays } from '../../values/arrays';
import { Colors } from '../../values/colors';
import { Dimens } from '../../values/dimens';

const SLIDER_WIDTH = Dimensions.get('window').width - MAIN_CONTAINER_PADDING * 2;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.3);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 5) / 5);

const DECK_SIZE = '35%';
const SMALL_DECK_SIZE = '23%';

interface ContinentsCarouselProps {
  /** Triggered on game select */
  onSelect: (continentCard: ContinentCard) => void;
}
export const ContinentsCarousel: React.FC<ContinentsCarouselProps> = ({ onSelect }) => {
  const { t } = useTranslation();
  const cards = Arrays.getContinentCards(t);
  const [currentIndex, setIndex] = React.useState(cards.length / 2); // index of current item

  const _renderItem = ({ item, index }: { item: ContinentCard; index: number }) => {
    return (
      <View style={styles.itemContainer}>
        <Image style={styles.preview} source={item.img} />
        <Text style={styles.title}>{item.name}</Text>
      </View>
    );
  };

  const onSnap = (i: number) => {
    setIndex(i);
  };

  console.log(`onSelect: ${cards[currentIndex].continent}`);

  onSelect(cards[currentIndex]);

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
      onSnapToItem={index => onSnap(index)}
    />
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 15,
    marginBottom: 15 //60
  },
  itemContainer: {
    marginTop: 12,
    marginBottom: 12,
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
