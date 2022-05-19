import { GameButton } from '@/components/interface/GameButton/GameButton';
import { LoadingPanel } from '@/components/interface/LoadingPanel/LoadingPanel';
import { Difficulty } from '@/constants/difficulty';
import { PlayMode } from '@/constants/playmode';
import { StreetViewMode } from '@/constants/streetviewmode';
import { Place } from '@/types/places.type';
import { StreetViewSettings } from '@/types/streetviewsettings';
import { generateCoordinate } from '@/utils/coordinates.util';
import { Misc } from '@/values';
import { runInAction } from 'mobx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleProp, StyleSheet, ToastAndroid, ViewStyle } from 'react-native';
import { continentPlaces } from './data/continentPlaces';
import { countryPlaces } from './data/countryPlaces';
import { EasyPlaces } from './data/easyPlaces';
import MapillaryImagesService, { Image } from './MapillaryImages.service';
import MapillaryWeb from './MapillaryWeb';

const MAX_SEARCH_ATTEMPTS = 10;
const DELAY = 350;

interface MapillaryProps extends StreetViewSettings {
  /** Margin of sequence button */
  sequenceTop?: number;
  /** Margin of header buttons */
  buttonTop?: number;
  /** Style of header buttons */
  buttonStyle: StyleProp<ViewStyle>;
}
export const Mapillary: React.FC<MapillaryProps> = ({ onMove, onInit, gameSettings, gameData, sequenceTop, buttonTop, buttonStyle }) => {
  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = React.useState<Image | null>(null); // current street view image
  const [attempts, setAttempts] = React.useState(0); // count of fails to get a mapillary location
  let availableImages: Image[] = [] // available street view images

  /**
   * Success of getting image handler
   * @param images - StreetView images
   */
  const onSuccess = (images: Image[]) => {
    setAttempts(999);
    console.log('onSuccess');
    availableImages = images;
    updateCurrentImage(getRandomImage(images));
    onInit();
  };

  /**
   * Fail of getting image handler
   */
  const onFail = () => {
    setAttempts(attempts + 1);
  };

  /**
   * Getting random image from the given array
   * @param images
   * @returns
   */
  const getRandomImage = (images: Image[]) => {
    const imageNum = Math.floor(Math.random() * images.length);
    return images[imageNum];
  };

  /**
   * Setting image with timeout
   * @param image
   */
  const updateCurrentImage = (image: Image) => {
    setTimeout(
      () =>
        runInAction(() => {
          setCurrentImage(image);
        }),
      DELAY
    );
  };

  // if image is not exists and attempts is not 999, then try to init mapillary
  if (!currentImage && attempts != 999) {
    let place: Place | null = null;
    if (gameSettings.playMode == PlayMode.NORMAL) {
      /**
       * NORMAL mode initialization
       */
      let values: Place[] = [];
      if (gameSettings.difficulty == Difficulty.EASY) {
        values = Object.values(EasyPlaces);
      } else if (gameSettings.difficulty == Difficulty.NORMAL) {
        values = Object.values(continentPlaces);
      }

      place = values[Math.floor(Math.random() * values.length)];
    } else if (gameSettings.playMode == PlayMode.CONTINENTS) {
      /**
       * CONTINENTS mode initialization
       */
      if (!gameData?.continent) throw new Error("Continent wasn't provided");
      place = continentPlaces[gameData?.continent]; // get random continent
    } else if (gameSettings.playMode == PlayMode.COUNTRIES) {
      /**
       * COUNTRIES mode initialization
       */
      if (!gameData?.country) throw new Error("Country wasn't provided");
      const values = Object.values(countryPlaces)[0];
      console.log(gameData.country);

      const country = values[gameData.country];
      if (!country) {
        throw new Error("Country don't exist");
      }

      place = country;
    }

    if (place) {
      const randomPlace = place[Math.floor(Math.random() * place.length)];
      const startPoint = [generateCoordinate(randomPlace[1], randomPlace[3], 7), generateCoordinate(randomPlace[0], randomPlace[2], 7)];

      MapillaryImagesService.searchForImages(startPoint)
        .then(images => {
          images = images.filter(img => img.quality_score > Misc.REQUIRED_MAPILLARY_QUALITY);

          if (gameSettings.difficulty == Difficulty.EASY) {
            images = images.filter(img => img.camera_type == 'equirectangular' || img.camera_type == 'spherical');
          }

          if (images.length > 0) {
            onSuccess(images);
          } else {
            onFail();
          }
        })
        .catch(e => {
          console.error('error: searchForImages');
          onFail();
        });
    } else {
      onFail();
    }
  }

  // if image is exist then emit coordinates update
  if (currentImage && currentImage.computed_geometry && currentImage.computed_geometry.coordinates) {
    onMove({ latitude: currentImage.computed_geometry.coordinates[1], longitude: currentImage.computed_geometry.coordinates[0] });
  }

  //console.log(currentImage?.id);

  /**
   * Refresh current image from the list of available images
   */
  const refreshLocation = () => {
    Alert.alert(t('REFRESH_GAME'), t('REFRESH_GAME_HINT'), [
      { text: t('STAY'), style: 'cancel', onPress: () => {} },
      {
        text: t('REFRESH'),
        style: 'destructive',
        onPress: () => {
          if (availableImages.length > 0) {
            availableImages = availableImages.filter(img => img.sequence != currentImage?.sequence);

            if (availableImages.length > 0) {
              updateCurrentImage(getRandomImage(availableImages));
              return;
            }
          }

          ToastAndroid.showWithGravityAndOffset(t('NO_REFRESH'), ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        }
      }
    ]);
  };

  return (
    <>
      {gameSettings.streetViewMode == StreetViewMode.FREE && (
        <GameButton img={require('@/assets/refresh.png')} fullIcon style={[buttonStyle, { top: buttonTop ?? 0 }]} onPress={refreshLocation} />
      )}
      {currentImage ? (
        <MapillaryWeb imageId={currentImage.id} sequenceTop={sequenceTop} onMove={onMove} />
      ) : (
        <LoadingPanel progress={attempts / MAX_SEARCH_ATTEMPTS} />
      )}
    </>
  );
};
