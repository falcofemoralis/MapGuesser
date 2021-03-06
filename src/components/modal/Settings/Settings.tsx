import { GameButton } from '@/components/interface/GameButton/GameButton';
import SwitchSelector from '@/components/libs/SwitchSelector/SwitchSelector';
import { Unit } from '@/constants/unit';
import { settingsStore } from '@/store/settings.store';
import { GlobalColors, GlobalDimens } from '@/values';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { LanguagePicker } from './LanguagePicker/LanguagePicker';

interface SettingsProps {
  /** Windows visibility */
  visible: boolean;
  /** Triggered on windows close */
  onClose: () => void;
}
export const Settings: React.FC<SettingsProps> = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const units = [
    { label: t('KM'), value: Unit.KM },
    { label: t('ML'), value: Unit.ML }
  ];

  return (
    <Modal animationType='fade' transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{t('SETTINGS')}</Text>
          <GameButton img={require('@/assets/close.png')} fullIcon style={styles.closeBtn} onPress={onClose} />
          <SwitchSelector
            style={styles.selector}
            options={units}
            initial={settingsStore.unit == Unit.KM ? 0 : 1}
            onPress={(value: Unit) => settingsStore.updateUnit(value)}
            buttonColor={GlobalColors.primaryColor}
            backgroundColor={GlobalColors.backgroundOpposite}
            textColor={GlobalColors.white}
            fontSize={GlobalDimens.normalText}
          />
          <LanguagePicker />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: GlobalColors.background,
    borderRadius: 10,
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
    color: GlobalColors.white,
    fontSize: GlobalDimens.headText,
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
    backgroundColor: GlobalColors.backgroundTransparent
  },
  selector: {
    marginTop: 25
  }
});
