import React from 'react';
import { LatLng } from 'react-native-maps';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { Country } from '../../../../constants/country';

interface GoogleStreetViewWebProps {
  country: Country;
  /** Triggered on user moves to the next street view image */
  onMove: (coordinates: LatLng) => void;
}
class GoogleStreetViewWeb extends React.Component<GoogleStreetViewWebProps> {
  webview: WebView | null = null;
  isReady = false;

  /**
   * Triggered on user moves
   * @param event.nativeEvent.data - json string that contains lng and lat coordinates
   */
  onMessage = (event: WebViewMessageEvent) => {
    const position = JSON.parse(event.nativeEvent.data) as { lng: number; lat: number };
    this.props.onMove({ latitude: position.lat, longitude: position.lng });
  };

  onInit = () => {
    if (!this.isReady) {
      console.log(`
      $("#countries").val("${this.props.country}").change();
      setTimeout(() => {
          document.getElementsByClassName("handle")[0].style.display = "none";
          document.getElementById("ctlSplitter").style.zIndex = "-1"

          const toDelete = ["ad", "ctlUpper", "overlay_splitter", "zoomout", "behindzoomout", "zoomin", "behindzoomin", "menubutton", "behindmenubutton", "small", "big", "searchcontainer", "addressmobile"];

          for (const to of toDelete) {
            $("#" + to).css("cssText", "display: none !important;");
          }

          $("#ctlOuter").css("bottom", 0 + "px")
          $("#ctlLower").css("top", 0 + "px")
          google.maps.event.trigger(panorama, "resize")

          const postPosition = () => {
              var pos = panorama.getPosition();
              window.ReactNativeWebView.postMessage(JSON.stringify({ lat: pos.lat(), lng: pos.lng() }));
          }
          postPosition();

          panorama.addListener("position_changed", () => {
              postPosition();
          })

          const ccb = document.getElementsByClassName("cc_button")[0];
          if(ccb) ccb.click();
      }, 1000)
      `);

      this.webview?.injectJavaScript(`
      $("#countries").val("${this.props.country}").change();
      setTimeout(() => {
          document.getElementsByClassName("handle")[0].style.display = "none";
          document.getElementById("ctlSplitter").style.zIndex = "-1"

          const toDelete = ["ad", "ctlUpper", "overlay_splitter", "zoomout", "behindzoomout", "zoomin", "behindzoomin", "menubutton", "behindmenubutton", "small", "big", "searchcontainer", "addressmobile"];

          for (const to of toDelete) {
            $("#" + to).css("cssText", "display: none !important;");
          }

          $("#ctlOuter").css("bottom", 0 + "px")
          $("#ctlLower").css("top", 0 + "px")
          google.maps.event.trigger(panorama, "resize")

          const postPosition = () => {
              var pos = panorama.getPosition();
              window.ReactNativeWebView.postMessage(JSON.stringify({ lat: pos.lat(), lng: pos.lng() }));
          }
          postPosition();

          panorama.addListener("position_changed", () => {
              postPosition();
          })

          const ccb = document.getElementsByClassName("cc_button")[0];
          if(ccb) ccb.click();
      }, 1000)
      `);
      this.isReady = true;
    }
  };

  render() {
    return (
      <WebView
        ref={ref => (this.webview = ref)}
        source={{ uri: 'https://showmystreet.com/' }}
        injectedJavaScriptForMainFrameOnly={true}
        onLoad={this.onInit}
        onMessage={this.onMessage}
      />
    );
  }
}

export default GoogleStreetViewWeb;
