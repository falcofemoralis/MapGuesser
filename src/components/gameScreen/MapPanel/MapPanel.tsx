import { GameButton } from '@/components/interface/GameButton/GameButton';
import { SwipeablePanel } from '@/components/libs/SwipeablePanel';
import { GlobalColors } from '@/values';
import React from 'react';
import { Dimensions, ImageStyle, StyleProp, StyleSheet } from 'react-native';
import { LatLng } from 'react-native-maps';
import { SearchPanel } from './SearchPanel/SearchPanel';
import { SelectableMap } from './SelectableMap/SelectableMap';

interface MapPanelProps {
  /** Triggered when user sets the marker on the map */
  onMarkerSet: (coordinates: LatLng) => void;
  /** Triggered when user clicks on the complete button */
  onComplete: () => void;
  buttonStyle: StyleProp<ImageStyle>;
}
const MapPanel: React.FC<MapPanelProps> = ({ onMarkerSet, onComplete, buttonStyle }) => {
  const [isMap, setMap] = React.useState(false); // is map panel active
  const [isSearch, setSearch] = React.useState(false); // is search panel active

  /**
   * User sets the marker handler
   * @param coordinates - marker coordinates
   */
  const handleMarkerSet = (coordinates: LatLng) => {
    onMarkerSet(coordinates);
  };

  /**
   * Panels togglers
   */
  const openMap = () => setMap(true);
  const closeMap = () => setMap(false);
  const toggleSearch = () => setSearch(!isSearch);

  return (
    <>
      <GameButton img={require('@/assets/map.png')} fullIcon style={buttonStyle} onPress={openMap} />
      <SwipeablePanel
        noBackgroundOpacity
        fullWidth
        onlyLarge
        openLarge
        closeOnTouchOutside
        showCloseButton
        showSearchButton
        isActive={isMap}
        onClose={closeMap}
        onSearch={toggleSearch}
        closeRootStyle={styles.closeBtn}
        searchRootStyle={styles.searchBtn}
        barContainerStyle={styles.bar}
      >
        <SelectableMap style={styles.selectableMap} onMarkerSet={handleMarkerSet} onComplete={onComplete} />
      </SwipeablePanel>
      <SearchPanel visible={isSearch} onClose={toggleSearch} />
    </>
  );
};

const styles = StyleSheet.create({
  selectableMap: {
    width: '100%',
    height: Dimensions.get('window').height - 125
  },
  closeBtn: {
    marginTop: 25,
    left: 15,
    backgroundColor: GlobalColors.background
  },
  searchBtn: {
    marginTop: 25,
    right: 15,
    backgroundColor: GlobalColors.background
  },
  bar: {
    backgroundColor: GlobalColors.backgroundOpposite
  }
});

export default MapPanel;
