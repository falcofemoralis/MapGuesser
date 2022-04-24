import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle, Image, TouchableHighlight, Pressable, Text } from 'react-native';
import MapView, { LatLng, MapEvent, Marker, UrlTile } from 'react-native-maps';

interface SelectableMapProps {
  onMarkerSet: (coordinates: LatLng) => void;
  style?: StyleProp<ViewStyle>;
  onClose: () => void;
  onComplete: () => void;
}
const SelectableMap: React.FC<SelectableMapProps> = ({ onMarkerSet, style, onClose, onComplete }) => {
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
      <TouchableHighlight onPress={onClose}>
        <Image style={styles.closeBtn} source={require('./img/cancel.png')} />
      </TouchableHighlight>
      {marker ? (
        <Pressable style={styles.completeBtn} onPress={onComplete} disabled={!marker}>
          <Text style={styles.completeBtnText}>Complete</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.inactiveCompleteBtn} disabled={true}>
          <Text style={styles.completeBtnText}>Choose place</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 64,
    height: 64
  },
  completeBtn: {
    position: 'absolute',
    bottom: 10,
    width: 180,
    height: 50,
    alignSelf: 'center',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40
  },
  inactiveCompleteBtn: {
    position: 'absolute',
    bottom: 10,
    width: 180,
    height: 50,
    alignSelf: 'center',
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40
  },
  completeBtnText: {
    color: '#fff',
    fontSize: 20
  }
});

export default SelectableMap;
