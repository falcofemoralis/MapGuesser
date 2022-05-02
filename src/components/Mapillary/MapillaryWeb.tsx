import MapillaryViewer from 'MapillaryViewer.html';
import React from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { Mode } from '../../constants/mode';
import { Keys } from '../../values/keys';
import { LatLng } from 'react-native-maps';
import { TOP_PROGRESS_BAR_HEIGHT } from '../TopProgressBar/TopProgressBar';

interface MapillaryWebProps {
  imageId: string;
  mode: Mode;
  onMove: (coordinates: LatLng) => void;
}
class MapillaryWeb extends React.Component<MapillaryWebProps> {
  getHtml = (imageId: string): string => {
    const html = (MapillaryViewer as string)
      .replace('<ID>', imageId)
      .replace('<TOKEN>', Keys.mapillaryToken)
      .replace(`'TOP'`, this.props.mode == Mode.ROUND ? `${14 + TOP_PROGRESS_BAR_HEIGHT}px` : '14px');      
    return html;
  };

  onMessage = (event: WebViewMessageEvent) => {
    const position = JSON.parse(event.nativeEvent.data) as { lng: number; lat: number };
    this.props.onMove({ latitude: position.lat, longitude: position.lng });
  };

  render() {
    return <WebView source={{ html: this.getHtml(this.props.imageId) }} onMessage={this.onMessage} />;
  }
}

export default MapillaryWeb;
