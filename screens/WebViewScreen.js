import React, { useEffect, useState } from 'react';
import { StyleSheet, Platform, ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Application from 'expo-application';

const WebViewScreen = () => {
  const [deviceId, setDeviceId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ekran yönünü serbest bırak
    ScreenOrientation.unlockAsync();
    
    // Device ID'yi al
    const getDeviceId = async () => {
      let id;
      if (Platform.OS === 'ios') {
        id = await Application.getIosIdForVendorAsync();
      } else {
        id = Application.androidId;
      }
      setDeviceId(id || 'unknown');
    };
    
    getDeviceId();
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        source={{ 
          uri: `http://esnafagetirdemo.runasp.net/Login/Index?deviceid=${deviceId}`,
          headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'text/html; charset=utf-8',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          }
        }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        mixedContentMode="compatibility"
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      />
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default WebViewScreen; 