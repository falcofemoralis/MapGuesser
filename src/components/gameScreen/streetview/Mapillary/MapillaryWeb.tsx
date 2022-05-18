import { Keys } from '@/values';
import MapillaryViewer from 'MapillaryViewer.html';
import React from 'react';
import { LatLng } from 'react-native-maps';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

const SEQUENCE_BTN_MARGIN = 14;

interface MapillaryWebProps {
  /** Sequence button margin */
  sequenceTop?: number;
  /** Street View image id*/
  imageId: string;
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
      .replace(`'TOP'`, `${this.props.sequenceTop ? this.props.sequenceTop + SEQUENCE_BTN_MARGIN : SEQUENCE_BTN_MARGIN}px`);
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
