import { axiosOSM } from './index';

export interface SearchPlace {
  properties: {
    display_name: string;
    icon: string;
  };
  bbox: number[];
  geometry: {
    type: string;
    coordinates: number[];
  };
}

export interface SearchCollection {
  features: SearchPlace[];
}
export default class MapService {
  /**
   * Search for the place by the given name
   * @param q - text
   * @returns collection of places
   */
  static async searchForPlace(q: string, language: string): Promise<SearchCollection> {
    // convert language i118 code to accept-language code
    // http://www.lingoes.net/en/translator/langcode.htm
    let lng = language;
    if (lng == 'ua') {
      lng = 'uk-UA';
    }

    console.log(lng);

    try {
      const { data } = await axiosOSM.get<SearchCollection>(`/search?q=${q}&format=geojson&accept-language=${lng}`);
      return data;
    } catch (e: any) {
      throw e;
    }
  }
}
