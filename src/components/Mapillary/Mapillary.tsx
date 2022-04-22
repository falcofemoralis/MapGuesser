import React from 'react';
import { Text } from 'react-native';
import { LatLng } from 'react-native-maps';
import ImagesService from '../../services/images.service';
import MapillaryWeb from './MapillaryWeb';

interface MapillaryProps {
  startPoint: number[]; // coordinates lon, lat
  onMove: (coordinates: LatLng) => void;
}
const Mapillary: React.FC<MapillaryProps> = ({ startPoint, onMove }) => {
  console.log('Mapillary');

  const [imageId, setImageId] = React.useState<string | null>(null);
  const [text, setText] = React.useState('Loading...');

  if (!imageId) {
    //  ImagesService.searchForImages(startPoint).then(images => {
    //console.log(`Found ${images.length} images`);

    // if (images.length > 0) {
    //   const imageId = images[0].id;
    const id = '498763468214164';
    console.log(`imageId ${id}`);

    ImagesService.getImage(id).then(image => {
      const coordinates = [image.computed_geometry.coordinates[0], image.computed_geometry.coordinates[1]];
      console.log(`Image data downloaded ${image.computed_geometry.coordinates}`);

      onMove({ latitude: coordinates[0], longitude: coordinates[1] });
      setImageId(id);
    });
    // } else {
    //   setText('Failed. Try Again...');
    //   // try again
    // }
    //  });
  }

  return imageId ? <MapillaryWeb imageId={imageId} /> : <Text>{text}</Text>;
};

export default Mapillary;
