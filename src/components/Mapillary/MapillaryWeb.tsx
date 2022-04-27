import MapillaryViewer from 'MapillaryViewer.html';
import React from 'react';
import { WebView } from 'react-native-webview';
import { token } from '../../services';

interface MapillaryWebProps {
  imageId: string;
}
class MapillaryWeb extends React.Component<MapillaryWebProps> {
  getHtml = (imageId: string): string => {
    const html = (MapillaryViewer as string).replace('<ID>', imageId).replace('<TOKEN>', token);
    console.log('web');

    return html;
  };

  render() {
    return <WebView source={{ html: this.getHtml(this.props.imageId) }} />;
  }
}

export default MapillaryWeb;
