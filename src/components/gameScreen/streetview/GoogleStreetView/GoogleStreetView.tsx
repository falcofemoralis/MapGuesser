import { LoadingPanel } from '@/components/interface/LoadingPanel/LoadingPanel';
import { Country } from '@/constants/country';
import { PlayMode } from '@/constants/playmode';
import { StreetViewSettings } from '@/types/streetviewsettings';
import React from 'react';
import { LatLng } from 'react-native-maps';
import { GoogleCountriesList } from './data/googleCountriesList';
import GoogleStreetViewWeb from './GoogleStreetViewWeb';

interface GoogleStreetViewProps extends StreetViewSettings {}
export const GoogleStreetView: React.FC<GoogleStreetViewProps> = ({ onMove, onInit, gameSettings, gameData }) => {
  const [init, setInit] = React.useState(false);

  const onLoaded = (coordinates: LatLng) => {
    onMove(coordinates);
    if (!init) {
      onInit();
      setInit(true);
    }
  };

  const getCountry = () => {
    if (gameSettings.playMode == PlayMode.NORMAL) {
      const values = Object.values(GoogleCountriesList);
      const continent = values[Math.floor(Math.random() * values.length)];
      return continent[Math.floor(Math.random() * continent.length)];
    } else if (gameSettings.playMode == PlayMode.CONTINENTS) {
      if (!gameData?.continent) throw new Error('Continent mode must have selected continent');
      const continent = GoogleCountriesList[gameData.continent]; // get random continent
      return continent[Math.floor(Math.random() * continent.length)];
    } else if (gameSettings.playMode == PlayMode.COUNTRIES) {
      if (!gameData?.country) throw new Error("Country wasn't provided");
      return gameData?.country;
    } else {
      return Country.Andorra;
    }
  };

  return (
    <>
      {!init && <LoadingPanel />}
      <GoogleStreetViewWeb onMove={onLoaded} country={getCountry()} />
    </>
  );
};
