import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Continent } from '../../constants/continent';
import { ContinentType } from '../../types/continent.type';
import { Colors } from '../../values/colors';

interface ContinentProps {
  data: ContinentType;
  onSelect: (continent: Continent) => void;
}
export const ContinentShelf: React.FC<ContinentProps> = ({ data, onSelect }) => {
  return (
    <TouchableOpacity style={continentStyles.cont} onPress={() => onSelect(data.continent)}>
      <Text style={continentStyles.text}>{data.name}</Text>
      <Image style={continentStyles.img} source={data.img} />
    </TouchableOpacity>
  );
};

const continentStyles = StyleSheet.create({
  cont: {
    flex: 1,
    height: 150,
    width: '100%',
    padding: 0,
    paddingTop: 5,
    paddingStart: 3,
    paddingEnd: 3,
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    borderRadius: 20,
    height: '100%',
    width: '100%'
  },
  text: {
    position: 'absolute',
    fontSize: 40,
    color: Colors.white,
    fontWeight: 'bold',
    zIndex: 2
  }
});
