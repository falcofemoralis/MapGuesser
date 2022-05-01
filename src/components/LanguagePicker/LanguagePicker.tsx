import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { Lang } from '../../types/lang';
import { Colors } from '../../values/colors';
import { Dimens } from '../../values/dimens';

interface LanguagePickerProps {}
export const LanguagePicker: React.FC<LanguagePickerProps> = () => {
  const { i18n } = useTranslation();

  const languages: Lang[] = [
    { name: 'en', label: 'English' },
    { name: 'ua', label: 'Українська' },
    { name: 'pl', label: 'Polskie' },
    { name: 'es', label: 'Español' },
    { name: 'ru', label: 'Русский' },
    { name: 'fr', label: 'Français' },
    { name: 'de', label: 'Deutsch' }
  ];

  const getLanguage = (name: string): number => {
    return languages.findIndex(lang => lang.name == name);
  };

  return (
    <View>
      <SelectDropdown
        defaultValueByIndex={getLanguage(i18n.language)}
        data={languages.map(lang => lang.label)}
        onSelect={(selectedItem, index) => {
          i18n.changeLanguage(languages[index].name);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
        buttonStyle={styles.button}
        buttonTextStyle={styles.text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    backgroundColor: Colors.primaryColor,
    marginTop: 25,
    height: 40
  },
  text: {
    fontSize: Dimens.normalText,
    color: Colors.white,
    textAlign: 'center'
  }
});