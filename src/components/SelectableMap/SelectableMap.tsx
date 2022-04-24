import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle, Image, TouchableHighlight, Pressable, Text, TouchableOpacity } from 'react-native';
import MapView, { LatLng, MapEvent, Marker, UrlTile } from 'react-native-maps';
import { getRegionForCoordinates } from '../../utils/CoordinatesUtil';

interface SelectableMapProps {
  onMarkerSet: (coordinates: LatLng) => void;
  style?: StyleProp<ViewStyle>;
  onComplete: () => void;
}
const SelectableMap: React.FC<SelectableMapProps> = ({ onMarkerSet, style, onComplete }) => {
  console.log('SelectableMap');

  const mapRef = React.useRef<MapView | null>(null);
  const [marker, setMarker] = React.useState<LatLng | null>(null);

  const onMarkerCreate = (event: MapEvent) => {
    onMarkerSet(event.nativeEvent.coordinate);
    setMarker(event.nativeEvent.coordinate);
  };

  if (marker) {
    mapRef?.current?.animateCamera({ center: marker }, { duration: 800 });
  }

  return (
    <View style={style}>
      <MapView ref={mapRef} style={styles.map} onPress={onMarkerCreate}>
        <UrlTile urlTemplate='http://c.tile.openstreetmap.org/{z}/{x}/{y}.png' maximumZ={19} flipY={false} />
        {marker && <Marker coordinate={marker} />}
      </MapView>
      {marker ? (
        <TouchableOpacity style={styles.completeBtn} onPress={onComplete}>
          <Image style={styles.img} source={require('./img/select_on.png')} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.completeBtn} disabled={true}>
          <Image style={styles.img} source={require('./img/select_off.png')} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%'
  },
  img: {
    height: '100%',
    width: '100%'
  },
  completeBtn: {
    position: 'absolute',
    bottom: 10,
    width: 80,
    height: 80,
    alignSelf: 'center',
    zIndex: 15
  }
});

export default SelectableMap;
