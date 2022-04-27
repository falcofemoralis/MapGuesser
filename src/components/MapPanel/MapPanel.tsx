import React from 'react';
import { Button, Dimensions, Image, ImageStyle, StyleProp, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LatLng } from 'react-native-maps';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { Colors } from '../../constants/colors';
import SelectableMap from '../SelectableMap/SelectableMap';

interface MapPanelProps {
  onMarkerSet: (coordinates: LatLng) => void;
  onComplete: () => void;
  buttonStyle: StyleProp<ImageStyle>;
}
const MapPanel: React.FC<MapPanelProps> = ({ onMarkerSet, onComplete, buttonStyle }) => {
  const [isMap, setMap] = React.useState(false); // is map panel activated

  /**
   * Trigger when user set market on the map
   * @param coordinates - marker coordinates
   */
  const handleMarkerSet = (coordinates: LatLng) => {
    onMarkerSet(coordinates);
  };

  /**
   * Toggle map
   */
  const openMap = () => setMap(true);
  const closeMap = () => setMap(false);

  return (
    <>
      <TouchableOpacity style={[styles.button, buttonStyle]} onPress={openMap}>
        {/* <Image style={styles.img} source={require('./img/location.png')} /> */}
        <Text style={styles.buttonText}>SELECT PLACE</Text>
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
  panel: {},
  selectableMap: {
    width: '100%',
    height: Dimensions.get('window').height - 125,
    paddingTop: 32
  },
  button: {
    height: 35,
    width: 150,
    backgroundColor: Colors.backgroundOpposite,
    borderRadius: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16
  }
});

export default MapPanel;
