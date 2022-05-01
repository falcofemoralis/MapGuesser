import MapillaryViewer from 'MapillaryViewer.html';
import React from 'react';
import { WebView } from 'react-native-webview';
import { Mode } from '../../constants/mode';
import { Keys } from '../../values/keys';

interface MapillaryWebProps {
  imageId: string;
  mode: Mode;
}
class MapillaryWeb extends React.Component<MapillaryWebProps> {
  getHtml = (imageId: string): string => {
    const html = (MapillaryViewer as string)
      .replace('<ID>', imageId)
      .replace('<TOKEN>', Keys.mapillaryToken)
      .replace(`'TOP'`, this.props.mode == Mode.ROUND ? '70px' : '14px');
    return html;
  };

  render() {
    return <WebView source={{ html: this.getHtml(this.props.imageId) }} />;
  }
}

export default MapillaryWeb;
