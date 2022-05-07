import MapillaryViewer from 'MapillaryViewer.html';
import React from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { GameMode } from '../../constants/gamemode';
import { Keys } from '../../values/keys';
import { LatLng } from 'react-native-maps';
import { TOP_PROGRESS_BAR_HEIGHT } from '../TopProgressBar/TopProgressBar';

interface MapillaryWebProps {
  /** Street View image id*/
  imageId: string;
  /** Game mode. Required for the correct buttons position */
  gameMode: GameMode;
  /** Triggered on user moves to the next street view image */
  onMove: (coordinates: LatLng) => void;
}
class MapillaryWeb extends React.Component<MapillaryWebProps> {
  /**
   * Get the page of Mapillary
   * @param imageId - imageId to replace in html
   * @returns html string
   */
  getHtml = (imageId: string): string => {
    const html = (MapillaryViewer as string)
      .replace('<ID>', imageId)
      .replace('<TOKEN>', Keys.mapillaryToken)
      .replace(`'TOP'`, this.props.gameMode == GameMode.ROUND ? `${14 + TOP_PROGRESS_BAR_HEIGHT}px` : '14px');
    return html;
  };

  /**
   * Triggered on user moves
   * @param event.nativeEvent.data - json string that contains lng and lat coordinates
   */
  onMove = (event: WebViewMessageEvent) => {
    const position = JSON.parse(event.nativeEvent.data) as { lng: number; lat: number };
    this.props.onMove({ latitude: position.lat, longitude: position.lng });
  };

  render() {
    return <WebView source={{ html: this.getHtml(this.props.imageId) }} onMessage={this.onMove} />;
  }
}

export default MapillaryWeb;
