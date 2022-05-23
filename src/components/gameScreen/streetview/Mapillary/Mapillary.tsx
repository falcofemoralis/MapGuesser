import { GameButton } from '@/components/interface/GameButton/GameButton';
import { LoadingPanel } from '@/components/interface/LoadingPanel/LoadingPanel';
import { Difficulty } from '@/constants/difficulty';
import { PlayMode } from '@/constants/playmode';
import { StreetViewMode } from '@/constants/streetviewmode';
import { Places } from '@/types/places.type';
import { StreetViewSettings } from '@/types/streetviewsettings';
import { generateCoordinate } from '@/utils/coordinates.util';
import { Misc } from '@/values';
import { runInAction } from 'mobx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleProp, StyleSheet, Text, ToastAndroid, ViewStyle } from 'react-native';
import { MapillaryCountriesList } from './data/mapillaryCountriesList';
import { EasyPlaces } from './data/easyPlaces';
import MapillaryImagesService, { Image } from './MapillaryImages.service';
import MapillaryWeb from './MapillaryWeb';
import { Utils } from '@/utils/utils';

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
  let availableImages: Image[] = []; // available street view images

  /**
   * Success of getting image handler
   * @param images - StreetView images
   */
  const onSuccess = (images: Image[]) => {
    console.log('onSuccess');
    availableImages = images;
    updateCurrentImage(getRandomImage(images));
    onInit();
  };

  /**
   * Fail of getting image handler
   */
  const onFail = () => {
    init();
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
    setCurrentImage(image);
  };

  const init = () => {
    let places: Places | null | undefined = null;

    if (gameSettings.playMode == PlayMode.NORMAL) {
      /**
       * NORMAL mode initialization
       */
      if (gameSettings.difficulty == Difficulty.EASY) {
        places = Utils.randomFromArray(Object.values(EasyPlaces));
      } else if (gameSettings.difficulty == Difficulty.NORMAL) {
        const countries = Utils.randomFromArray(Object.values(MapillaryCountriesList));
        places = Utils.randomFromArray(Object.values(countries));
      }
    } else if (gameSettings.playMode == PlayMode.CONTINENTS) {
      /**
       * CONTINENTS mode initialization
       */
      if (!gameData?.continent) throw new Error("Continent wasn't provided");

      const continent = MapillaryCountriesList[gameData.continent]; // get random continent
      places = Utils.randomFromArray(Object.values(continent));
    } else if (gameSettings.playMode == PlayMode.COUNTRIES) {
      /**
       * COUNTRIES mode initialization
       */
      if (!gameData?.country) throw new Error("Country wasn't provided");

      const values = Object.values(MapillaryCountriesList);
      for (const val of values) {
        const keys = Object.keys(val);
        for (const key of keys) {
          if (key == gameData.country) {
            places = val[gameData.country];
            break;
          }
        }
        if (places) break;
      }
    }

    if (places) {
      const place = places[Math.floor(Math.random() * places.length)]; // bbox
      const startPoint = [generateCoordinate(place[1], place[3], 7), generateCoordinate(place[0], place[2], 7)]; // lat, lng

      MapillaryImagesService.searchForImages(startPoint)
        .then(images => {
          images = images.filter(img => img.quality_score > Misc.REQUIRED_MAPILLARY_QUALITY);

          if (gameSettings.difficulty == Difficulty.EASY) {
            images = images.filter(img => img.camera_type == 'equirectangular' || img.camera_type == 'spherical');
          }

          if (images.length > 0) {
            onSuccess(images);
          } else {
            console.log('onFail: no images');
            onFail();
          }
        })
        .catch(e => {
          console.error('error: searchForImages');
          onFail();
        });
    } else {
      console.log('onFail: places undefined');

      onFail();
    }
  };

  // if image is not exists and attempts is not 999, then try to init mapillary
  if (!currentImage) {
    init();
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
      {currentImage ? <MapillaryWeb imageId={currentImage.id} sequenceTop={sequenceTop} onMove={onMove} /> : <LoadingPanel />}
    </>
  );
};
