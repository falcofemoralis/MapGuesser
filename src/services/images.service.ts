import { Keys } from '../values/keys';
import { axiosMapillary } from './index';

export interface Image {
  id: string;
  computed_geometry: {
    coordinates: number[];
  };
  sequence: string;
  quality_score: number;
  camera_type: string;
}
export interface SearchData {
  data: Image[];
}

const AREA_TO_SCAN = 0.1; // area around of central pint to search for

export default class ImagesService {
  /**
   * Search for images on Mapillary
   * @param coordinates - coordinates of central point for search
   * @returns - array of images
   */
  static async searchFromMapillary(coordinates: number[]): Promise<Image[]> {
    try {
      const bbox = `${coordinates[1] - AREA_TO_SCAN},${coordinates[0] - AREA_TO_SCAN},${coordinates[1] + AREA_TO_SCAN},${coordinates[0] + AREA_TO_SCAN}`;
      const uri = `/images?access_token=${Keys.mapillaryToken}&fields=id,computed_geometry,sequence,quality_score,camera_type&bbox=${bbox}&limit=100`;
      //console.log(uri);
      const { data } = await axiosMapillary.get<SearchData>(uri);
      return data.data;
    } catch (e: any) {
      console.log(e.response.data);
      throw e;
    }
  }
}
