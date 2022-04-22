import MapillaryViewer from 'MapillaryViewer.html';
import React from 'react';
import { WebView } from 'react-native-webview';

interface MapillaryWebProps {
  imageId: string;
}
class MapillaryWeb extends React.Component<MapillaryWebProps> {
  getHtml = (imageId: string): string => {
    const html = (MapillaryViewer as string).replace('<ID>', imageId);
    return html;
  };

  render() {
    console.log('MapillaryWeb');

    return <WebView source={{ html: this.getHtml(this.props.imageId) }} />;
  }
}

export default MapillaryWeb;
