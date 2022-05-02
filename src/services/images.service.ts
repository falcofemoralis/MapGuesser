import { Keys } from '../values/keys';
import { axiosInstance } from './index';

export interface Image {
  id: string;
  computed_geometry: {
    coordinates: number[];
  };
  sequence: string;
}
export interface SearchData {
  data: Image[];
}

const ARES_TO_SCAN = 0.1;
export default class ImagesService {
  static async searchForImages(coordinates: number[]): Promise<Image[]> {
    try {
      const bbox = `${coordinates[1] - ARES_TO_SCAN},${coordinates[0] - ARES_TO_SCAN},${coordinates[1] + ARES_TO_SCAN},${coordinates[0] + ARES_TO_SCAN}`;
      const uri = `/images?access_token=${Keys.mapillaryToken}&fields=id,computed_geometry,sequence&bbox=${bbox}&limit=100`;
      //console.log(uri);
      const { data } = await axiosInstance.get<SearchData>(uri);
      return data.data;
    } catch (e: any) {
      console.log(e.response.data);
      throw e;
    }
  }
}
