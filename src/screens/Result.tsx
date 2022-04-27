import { CommonActions } from '@react-navigation/native';
import * as turf from '@turf/turf';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline, UrlTile } from 'react-native-maps';
import { GameButton } from '../components/interface/GameButton/GameButton';
import { Colors } from '../constants/colors';
import { Strings } from '../constants/strings';
import { GlobalStyles } from '../constants/styles';
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
    <>
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
        <Marker coordinate={currentCoordinates} />
        <Marker coordinate={selectedCoordinates}>
          <Image source={require('../assets/final_user.png')} style={{ width: 26, height: 28 }} resizeMode='contain' />
        </Marker>
        <Polyline coordinates={[currentCoordinates, selectedCoordinates]} />
      </MapView>
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            Your place was <Text style={styles.resultTextBold}>{distance}km</Text> away from the correct location.
          </Text>
          <Text style={[styles.resultText, { marginTop: 5 }]}>
            Received <Text style={styles.resultTextBold}>500</Text> points.
          </Text>
          <View style={GlobalStyles.rcc}>
            <GameButton img={require('../assets/settings.png')} text='Main menu' />
            <GameButton img={require('../assets/settings.png')} text='Next round' />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '70%'
  },
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '35%', // 100 - 70 + 5
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: Colors.background
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25
  },
  resultText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 20
  },
  resultTextBold: {
    fontWeight: 'bold',
    color: Colors.primaryColor
  }
});

export default Result;
