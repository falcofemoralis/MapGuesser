import { searchStore } from '@/store/search.store';
import { GlobalColors } from '@/values';
import React from 'react';
import { Image, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import MapView, { LatLng, MapEvent, Marker } from 'react-native-maps';

const ANIM_DUR = 700; // fling animation duration

interface SelectableMapProps {
  /** Triggered on marker setting */
  onMarkerSet: (coordinates: LatLng) => void;
  /** Container style */
  style?: StyleProp<ViewStyle>;
  /** Triggered when complete button was pressed */
  onComplete: () => void;
}
export const SelectableMap: React.FC<SelectableMapProps> = ({ onMarkerSet, style, onComplete }) => {
  const mapRef = React.useRef<MapView | null>(null); // map reference
  searchStore.mapRef = mapRef;
  const [marker, setMarker] = React.useState<LatLng | null>(null); // marker on the map

  /**
   * Creating marker handler.
   * @param event - data with coordinates
   */
  const onMarkerCreate = (event: MapEvent) => {
    onMarkerSet(event.nativeEvent.coordinate);
    setMarker(event.nativeEvent.coordinate);
  };

  /**
   * If user selected place in found list, then animate to it, otherwise animate to the marker
   */
  if (searchStore.foundPlace) {
    const bbox = searchStore.foundPlace.bbox;
    const leftTop = [bbox[0], bbox[3]]; // lng, lat
    const rightBottom = [bbox[2], bbox[1]];
    const leftBottom = [leftTop[0], rightBottom[1]];
    const rightTop = [rightBottom[0], leftTop[1]];

    searchStore.mapRef?.current?.animateToRegion(
      {
        longitude: searchStore.foundPlace.geometry.coordinates[0],
        latitude: searchStore.foundPlace.geometry.coordinates[1],
        longitudeDelta: rightTop[0] - leftTop[0],
        latitudeDelta: rightTop[1] - rightBottom[1]
      },
      ANIM_DUR
    );

    searchStore.foundPlace = null;
  } else if (marker) {
    mapRef?.current?.animateCamera({ center: marker }, { duration: ANIM_DUR });
  }

  return (
    <View style={style}>
      <CompleteBtn disabled={!Boolean(marker)} onComplete={onComplete} />
      <MapView ref={mapRef} style={styles.map} onPress={onMarkerCreate}>
        {marker && <Marker coordinate={marker} />}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
    zIndex: 10
  }
});

interface CompleteBtnProps {
  onComplete?: () => void;
  disabled?: boolean;
}
const CompleteBtn: React.FC<CompleteBtnProps> = ({ onComplete, disabled }) => {
  return (
    <TouchableOpacity style={stylesBtn.completeBtn} onPress={onComplete} activeOpacity={0.5} disabled={disabled}>
      <View style={[stylesBtn.tier1, { backgroundColor: disabled ? GlobalColors.background : GlobalColors.primaryColor }]} />
      <View style={[stylesBtn.tier2, { backgroundColor: disabled ? GlobalColors.background : GlobalColors.primaryColor }]} />
      <Image style={stylesBtn.completeBtnIcon} source={require('@/assets/placeholder.png')} />
    </TouchableOpacity>
  );
};

const BTN_RADIUS = 100;
const BTN_SIZE = 100;
const Z_INDEX = 20;
const stylesBtn = StyleSheet.create({
  completeBtn: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    zIndex: Z_INDEX,
    height: BTN_SIZE,
    width: BTN_SIZE
  },
  tier1: {
    position: 'absolute',
    width: BTN_SIZE,
    height: BTN_SIZE,
    opacity: 0.3,
    alignSelf: 'center',
    borderRadius: BTN_RADIUS,
    zIndex: Z_INDEX - 3
  },
  tier2: {
    position: 'absolute',
    top: BTN_SIZE / 5.5,
    width: BTN_SIZE / 1.5,
    height: BTN_SIZE / 1.5,
    opacity: 0.5,
    alignSelf: 'center',
    borderRadius: BTN_RADIUS,
    zIndex: Z_INDEX - 2
  },
  completeBtnIcon: {
    position: 'absolute',
    top: BTN_SIZE / 3,
    alignSelf: 'center',
    width: BTN_SIZE / 3,
    height: BTN_SIZE / 3,
    zIndex: Z_INDEX - 1
  }
});
