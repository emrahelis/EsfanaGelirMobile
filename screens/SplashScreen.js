import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Ekran yönünü kilitle
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  const handleVideoEnd = () => {
    navigation.replace('WebView');
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/splash.mp4')}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={true}
        isLooping={false}
        style={styles.video}
        onPlaybackStatusUpdate={(status) => {
          if (status.didJustFinish) {
            handleVideoEnd();
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default SplashScreen; 