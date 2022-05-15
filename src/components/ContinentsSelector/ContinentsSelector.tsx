import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Continent } from '../../constants/continent';
import { ContinentCard } from '../../types/continentcard.type';
import { Arrays } from '../../values/arrays';
import { Colors } from '../../values/colors';
import { ImageButton } from '../interface/ImageButton/ImageButton';

interface ContinentsSelectorProps {
  /** Windows visibility */
  visible: boolean;
  /** Triggered on window close */
  onClose: () => void;
  /** Triggered on continent select */
  onSelect: (continent: Continent) => void;
}
export const ContinentsSelector: React.FC<ContinentsSelectorProps> = ({ visible, onClose, onSelect }) => {
  const { t } = useTranslation();

  return (
    <Modal animationType='fade' transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ImageButton img={require('../../assets/close.png')} buttonStyle={styles.closeBtn} onPress={onClose} />
          <View style={styles.list}>
            <FlatList data={Arrays.getContinentCards(t)} renderItem={({ item }) => <ContinentShelf key={item.name} data={item} onPress={onSelect} />} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingTop: 0
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    width: '100%',
    padding: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '70%'
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

interface ContinentProps {
  /** Continent Card data */
  data: ContinentCard;
  /** Triggered on continent press*/
  onPress: (continent: Continent) => void;
}
const ContinentShelf: React.FC<ContinentProps> = ({ data, onPress }) => {
  return (
    <TouchableOpacity style={shelfStyles.cont} onPress={() => onPress(data.continent)}>
      <Text style={shelfStyles.text}>{data.name}</Text>
      <Image style={shelfStyles.img} source={data.img} />
    </TouchableOpacity>
  );
};

const shelfStyles = StyleSheet.create({
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
