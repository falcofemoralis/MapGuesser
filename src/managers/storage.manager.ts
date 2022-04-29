import EncryptedStorage from 'react-native-encrypted-storage';

export enum KeyEnum {
  'USER',
  'PROGRESS',
  'UNIT'
}

export default class StorageManager {
  static async write<T>(key: KeyEnum, value: T) {
    try {
      await EncryptedStorage.setItem(key.toString(), JSON.stringify(value));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async read<T>(key: KeyEnum): Promise<T | undefined> {
    try {
      const session = await EncryptedStorage.getItem(key.toString());

      if (session !== undefined && session != null) {
        return JSON.parse(session);
        // Congrats! You've just retrieved your first value!
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //   static async update<T>(key: KeyEnum, value: T): Promise<T | undefined> {
  //       const data = this.read(key);

  //   }
}
