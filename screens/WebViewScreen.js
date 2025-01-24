import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';

const WebViewScreen = () => {
  useEffect(() => {
    // Ekran yönünü serbest bırak
    ScreenOrientation.unlockAsync();
  }, []);

  return (
    <WebView
      style={styles.container}
      source={{ uri: 'https://www.esnafagelir.com/' }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      scalesPageToFit={true}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewScreen; 