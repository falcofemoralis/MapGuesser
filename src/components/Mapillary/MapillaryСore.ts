import { makeAutoObservable, runInAction } from 'mobx';
import { PlayMode } from '../../constants/playmode';
import { PlayModeData } from '../../screens';
import { userStore } from '../../store/user.store';
import { generateCoordinate } from '../../utils/coordinates.util';
import { Misc } from '../../values/misc';
import { BeginnerPlaces } from './data/beginnerPlaces';
import { ContinentPlaces } from './data/continentPlaces';
import MapillaryImagesService, { Image } from './MapillaryImages.service';

const DELAY = 350;

class MapillaryСore {
  images: Image[] | null = null; // available street view images
  currentImage: Image | null = null; // current street view image

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  /**
   * Init street view image
   * @param playMode - play mode
   * @param gameData - data of the game
   * @param onSuccess - receiving image was successful
   * @param onFail - receiving image was failed
   * @returns
   */
  async init(playMode: PlayMode, playModeData: PlayModeData | undefined, onSuccess: (image: Image) => void, onFail: () => void) {
    /**
     * GETTING REGION DEPENDING ON GAME OPTIONS
     */
    let region;
    if (playMode == PlayMode.NORMAL) {
      if (userStore.progress.lvl <= Misc.UNLOCK_ALL_LVL) {
        region = BeginnerPlaces;
      } else {
        const values = Object.values(ContinentPlaces);
        region = values[Math.floor(Math.random() * values.length)];
      }
    } else if (playMode == PlayMode.CONTINENTS) {
      if(!playModeData?.continent) throw new Error('Continent mode must have selected continent')
      region = ContinentPlaces[playModeData?.continent]; // get random continent
    }

    if (!region) {
      console.error('region is null');
      onFail();
      return;
    }

    /**
     * GETTING RANDOM PLACE IN REGION, GENERATING RANDOM COORDINATE IN REGION
     */
    const randomPlace = region[Math.floor(Math.random() * region.length)];
    const startPoint = [generateCoordinate(randomPlace[1], randomPlace[3], 7), generateCoordinate(randomPlace[0], randomPlace[2], 7)];

    /**
     * GETTING IMAGES, FILTER DEPENDING ON OPTIONS
     */
    MapillaryImagesService.searchForImages(startPoint)
      .then(images => {
        images = images.filter(img => img.quality_score > Misc.REQUIRED_QUALITY);

        if (userStore.progress.lvl <= Misc.UNLOCK_ALL_LVL) {
          images = images.filter(img => img.camera_type == 'equirectangular' || img.camera_type == 'spherical');
        }

        if (images.length > Misc.REQUIRED_IMAGES) {
          const image = this.getRandomImage(images);
          this.images = images;
          this.setImage(image);
          onSuccess(image);
        } else {
          onFail();
        }
      })
      .catch(e => {
        console.error('error: searchForImages');
        onFail();
      });
  }

  /**
   * Refresh current image from the list of available images
   * @param onEmpty - nothing to refresh
   */
  async refresh(onEmpty: () => void) {
    if (this.images && this.images.length > 0) {
      this.images = this.images.filter(img => img.sequence != this.currentImage?.sequence);

      if (this.images.length > 0) {
        this.setImage(this.getRandomImage(this.images));
        return;
      }
    }

    onEmpty();
  }

  /**
   * Reset current image
   */
  reset() {
    this.images = null;
    this.currentImage = null;
  }

  /**
   * Getting random image from the given array
   * @param images
   * @returns
   */
  private getRandomImage(images: Image[]) {
    const imageNum = Math.floor(Math.random() * images.length);
    return images[imageNum];
  }

  /**
   * Setting image with timeout
   * @param image
   */
  private async setImage(image: Image) {
    setTimeout(
      () =>
        runInAction(() => {
          this.currentImage = image;
        }),
      DELAY
    );
  }
}

export const mapillaryСore = new MapillaryСore();
