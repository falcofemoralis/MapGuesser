import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Dimensions, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SearchBar from 'react-native-platform-searchbar';
import MapService, { SearchPlace } from '../../services/map.service';
import { searchStore } from '../../store/search.store';
import { Utils } from '../../utils/utils';
import { Colors } from '../../values/colors';
import { Dimens } from '../../values/dimens';
import { Misc } from '../../values/misc';
import { ImageButton } from '../interface/ImageButton/ImageButton';

 //

interface SearchPanelProps {
  /** Windows visibility */
  visible: boolean;
  /** Triggered on windows close */
  onClose: () => void;
}
export const SearchPanel: React.FC<SearchPanelProps> = ({ visible, onClose }) => {
  const { t } = useTranslation();
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

      MapService.searchForPlace(searchStore.placeForSearch).then(data => {
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
          <ImageButton img={require('../../assets/close.png')} buttonStyle={styles.closeBtn} onPress={onClose} />
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
            <FlatList style={styles.list} data={data} renderItem={({ item }) => <Item text={item.properties.display_name} onPress={() => select(item)} />} />
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
    backgroundColor: Colors.background,
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
    marginTop: 25
  },
  searchBarInput: {
    backgroundColor: Colors.backgroundOpposite
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
    backgroundColor: Colors.backgroundTransparent,
    zIndex: 101
  },
  list: {
    width: Dimensions.get('window').width - 50,
    marginTop: 15,
    zIndex: 101
  },
  item: {
    flex: 1,
    padding: 10,
    marginBottom: 5,
    height: 44,
    width: '100%',
    backgroundColor: Colors.backgroundOpposite
  },
  itemText: {
    color: Colors.white,
    fontSize: 18
  }
});

interface ItemProps {
  text: string;
  onPress: () => void;
}
const Item: React.FC<ItemProps> = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.5}>
      <Text style={styles.itemText}>{text}</Text>
    </TouchableOpacity>
  );
};
