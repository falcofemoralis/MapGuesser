import { makeAutoObservable } from 'mobx';
import { MutableRefObject } from 'react';
import MapView from 'react-native-maps';
import { SearchPlace } from './../services/map.service';

class SearchStore {
  mapRef?: MutableRefObject<MapView | null>;
  foundPlace: SearchPlace | null = null;
  isSearching: boolean = false;
  searchDelay: number = 0;
  placeForSearch: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }
}

export const searchStore = new SearchStore();
