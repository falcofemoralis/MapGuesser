import { Keys } from '../values/keys';
import { axiosMapillary } from './index';

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

const AREA_TO_SCAN = 0.1;
export default class ImagesService {
  static async searchForImages(coordinates: number[]): Promise<Image[]> {
    try {
      const bbox = `${coordinates[1] - AREA_TO_SCAN},${coordinates[0] - AREA_TO_SCAN},${coordinates[1] + AREA_TO_SCAN},${coordinates[0] + AREA_TO_SCAN}`;
      const uri = `/images?access_token=${Keys.mapillaryToken}&fields=id,computed_geometry,sequence&bbox=${bbox}&limit=100`;
      //console.log(uri);
      const { data } = await axiosMapillary.get<SearchData>(uri);
      return data.data;
    } catch (e: any) {
      console.log(e.response.data);
      throw e;
    }
  }
}
