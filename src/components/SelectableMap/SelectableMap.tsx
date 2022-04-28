import React from 'react';
import { Image, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import MapView, { LatLng, MapEvent, Marker, UrlTile } from 'react-native-maps';

interface SelectableMapProps {
  onMarkerSet: (coordinates: LatLng) => void;
  style?: StyleProp<ViewStyle>;
  onComplete: () => void;
}
const SelectableMap: React.FC<SelectableMapProps> = ({ onMarkerSet, style, onComplete }) => {
  const MARKER_ANIM_DUR = 700;
  const mapRef = React.useRef<MapView | null>(null); // map reference
  const [marker, setMarker] = React.useState<LatLng | null>(null); // marker on the map

  /**
   * Handle user click on the map. Creating marker.
   * @param event - data with coordinates
   */
  const onMarkerCreate = (event: MapEvent) => {
    onMarkerSet(event.nativeEvent.coordinate);
    setMarker(event.nativeEvent.coordinate);
  };

  // Animation to the marker
  if (marker) {
    mapRef?.current?.animateCamera({ center: marker }, { duration: MARKER_ANIM_DUR });
  }

  return (
    <View style={style}>
      <MapView ref={mapRef} style={styles.map} onPress={onMarkerCreate}>
        {marker && <Marker coordinate={marker} />}
      </MapView>
      {marker ? (
        <TouchableOpacity style={styles.completeBtn} onPress={onComplete}>
          <Image style={styles.completeBtnIcon} source={require('../../assets/select_on.png')} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.completeBtn} disabled={true}>
          <Image style={styles.completeBtnIcon} source={require('../../assets/select_off.png')} />
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
  completeBtn: {
    position: 'absolute',
    bottom: 10,
    width: 80,
    height: 80,
    alignSelf: 'center',
    zIndex: 15
  },
  completeBtnIcon: {
    height: '100%',
    width: '100%'
  }
});

export default SelectableMap;
