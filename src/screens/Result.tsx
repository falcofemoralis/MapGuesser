import * as turf from '@turf/turf';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline, UrlTile } from 'react-native-maps';
import Props from '../types/PropsType';

const Result: React.FC<Props<'Result'>> = ({ route }) => {
  console.log('Result');

  const currentCoordinates = { ...route.params.from }; // spread fix error
  const selectedCoordinates = { ...route.params.to };
  console.log(currentCoordinates);
  console.log(selectedCoordinates);

  const from = turf.point([currentCoordinates?.latitude, currentCoordinates?.longitude]);
  const to = turf.point([selectedCoordinates?.latitude, selectedCoordinates?.longitude]);
  const distance = turf.distance(from, to, { units: 'kilometers' }).toFixed(3);

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
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
        <Marker coordinate={currentCoordinates} />
        <Marker coordinate={selectedCoordinates} />
        <Polyline coordinates={[currentCoordinates, selectedCoordinates]} />
      </MapView>
      <View>
        <Text>Your place was {distance}km away from the correct location.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '50%'
  },
  container: {
    flex: 1
  }
});

export default Result;
