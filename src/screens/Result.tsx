import { CommonActions } from '@react-navigation/native';
import * as turf from '@turf/turf';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline, UrlTile } from 'react-native-maps';
import { Colors } from '../constants/colors';
import { Strings } from '../constants/strings';
import Props from '../types/PropsType';

const Result: React.FC<Props<'Result'>> = ({ route, navigation }) => {
  let isNext = false;
  const mapRef = React.useRef<MapView | null>(null);
  const currentCoordinates = { ...route.params.from }; // spread fix error
  const selectedCoordinates = { ...route.params.to };
  const from = turf.point([currentCoordinates?.latitude, currentCoordinates?.longitude]);
  const to = turf.point([selectedCoordinates?.latitude, selectedCoordinates?.longitude]);
  const distance = turf.distance(from, to, { units: 'kilometers' }).toFixed(3); // calculated distance

  /**
   * BackPress override.
   */
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();

        // if nextRound button was pressed - dispatch
        if (isNext) {
          isNext = false;
          navigation.dispatch(e.data.action);
        }
      }),
    [navigation]
  );

  /**
   * Navigate to nextRound
   */
  const onFinish = () => {
    isNext = true;

    navigation.dispatch(state => {
      // Remove the home route from the stack
      const routes = state.routes.filter(r => r.name !== 'Game');

      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1
      });
    });

    navigation.navigate('Game');
  };

  // TODO LEAVE THE RESULT SCREEN IN SECOND ROUND

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        onMapReady={() =>
          mapRef?.current?.fitToCoordinates([selectedCoordinates, currentCoordinates], {
            edgePadding: { top: 30, right: 10, bottom: 5, left: 10 },
            animated: true
          })
        }
      >
        <UrlTile urlTemplate='http://c.tile.openstreetmap.org/{z}/{x}/{y}.png' maximumZ={19} flipY={false} />
        <Marker coordinate={currentCoordinates} />
        <Marker coordinate={selectedCoordinates} />
        <Polyline coordinates={[currentCoordinates, selectedCoordinates]} />
      </MapView>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          Your place was <Text style={styles.resultTextDistance}>{distance}km</Text> away from the correct location.
        </Text>
        <TouchableOpacity style={styles.nextBtn} onPress={onFinish}>
          <Text style={styles.nextBtnText}>{Strings.playNext}</Text>
        </TouchableOpacity>
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
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.primaryColorBlue
  },
  resultText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 20
  },
  resultTextDistance: {
    fontWeight: 'bold',
    color: Colors.primaryColorRed
  },
  nextBtn: {
    marginTop: 30,
    width: 180,
    height: 40,
    alignSelf: 'center',
    backgroundColor: Colors.primaryColorRed,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    zIndex: 15
  },
  nextBtnText: {
    color: Colors.white,
    fontSize: 20
  }
});

export default Result;
