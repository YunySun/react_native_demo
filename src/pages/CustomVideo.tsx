import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Video from 'react-native-video';
import React, {useState} from 'react';
import SuperVideo from './SuperVideo';
// At the top where our imports are...

// npm i --save-dev @types/react-native-video

const CustomVideo = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const handlePlayVideo = () => {
    setModalVisible(true);
    setIsPaused(false);
  };

  const togglePlayVideo = () => {
    setIsPaused(!isPaused);
  };

  const onEnd = () => {
    setIsPaused(true);
  };

  const closePlayVideo = () => {
    setIsPaused(true);
    setModalVisible(false);
  };

  return (
    <ScrollView style={{flex: 1}}>
      <Pressable onPress={handlePlayVideo}>
        <View
          style={{
            width: '100%',
            height: 200,
            backgroundColor: 'lightskyblue',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>播放</Text>
        </View>
        <Modal visible={modalVisible}>
          <View
            style={{flex: 1, position: 'relative', backgroundColor: '#000'}}>
            <Video
              style={{
                flex: 1,
                // position: 'absolute',
                // width: '100%',
                // height: '100%',
              }}
              onEnd={onEnd}
              source={require('../assets/test.mp4')}
              paused={isPaused}
            />
            <Pressable
              onPress={togglePlayVideo}
              style={{
                position: 'absolute',
                zIndex: 2,
                left: 20,
                bottom: 20,
                width: 50,
                height: 50,
                backgroundColor: 'red',
              }}>
              <View>
                <Text>{isPaused ? '开始' : '暂停'}</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={closePlayVideo}
              style={{
                position: 'absolute',
                zIndex: 2,
                right: 20,
                top: 20,
                width: 50,
                height: 50,
                backgroundColor: 'red',
              }}>
              <View>
                <Text>关闭</Text>
              </View>
            </Pressable>
          </View>
        </Modal>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    height: 200,
  },
});

export default CustomVideo;
