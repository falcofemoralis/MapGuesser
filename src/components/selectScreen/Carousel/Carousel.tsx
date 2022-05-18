import { Continent } from '@/constants/continent';
import { MAIN_CONTAINER_PADDING } from '@/screens/main.screen';
import { ContinentCard } from '@/types/continentcard.type';
import { GlobalDimens, GlobalColors } from '@/values';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import * as SnapCarousel from 'react-native-snap-carousel'; // Version can be specified in package.json

const SLIDER_WIDTH = Dimensions.get('window').width - MAIN_CONTAINER_PADDING * 2;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.3);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 5) / 5);

const DECK_SIZE = '35%';
const SMALL_DECK_SIZE = '23%';

interface CarouselProps {
  /** Triggered on game select */
  onSelect: (continentCard: ContinentCard) => void;
}
export const Carousel: React.FC<CarouselProps> = ({ onSelect }) => {
  const { t } = useTranslation();
  const cards = [
    { name: t('AS'), img: require('@/assets/asia.jpg'), continent: Continent.as },
    { name: t('EU'), img: require('@/assets/europe.jpg'), continent: Continent.eu },
    { name: t('NA'), img: require('@/assets/north_america.jpg'), continent: Continent.na },
    { name: t('SA'), img: require('@/assets/south_america.jpg'), continent: Continent.sa },
    { name: t('AF'), img: require('@/assets/africa.jpg'), continent: Continent.af },
    { name: t('AU'), img: require('@/assets/australia.jpg'), continent: Continent.au }
  ];

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
    <SnapCarousel.default
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
    color: GlobalColors.white,
    fontSize: GlobalDimens.normalText,
    fontWeight: 'bold'
  }
});
