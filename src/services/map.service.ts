import { axiosOSM } from './index';

export interface SearchPlace {
  properties: {
    display_name: string;
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
  static async searchForPlace(q: string): Promise<SearchCollection> {
    try {
      const { data } = await axiosOSM.get<SearchCollection>(`/search?q=${q}&format=geojson`);
      return data;
    } catch (e: any) {
      console.log(e.response.data);
      throw e;
    }
  }
}
