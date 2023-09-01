import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
// npm i --save-dev @types/react-native-video
import React from 'react';
// At the top where our imports are...

const VideoTest = () => {
  return (
    <ScrollView style={{backgroundColor: 'red', flex: 1}}>
      <Video
        source={require('../assets/test.mp4')} // Can be a URL or a local file.// Callback when video cannot be loaded
        style={styles.backgroundVideo}
        controls
        paused={true}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    height: 200,
  },
});

export default VideoTest;
