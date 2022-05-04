import { makeAutoObservable, runInAction } from 'mobx';
import { Continent } from '../constants/continent';
import { Game } from '../constants/gametype';
import { Beginner } from '../data/beginner';
import { Continents } from '../data/continents';
import ImagesService from '../services/images.service';
import { generateCoordinate } from '../utils/coordinates.util';
import { GameData } from './../screens/index';
import { Image } from './../services/images.service';
import { gameStore } from './game.store';

const DELAY = 350;
const REQUIRED_IMAGES = 0;
const UNLOCK_ALL_LVL = 5;
const REQUIRED_QUALITY = 0.65;

class Core {
  images: Image[] | null = null;
  currentImage: Image | null = null;

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  async init(game: Game, data: GameData | undefined, onSuccess: (image: Image) => void, onFail: () => void) {
    /**
     * GETTING REGION DEPENDING ON GAME OPTIONS
     */
    let region;
    if (game == Game.CLASSIC) {
      if (gameStore.progress.lvl <= UNLOCK_ALL_LVL) {
        region = Beginner;
      } else {
        const values = Object.values(Continents);
        region = values[Math.floor(Math.random() * values.length)];
      }
    } else if (game == Game.CONTINENTS) {
      const keys = Object.keys(Continents);
      let selectedKey = Continent.na.toString();
      for (const key of keys) {
        if (data?.continent && key == data?.continent.toString()) {
          selectedKey = key;
          break;
        }
      }

      region = Continents[selectedKey as Continent]; // get random continent
    }

    /**
     * INTERNAL ERROR
     */
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
    ImagesService.searchForImages(startPoint)
      .then(images => {
        images = images.filter(img => img.quality_score > REQUIRED_QUALITY);

        if (gameStore.progress.lvl <= UNLOCK_ALL_LVL) {
          images = images.filter(img => img.camera_type == 'equirectangular' || img.camera_type == 'spherical');
        }

        if (images.length > REQUIRED_IMAGES) {
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

  reset() {
    this.images = null;
    this.currentImage = null;
  }

  private getRandomImage(images: Image[]) {
    const imageNum = Math.floor(Math.random() * images.length);
    return images[imageNum];
  }

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

export const core = new Core();
