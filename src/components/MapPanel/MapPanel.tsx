import React from 'react';
import { Dimensions, ImageStyle, StyleProp, StyleSheet } from 'react-native';
import { LatLng } from 'react-native-maps';
import { Colors } from '../../values/colors';
import { ImageButton } from '../interface/ImageButton/ImageButton';
import { SwipeablePanel } from '../libs/SwipeablePanel';
import { SearchPanel } from '../SearchPanel/SearchPanel';
import { SelectableMap } from '../SelectableMap/SelectableMap';

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
      <ImageButton img={require('../../assets/map.png')} buttonStyle={buttonStyle} onPress={openMap} />
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
    backgroundColor: Colors.background
  },
  searchBtn: {
    marginTop: 25,
    right: 15,
    backgroundColor: Colors.background
  },
  bar: {
    backgroundColor: Colors.backgroundOpposite
  }
});

export default MapPanel;
