import React from 'react';
import { FlatList, Image, ImageSourcePropType, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { Continent } from '../../constants/continent';
import { ImageButton } from '../interface/ImageButton/ImageButton';

interface ContinentData {
  name: string;
  img: ImageSourcePropType;
  continent: Continent;
}

interface ContinentProps {
  data: ContinentData;
  onSelect: (continent: Continent) => void;
}
const ContinentShelf: React.FC<ContinentProps> = ({ data, onSelect }) => {
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

interface ContinentsSelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (continent: Continent) => void;
}
export const ContinentsSelector: React.FC<ContinentsSelectorProps> = ({ visible, onClose, onSelect }) => {
  const continents: ContinentData[] = [
    { name: 'Asia', img: require('../../assets/asia.jpg'), continent: Continent.as },
    { name: 'Europe', img: require('../../assets/europe.jpg'), continent: Continent.eu },
    { name: 'North America', img: require('../../assets/north_america.jpg'), continent: Continent.na },
    { name: 'South America', img: require('../../assets/south_america.jpg'), continent: Continent.sa },
    { name: 'Africa', img: require('../../assets/africa.jpg'), continent: Continent.af },
    { name: 'Australia', img: require('../../assets/australia.jpg'), continent: Continent.au }
  ];

  return (
    <View style={styles.centeredView}>
      <Modal animationType='fade' transparent={true} visible={visible} onRequestClose={onClose}>
        <View style={[styles.centeredView, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
          <View style={styles.modalView}>
            <ImageButton img={require('../../assets/close.png')} buttonStyle={styles.closeBtn} onPress={onClose} />
            <View style={styles.list}>
              <FlatList data={continents} renderItem={({ item }) => <ContinentShelf key={item.name} data={item} onSelect={onSelect} />} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingTop: 0
  },
  centeredView: {
    padding: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '70%',
    width: '100%',
    padding: 3
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    height: 42,
    width: 42,
    padding: 14,
    borderRadius: 32,
    backgroundColor: Colors.backgroundTransparent,
    zIndex: 10
  }
});
