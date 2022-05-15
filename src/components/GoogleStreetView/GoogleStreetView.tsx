import React from 'react';
import { LatLng } from 'react-native-maps';
import { PlayMode } from '../../constants/playmode';
import { StreetViewSettings } from '../../types/streetviewsettings';
import { LoadingPreview } from '../interface/LoadingPreview/LoadingPreview';
import { GoogleCountriesList } from './data/googleCountriesList';
import GoogleStreetViewWeb from './GoogleStreetViewWeb';
import { Continent } from '../../constants/continent';
import { ContinentPlaces } from '../Mapillary/data/continentPlaces';

export const GoogleStreetView: React.FC<StreetViewSettings> = ({ onMove, onInit, gameSettings, playModeData }) => {
  const [init, setInit] = React.useState(false);

  const onLoaded = (coordinates: LatLng) => {
    onMove(coordinates);
    if (!init) {
      onInit();
      setInit(true);
    }
  };

  const getCountry = () => {
    if (gameSettings.playMode == PlayMode.CONTINENTS) {
      if(!playModeData?.continent) throw new Error('Continent mode must have selected continent')
      const continent = GoogleCountriesList[playModeData.continent]; // get random continent
      return continent[Math.floor(Math.random() * continent.length)];
    } else {
      const values = Object.values(GoogleCountriesList);
      const continent = values[Math.floor(Math.random() * values.length)];
      return continent[Math.floor(Math.random() * continent.length)];
    }
  };

  return (
    <>
      {!init && <LoadingPreview />}
      <GoogleStreetViewWeb onMove={onLoaded} country={getCountry()} />
    </>
  );
};
