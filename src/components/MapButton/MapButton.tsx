import React from 'react';
import { Image, ImageStyle, Pressable, StyleProp, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { LatLng } from 'react-native-maps';
import SelectableMap from '../SelectableMap/SelectableMap';

interface MapButtonProps {
  onMarkerSet: (coordinates: LatLng) => void;
  onComplete: () => void;
  style: StyleProp<ImageStyle>;
}
const MapButton: React.FC<MapButtonProps> = ({ onMarkerSet, onComplete, style }) => {
  console.log('MapButton');

  const [isMap, setMap] = React.useState(false);

  const handleMarkerSet = (coordinates: LatLng) => {
    onMarkerSet(coordinates);
  };

  return (
    <>
      <TouchableHighlight onPress={() => setMap(!isMap)}>
        <Image style={style} source={require('./img/map.png')} />
      </TouchableHighlight>
      {isMap && <SelectableMap style={styles.selectableMap} onMarkerSet={handleMarkerSet} onClose={() => setMap(!isMap)} onComplete={onComplete} />}
    </>
  );
};

const styles = StyleSheet.create({
  selectableMap: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '60%',
    zIndex: 10
  }
});

export default MapButton;
