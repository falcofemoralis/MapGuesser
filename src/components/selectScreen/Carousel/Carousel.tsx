import { Card } from '@/types/card.type';
import { GlobalColors, GlobalDimens } from '@/values';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.3);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 5) / 5);

interface CarouselProps<T> {
  cards: T[];
  /** Triggered on game select */
  onSelect: (card: T) => void;
}
export const SelectCarousel = <T extends Card>({ cards, onSelect }: CarouselProps<T>) => {
  const [currentIndex, setIndex] = React.useState(Math.floor(cards.length / 2)); // index of current item

  const _renderItem = ({ item, index }: { item: T; index: number }) => {
    return (
      <View style={styles.itemContainer}>
        <Image style={styles.preview} source={item.img} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  };

  const onSnap = (i: number) => {
    setIndex(i);
  };

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
    marginTop: 10,
    marginBottom: 10 //60
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
    color: GlobalColors.white,
    fontSize: GlobalDimens.normalText,
    fontWeight: 'bold'
  }
});
