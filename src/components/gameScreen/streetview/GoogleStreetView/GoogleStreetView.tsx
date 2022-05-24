import { LoadingPanel } from '@/components/interface/LoadingPanel/LoadingPanel';
import { Country } from '@/constants/country';
import { PlayMode } from '@/constants/playmode';
import { StreetViewSettings } from '@/types/streetviewsettings';
import { Utils } from '@/utils/utils';
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
      setTimeout(() => {
        onInit();
        setInit(true);
      }, 500);
    }
  };

  const getCountry = () => {
    if (gameSettings.playMode == PlayMode.NORMAL) {
      const continent = Utils.randomFromArray(Object.values(GoogleCountriesList));
      return Utils.randomFromArray(continent);
    } else if (gameSettings.playMode == PlayMode.CONTINENTS) {
      if (!gameData?.continent) throw new Error('Continent mode must have selected continent');
      const continent = GoogleCountriesList[gameData.continent];
      return Utils.randomFromArray(continent);
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
