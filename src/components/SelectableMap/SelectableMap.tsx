import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle, Image, TouchableHighlight, Pressable, Text, TouchableOpacity } from 'react-native';
import MapView, { LatLng, MapEvent, Marker, UrlTile } from 'react-native-maps';

interface SelectableMapProps {
  onMarkerSet: (coordinates: LatLng) => void;
  style?: StyleProp<ViewStyle>;
  onComplete: () => void;
}
const SelectableMap: React.FC<SelectableMapProps> = ({ onMarkerSet, style, onComplete }) => {
  console.log('SelectableMap');

  const [marker, setMarker] = React.useState<LatLng | null>(null);

  const onMarkerCreate = (event: MapEvent) => {
    onMarkerSet(event.nativeEvent.coordinate);
    setMarker(event.nativeEvent.coordinate);
  };

  return (
    <View style={style}>
      <MapView style={styles.map} onPress={onMarkerCreate}>
        <UrlTile
          /**
           * The url template of the tile server. The patterns {x} {y} {z} will be replaced at runtime
           * For example, http://c.tile.openstreetmap.org/{z}/{x}/{y}.png
           */
          urlTemplate='http://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
          /**
           * The maximum zoom level for this tile overlay. Corresponds to the maximumZ setting in
           * MKTileOverlay. iOS only.
           */
          maximumZ={19}
          /**
           * flipY allows tiles with inverted y coordinates (origin at bottom left of map)
           * to be used. Its default value is false.
           */
          flipY={false}
        />
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
