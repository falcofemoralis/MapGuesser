import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { LatLng, MapEvent, Marker, UrlTile } from 'react-native-maps';

interface SelectableMapProps {
  onMarkerSet: (coordinates: LatLng) => void;
}

const SelectableMap: React.FC<SelectableMapProps> = ({ onMarkerSet }) => {
  console.log("SelectableMap");

  const [marker, setMarker] = React.useState<LatLng | null>(null);

  const onMarkerCreate = (event: MapEvent) => {
    onMarkerSet(event.nativeEvent.coordinate);
    setMarker(event.nativeEvent.coordinate);
  };
  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    // right: 0,
    // bottom: 0,
    width: '100%',
    height: 400,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

export default SelectableMap;
