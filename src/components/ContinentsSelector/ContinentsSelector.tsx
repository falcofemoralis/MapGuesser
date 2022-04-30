import React from 'react';
import { FlatList, Modal, StyleSheet, View } from 'react-native';
import { Continent } from '../../constants/continent';
import { ContinentType } from '../../types/continent.type';
import { Colors } from '../../values/colors';
import { ImageButton } from '../interface/ImageButton/ImageButton';
import { ContinentShelf } from './ContinentShelf';

interface ContinentsSelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (continent: Continent) => void;
}
export const ContinentsSelector: React.FC<ContinentsSelectorProps> = ({ visible, onClose, onSelect }) => {
  const continents: ContinentType[] = [
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
        <View style={styles.centeredView}>
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
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
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
