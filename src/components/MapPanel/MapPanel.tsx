import React from 'react';
import { Dimensions, Image, ImageStyle, StyleProp, StyleSheet, TouchableOpacity } from 'react-native';
import { LatLng } from 'react-native-maps';
import { SwipeablePanel } from 'rn-swipeable-panel';
import SelectableMap from '../SelectableMap/SelectableMap';

interface MapPanelProps {
  onMarkerSet: (coordinates: LatLng) => void;
  onComplete: () => void;
  buttonStyle: StyleProp<ImageStyle>;
}
const MapPanel: React.FC<MapPanelProps> = ({ onMarkerSet, onComplete, buttonStyle }) => {
  console.log('MapPanel');

  const [isMap, setMap] = React.useState(false);

  const handleMarkerSet = (coordinates: LatLng) => {
    onMarkerSet(coordinates);
  };

  const openMap = () => setMap(true);
  const closeMap = () => setMap(false);

  return (
    <>
      <TouchableOpacity style={buttonStyle} onPress={openMap}>
        <Image style={styles.img} source={require('./img/map.png')} />
      </TouchableOpacity>
      <SwipeablePanel
        noBackgroundOpacity
        fullWidth
        onlyLarge
        openLarge
        closeOnTouchOutside
        showCloseButton
        isActive={isMap}
        onClose={closeMap}
        style={styles.panel}
      >
        <SelectableMap style={styles.selectableMap} onMarkerSet={handleMarkerSet} onComplete={onComplete} />
      </SwipeablePanel>
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    height: '100%',
    width: '100%'
  },
  panel: {
  },
  selectableMap: {
    width: '100%',
    height: Dimensions.get('window').height - 125,
    paddingTop: 32
  }
});

export default MapPanel;
