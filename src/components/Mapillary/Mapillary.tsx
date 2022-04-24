import React from 'react';
import { LatLng } from 'react-native-maps';
import * as Progress from 'react-native-progress';
import ImagesService from '../../services/images.service';
import MapillaryWeb from './MapillaryWeb';
import { generateCoordinate } from '../../utils/CoordinatesUtil';
import { StyleSheet, View } from 'react-native';

interface MapillaryProps {
  onMove: (coordinates: LatLng) => void;
}
const Mapillary: React.FC<MapillaryProps> = ({ onMove }) => {
  console.log('Mapillary');

  const [imageId, setImageId] = React.useState<string | null>(null);

  const initMapillary = () => {
    const possiblePlaces = [
      [
        53, //N
        28, //S
        -125, //W
        -74 //E
      ] // north america
    ];
    const startPoint = [generateCoordinate(possiblePlaces[0][1], possiblePlaces[0][0], 5), generateCoordinate(possiblePlaces[0][2], possiblePlaces[0][3], 5)];

    // ImagesService.searchForImages(startPoint).then(images => {
    //   console.log(`Found ${images.length} images`);

    //   if (images.length > 0) {
    //     const imageNum = Math.floor(Math.random() * images.length);
    //     const id = images[imageNum].id;
        const id = '498763468214164';

        ImagesService.getImage(id).then(image => {
          const coordinates = [image.computed_geometry.coordinates[0], image.computed_geometry.coordinates[1]];
          onMove({ latitude: coordinates[0], longitude: coordinates[1] });
          setImageId(id);
        });
      // } else {
      //   initMapillary();
      // }
    // });
  };

  if (!imageId) {
    initMapillary();
  }

  return imageId ? (
    <MapillaryWeb imageId={imageId} />
  ) : (
    <View style={styles.previewContainer}>
      <Progress.CircleSnail color={['red', 'green', 'blue']} />
    </View>
  );
};

const styles = StyleSheet.create({
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Mapillary;
