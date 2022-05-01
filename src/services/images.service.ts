import { Keys } from '../values/keys';
import { axiosInstance } from './index';

export interface Image {
  id: string;
  computed_geometry: {
    coordinates: number[];
  };
}
export interface SearchData {
  data: Image[];
}

export default class ImagesService {
  static async searchForImages(coordinates: number[]): Promise<Image[]> {
    try {
      const bbox = `${coordinates[1] - 0.05},${coordinates[0] - 0.05},${coordinates[1] + 0.05},${coordinates[0] + 0.05}`;
      const { data } = await axiosInstance.get<SearchData>(
        `/images?access_token=${Keys.mapillaryToken}&fields=id,computed_geometry&bbox=${bbox}&limit=100&min_quality_score=4`
      );
      return data.data;
    } catch (e: any) {
      console.log(e.response.data);
      throw e;
    }
  }
}
