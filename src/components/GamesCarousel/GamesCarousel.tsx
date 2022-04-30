import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json
import { Colors } from '../../constants/colors';
import { Dimens } from '../../constants/dimens';
import { gameStore } from '../../store/game.store';
import { GameType } from '../../types/game.type';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 5) / 4);

interface GamesCarouselProps {
  games: GameType[];
  onSelect: (index: number) => void;
}
export const GamesCarousel: React.FC<GamesCarouselProps> = ({ games, onSelect }) => {
  const [currentIndex, setIndex] = React.useState(0);

  const onPress = (i: number) => {
    if (i == currentIndex) {
      onSelect(currentIndex);
    }
  };

  const isUnlocked = (lvl: number) => {
    return (gameStore.progress?.lvl ?? 0) >= lvl;
  };

  const _renderItem = ({ item, index }: { item: GameType; index: number }) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => onPress(index)} disabled={index != currentIndex || !isUnlocked(item.requiredLvl)}>
        <Image style={styles.preview} source={item.preview} />
        <View style={styles.deck} />
        <View style={styles.deckContainer}>
          {!isUnlocked(item.requiredLvl) && <Text style={styles.level}>Unlocked at {item.requiredLvl} level</Text>}
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Carousel
        firstItem={currentIndex}
        layout={'default'}
        data={games}
        renderItem={_renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        containerCustomStyle={styles.carouselContainer}
        onSnapToItem={index => setIndex(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 15
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundOpposite,
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
    height: '35%',
    width: '100%',
    bottom: 0,
    zIndex: 5
  },
  deckContainer: {
    position: 'absolute',
    height: '35%',
    width: '100%',
    bottom: 0,
    zIndex: 6,
    padding: 16
  },
  title: {
    color: Colors.white,
    fontSize: Dimens.headText,
    fontWeight: 'bold'
  },
  description: {
    color: Colors.white,
    fontSize: Dimens.normalText
  },
  level: {
    color: Colors.gray,
    fontSize: Dimens.normalText,
    marginBottom: 5
  }
});
