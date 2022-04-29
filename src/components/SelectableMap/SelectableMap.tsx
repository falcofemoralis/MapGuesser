import React from 'react';
import { Image, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle, Dimensions } from 'react-native';
import MapView, { LatLng, MapEvent, Marker, UrlTile } from 'react-native-maps';
import { Colors } from '../../constants/colors';

interface CompleteBtnProps {
  onComplete?: () => void;
  disabled?: boolean;
}
const CompleteBtn: React.FC<CompleteBtnProps> = ({ onComplete, disabled }) => {
  return (
    <TouchableOpacity style={stylesBtn.completeBtn} onPress={onComplete} activeOpacity={0.5} disabled={disabled}>
      <View style={[stylesBtn.tier1, { backgroundColor: disabled ? Colors.background : Colors.primaryColor }]} />
      <View style={[stylesBtn.tier2, { backgroundColor: disabled ? Colors.background : Colors.primaryColor }]} />
      <Image style={stylesBtn.completeBtnIcon} source={require('../../assets/placeholder.png')} />
    </TouchableOpacity>
  );
};

const BTN_RADIUS = 100;
const BTN_SIZE = 100;
const stylesBtn = StyleSheet.create({
  completeBtn: {
    position: 'absolute',
    bottom: BTN_SIZE + 10,
    alignSelf: 'center'
  },
  tier1: {
    position: 'absolute',
    width: BTN_SIZE,
    height: BTN_SIZE,
    opacity: 0.3,
    alignSelf: 'center',
    borderRadius: BTN_RADIUS
  },
  tier2: {
    position: 'absolute',
    top: BTN_SIZE / 5.5,
    width: BTN_SIZE / 1.5,
    height: BTN_SIZE / 1.5,
    opacity: 0.5,
    alignSelf: 'center',
    borderRadius: BTN_RADIUS
  },
  completeBtnIcon: {
    position: 'absolute',
    top: BTN_SIZE / 3,
    alignSelf: 'center',
    width: BTN_SIZE / 3,
    height: BTN_SIZE / 3
  }
});

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
      <CompleteBtn disabled={!Boolean(marker)} onComplete={onComplete} />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%'
  }
});

export default SelectableMap;
