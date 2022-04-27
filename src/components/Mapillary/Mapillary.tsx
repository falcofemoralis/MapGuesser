import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LatLng } from 'react-native-maps';
import * as Progress from 'react-native-progress';
import { Colors } from '../../constants/colors';
import ImagesService from '../../services/images.service';
import { generateCoordinate } from '../../utils/CoordinatesUtil';
import MapillaryWeb from './MapillaryWeb';

interface MapillaryProps {
  onMove: (coordinates: LatLng) => void;
}
const Mapillary: React.FC<MapillaryProps> = ({ onMove }) => {
  const [imageId, setImageId] = React.useState<string | null>(null);

  const initMapillary = () => {
    // S W N E
    // 0 1 2 3
    const possiblePlaces = [[38.85682, -124.145508, 49.75288, -96.679688]];
    const randomPlace = Math.floor(Math.random() * possiblePlaces.length);
    const startPoint = [generateCoordinate(possiblePlaces[randomPlace][0], possiblePlaces[0][2], 5), generateCoordinate(possiblePlaces[0][1], possiblePlaces[0][3], 5)];

    ImagesService.searchForImages(startPoint).then(images => {
      console.log(`Found ${images.length} images`);

      if (images.length > 0) {
        const imageNum = Math.floor(Math.random() * images.length);
        const image = images[imageNum];
        onMove({ latitude: image.computed_geometry.coordinates[1], longitude: image.computed_geometry.coordinates[0] });
        setImageId(image.id);
      } else {
        initMapillary();
      }
    });
  };

  if (!imageId) {
    initMapillary();
  }

  return imageId ? (
    <MapillaryWeb imageId={imageId} />
  ) : (
    <View style={styles.loadingContainer}>
      <Progress.CircleSnail color={['red', 'green', 'blue']} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    zIndex: 999
  }
});

export default Mapillary;
