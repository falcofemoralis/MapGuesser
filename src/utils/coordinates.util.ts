import { LatLng } from "react-native-maps";

export const generateCoordinate = (from: number, to: number, fixed: number): number => {
  const n = Math.random() * (to - from) + from;
  return Number.parseFloat(n.toFixed(fixed));
};

export const getRegionForCoordinates = (points: LatLng[]) => {
  // points should be an array of { latitude: X, longitude: Y }
  let minX = 0, maxX = 0, minY = 0, maxY = 0;

  // init first point
  (point => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  // calculate rect
  points.map(point => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = maxX - minX;
  const deltaY = maxY - minY;

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX,
    longitudeDelta: deltaY
  };
};
