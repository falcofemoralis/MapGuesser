import { makeAutoObservable } from 'mobx';
import { MutableRefObject } from 'react';
import MapView from 'react-native-maps';
import { SearchPlace } from './../services/map.service';

class SearchStore {
  mapRef?: MutableRefObject<MapView | null>;
  foundPlace: SearchPlace | null = null; // place that was selected from the list
  searchDelay: number = 0; // delay until search start
  isSearching: boolean = false; // is current search is active
  placeForSearch: string | null = null; // saved text for search

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }
}

export const searchStore = new SearchStore();
