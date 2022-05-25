import { GameButton } from '@/components/interface/GameButton/GameButton';
import MapService, { SearchPlace } from '@/services/map.service';
import { searchStore } from '@/store/search.store';
import { Utils } from '@/utils/utils';
import { Misc, GlobalDimens, GlobalColors } from '@/values';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Dimensions, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import SearchBar from 'react-native-platform-searchbar';

interface SearchPanelProps {
  /** Windows visibility */
  visible: boolean;
  /** Triggered on windows close */
  onClose: () => void;
}
export const SearchPanel: React.FC<SearchPanelProps> = ({ visible, onClose }) => {
  const { t, i18n } = useTranslation();
  const [value, setValue] = React.useState(''); // state of the search bar value
  const [data, setData] = React.useState<SearchPlace[]>([]); // state of retrieved places
  const [loading, setLoading] = React.useState(false); // state of visibility of the loading bar

  /**
   * Clear the retrieved places list
   */
  const clear = () => {
    setData([]);
  };

  /**
   * Select place item handler
   * @param place - search place item
   */
  const select = (place: SearchPlace) => {
    searchStore.foundPlace = place;
    onClose();
  };

  /**
   * Search for places by query
   * @param q - any text for search
   */
  const search = async (q: string) => {
    searchStore.placeForSearch = q;

    if (!searchStore.isSearching) {
      searchStore.isSearching = true;
      setLoading(true);

      while (searchStore.searchDelay < Misc.SEARCH_DELAY_MS) {
        await Utils.sleep(1);
        searchStore.searchDelay++;
      }

      MapService.searchForPlace(searchStore.placeForSearch, i18n.language).then(data => {
        setLoading(false);
        setData(data.features);
      });

      searchStore.isSearching = false;
      searchStore.searchDelay = 0;
    } else {
      searchStore.searchDelay = 0;
    }
  };

  return (
    <Modal animationType='fade' transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{t('SEARCH')}</Text>
          <GameButton img={require('@/assets/close.png')} fullIcon style={styles.closeBtn} onPress={onClose} />
          <SearchBar
            value={value}
            onChangeText={v => {
              setValue(v);
              if (v) {
                search(v);
              }
            }}
            onClear={clear}
            placeholder={t('SEARCH')}
            platform='android'
            theme='dark'
            style={styles.searchBar}
            inputStyle={styles.searchBarInput}
          >
            {loading ? <ActivityIndicator style={{ marginRight: 10 }} /> : undefined}
          </SearchBar>
          {data.length > 0 ? (
            <FlatList style={styles.list} data={data} renderItem={({ item }) => <Item text={item.properties.display_name} iconUrl={item.properties.icon} onPress={() => select(item)} />} />
          ) : (
            <></>
          )}
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
    margin: 10,
    backgroundColor: GlobalColors.background,
    borderRadius: 10,
    padding: 15,
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
  searchBar: {
    marginTop: 15
  },
  searchBarInput: {
    backgroundColor: GlobalColors.backgroundOpposite
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
    backgroundColor: GlobalColors.backgroundTransparent,
    zIndex: 101
  },
  list: {
    width: Dimensions.get('window').width - 50,
    marginTop: 15,
    zIndex: 101
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    marginBottom: 5,
    height: 44,
    width: '100%',
    backgroundColor: GlobalColors.backgroundOpposite
  },
  itemText: {
    color: GlobalColors.white,
    fontSize: 18
  },
  itemIcon: {
    alignSelf: 'center',
    height: '70%',
    marginEnd: 5,
    aspectRatio: 1,
    tintColor: GlobalColors.white
  }
});

interface ItemProps {
  text: string;
  iconUrl: string;
  onPress: () => void;
}
const Item: React.FC<ItemProps> = ({ text, onPress, iconUrl }) => {  
  return (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.5}>
      <Image style={styles.itemIcon} source={{uri: iconUrl}}/>
      <Text style={styles.itemText}>{text}</Text>
    </TouchableOpacity>
  );
};
