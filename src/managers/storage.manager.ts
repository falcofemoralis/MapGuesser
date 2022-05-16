import EncryptedStorage from 'react-native-encrypted-storage';

export enum StorageItem {
  'USER',
  'PROGRESS',
  'UNIT',
  'ADS',
  'COINS'
}

export default class StorageManager {
  /**
   * Write data to local storage
   * @param key - storage name
   * @param value - storage value
   */
  static async write<T>(key: StorageItem, value: T) {
    try {
      await EncryptedStorage.setItem(key.toString(), JSON.stringify(value));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * Read data frm local storage
   * @param key - storage name
   */
  static async read<T>(key: StorageItem): Promise<T | undefined> {
    try {
      const session = await EncryptedStorage.getItem(key.toString());

      if (session !== undefined && session != null) {
        return JSON.parse(session);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
