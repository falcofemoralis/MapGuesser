import React from 'react';
import { Dimensions, ImageStyle, StyleProp, StyleSheet } from 'react-native';
import { LatLng } from 'react-native-maps';
import { Colors } from '../../values/colors';
import { ImageButton } from '../interface/ImageButton/ImageButton';
import { SwipeablePanel } from '../libs/SwipeablePanel';
import { SearchPanel } from '../SearchPanel/SearchPanel';
import SelectableMap from '../SelectableMap/SelectableMap';

interface MapPanelProps {
  onMarkerSet: (coordinates: LatLng) => void;
  onComplete: () => void;
  buttonStyle: StyleProp<ImageStyle>;
}
const MapPanel: React.FC<MapPanelProps> = ({ onMarkerSet, onComplete, buttonStyle }) => {
  const [isMap, setMap] = React.useState(false); // is map panel activated
  const [isSearch, setSearch] = React.useState(false);
  /**
   * Trigger when user set market on the map
   * @param coordinates - marker coordinates
   */
  const handleMarkerSet = (coordinates: LatLng) => {
    onMarkerSet(coordinates);
  };

  const toggleSearch = () => {
   setSearch(!isSearch);
  };

  /**
   * Toggle map
   */
  const openMap = () => setMap(true);
  const closeMap = () => setMap(false);

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
