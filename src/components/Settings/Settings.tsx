import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { Unit } from '../../constants/unit';
import { settingsStore } from '../../store/settings.store';
import { Colors } from '../../values/colors';
import { Dimens } from '../../values/dimens';
import { ImageButton } from '../interface/ImageButton/ImageButton';
import SwitchSelector from '../interface/SwitchSelector/SwitchSelector';

interface SettingsProps {
  visible: boolean;
  onClose: () => void;
}
export const Settings: React.FC<SettingsProps> = ({ visible, onClose }) => {
  const options = [
    { label: 'kilometers', value: Unit.KM },
    { label: 'miles', value: Unit.ML }
  ];

  return (
    <View style={styles.centeredView}>
      <Modal animationType='fade' transparent={true} visible={visible} onRequestClose={onClose}>
        <View style={[styles.centeredView, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Settings</Text>
            <SwitchSelector
              style={styles.selector}
              options={options}
              initial={settingsStore.unit == Unit.KM ? 0 : 1}
              onPress={(value: Unit) => settingsStore.updateUnit(value)}
              buttonColor={Colors.primaryColor}
              backgroundColor={Colors.backgroundOpposite}
              textColor={Colors.white}
            />
            <ImageButton img={require('../../assets/close.png')} buttonStyle={styles.closeBtn} onPress={onClose} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.background,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  title: {
    color: Colors.white,
    fontSize: Dimens.headText,
    fontWeight: 'bold'
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    height: 42,
    width: 42,
    padding: 14,
    borderRadius: 32,
    backgroundColor: Colors.backgroundTransparent
  },
  selector: {
    marginTop: 25
  }
});
