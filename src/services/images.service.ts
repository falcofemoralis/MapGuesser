import { axiosInstance, token } from './index';
import MapillaryViewer from 'MapillaryViewer.html';

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

      console.log('searchForImages');
      
      const { data } = await axiosInstance.get<SearchData>(`/images?access_token=${token}&fields=id,computed_geometry&bbox=${bbox}&limit=50&min_quality_score=4`);

      console.log('downloaded');

      return data.data;
    } catch (e: any) {
      console.log(e.response.data);
      throw e;
    }
  }

  static async getImage(imageId: string): Promise<Image> {
    const { data } = await axiosInstance.get<Image>(`${imageId}?access_token=${token}&fields=id,computed_geometry,detections.value`);
    return data;
  }
}
