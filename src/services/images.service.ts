import { axiosInstance } from './index';
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

const token = 'MLY|7607577125926499|b725cde7a14e5c9f30f5e9038a585290';

export default class ImagesService {
  static async searchForImages(coordinates: number[]): Promise<Image[]> {
    const bbox = `${coordinates[0] - 4},${coordinates[1] - 4},${coordinates[0] + 4},${coordinates[1] + 4}`;
    const { data } = await axiosInstance.get<SearchData>(`/images?access_token=${token}&fields=id&bbox=${bbox}`);
    return data.data;
  }

  static async getImage(imageId: string): Promise<Image> {
    const { data } = await axiosInstance.get<Image>(`${imageId}?access_token=${token}&fields=id,computed_geometry,detections.value`);
    return data;
  }
}
