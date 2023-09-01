import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  StyleProp,
  ViewStyle,
  View,
  Text,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Video, {OnProgressData, OnLoadData} from 'react-native-video';
import Slider from '@react-native-community/slider';

// npm install pawlitos/react-native-orientation-locker
import Orientation from 'react-native-orientation-locker';
import dayjs from 'dayjs';
export default function SuperVideo({
  wrapperStyle,
  imageSource,
  videoSource,
}: SuperVideoProps) {
  const [touched, setTouched] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [player, setPlayer] = useState<Video | null>(null);
  const [paused, setPaused] = useState(true);
  const [progressData, setProgressData] =
    useState<OnProgressData>(initProgressData);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    'landscape',
  );
  const [currentTime, setCurrentTime] = useState(0);
  const startVideo = () => {
    setTouched(true);
    setPaused(false);
  };
  const onValueChange = (value: number) => {
    if (player) {
      player.seek(value);
      setProgressData({
        ...progressData,
        currentTime: value,
      });
    }
  };
  const assignInstance = (instance: Video | null) => {
    if (instance) {
      setPlayer(instance);
    }
  };
  const onLoad = ({naturalSize}: OnLoadData) => {
    if (player) {
      player.seek(currentTime);
    }
    setOrientation(naturalSize.orientation);
  };
  const onProgress = (data: OnProgressData) => {
    setProgressData(data);
  };
  const onRequestClose = () => {
    setFullscreen(false);
    setCurrentTime(progressData.currentTime);
    Orientation.lockToPortrait();
  };
  const togglePaused = () => {
    setPaused(!paused);
  };
  const toggleFullscreen = () => {
    const newFullscreenState = !fullscreen;
    setFullscreen(newFullscreenState);
    setCurrentTime(progressData.currentTime);
    orientation === 'landscape'
      ? Orientation.lockToLandscape()
      : Orientation.lockToPortrait();
  };
  const onEnd = () => {
    setPaused(true);
    if (player) {
      player.seek(0);
    }
    setProgressData(initProgressData);
  };
  return (
    <>
      <View style={[styles.wrapper, wrapperStyle]}>
        {!fullscreen && (
          <Video
            source={videoSource}
            style={[styles.videoBg, {bottom: 50}, !touched && {opacity: 0}]}
            resizeMode="contain"
            ref={assignInstance}
            onLoad={onLoad}
            paused={paused}
            onEnd={onEnd}
            onProgress={onProgress}
            fullscreen={fullscreen}
          />
        )}
        {touched ? (
          <Toolbar
            paused={paused}
            togglePaused={togglePaused}
            fullscreen={fullscreen}
            toggleFullscreen={toggleFullscreen}
            progressData={progressData}
            onValueChange={onValueChange}
          />
        ) : (
          <>
            <ImageBackground
              source={imageSource}
              resizeMode="cover"
              style={styles.imageBg}
            />
            <TouchableOpacity onPress={startVideo} style={styles.playBox}>
              <SvgXml xml={BigPlayIconXml} style={styles.playIcon} />
            </TouchableOpacity>
          </>
        )}
      </View>
      <Modal visible={fullscreen} onRequestClose={onRequestClose}>
        <View style={styles.modalStyle}>
          <View style={styles.fullscreenWrapper}>
            {fullscreen && (
              <Video
                source={videoSource}
                style={[styles.videoBg, {bottom: 30}]}
                resizeMode="contain"
                ref={assignInstance}
                onLoad={onLoad}
                paused={paused}
                onEnd={onEnd}
                onProgress={onProgress}
                fullscreen={fullscreen}
              />
            )}
            <Toolbar
              paused={paused}
              togglePaused={togglePaused}
              fullscreen={fullscreen}
              toggleFullscreen={onRequestClose}
              progressData={progressData}
              onValueChange={onValueChange}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
/**
 * 不处理超越 24 小时的时刻
 * @param seconds
 * @returns
 */
const convertSeconds = (seconds: number): string => {
  let template = 'mm:ss';
  if (seconds > 36000) {
    template = 'HH:mm:ss';
  } else if (seconds > 3600) {
    template = 'H:mm:ss';
  }
  return dayjs().startOf('day').second(seconds).format(template);
};
const initProgressData: OnProgressData = {
  currentTime: 0,
  playableDuration: 0,
  seekableDuration: 0,
};
const playIconXml =
  '<svg   viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.427 5.875L1.486.907A1 1 0 0 0 0 1.782v9.934a1 1 0 0 0 1.486.874l8.94-4.967a1 1 0 0 0 0-1.748z" fill="#fff"/></svg>';
const stopIconXml =
  '<svg   viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="5"   rx="1" fill="#fff"/><rect x="14" y="5"   rx="1" fill="#fff"/></svg>';
const Toolbar = ({
  paused,
  togglePaused,
  fullscreen,
  toggleFullscreen,
  progressData,
  onValueChange,
}: ToolbarProps) => {
  return (
    <View style={[styles.toolbarStyle, {bottom: fullscreen ? 0 : 20}]}>
      <TouchableOpacity style={styles.iconBox} onPress={togglePaused}>
        <SvgXml xml={paused ? playIconXml : stopIconXml} />
      </TouchableOpacity>
      <Text style={styles.progressText}>
        {convertSeconds(progressData.currentTime)}
      </Text>
      <Slider
        style={styles.sliderStyle}
        minimumValue={0}
        value={progressData.currentTime}
        maximumValue={progressData.seekableDuration}
        onValueChange={onValueChange}
        minimumTrackTintColor="#fff"
        maximumTrackTintColor="#fff"
      />
      <Text style={styles.progressText}>
        {convertSeconds(progressData.seekableDuration)}
      </Text>
      <TouchableOpacity style={styles.iconBox} onPress={toggleFullscreen}>
        <SvgXml
          xml={fullscreen ? closeFullscreenIconXml : openFullscreenIconXml}
          width={20}
          height={20}
        />
      </TouchableOpacity>
    </View>
  );
};
const BigPlayIconXml =
  '<svg   viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.224 8.902L4.066.481C2.466-.408.5.749.5 2.579V19.42c0 1.83 1.966 2.987 3.566 2.098l15.158-8.421c1.646-.914 1.646-3.282 0-4.196z" fill="#fff"/></svg>';
const openFullscreenIconXml =
  '<svg   viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 3H6c-1.414 0-2.121 0-2.56.44C3 3.878 3 4.585 3 6v2M8 21H6c-1.414 0-2.121 0-2.56-.44C3 20.122 3 19.415 3 18v-2M16 3h2c1.414 0 2.121 0 2.56.44C21 3.878 21 4.585 21 6v2M16 21h2c1.414 0 2.121 0 2.56-.44.44-.439.44-1.146.44-2.56v-2" stroke="#fff" stroke- stroke-linecap="round"/></svg>';
const closeFullscreenIconXml =
  '<svg   viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 3v1c0 1.886 0 2.828-.586 3.414C6.828 8 5.886 8 4 8H3M16 3v1c0 1.886 0 2.828.586 3.414C17.172 8 18.114 8 20 8h1M8 21v-1c0-1.886 0-2.828-.586-3.414C6.828 16 5.886 16 4 16H3M16 21v-1c0-1.886 0-2.828.586-3.414C17.172 16 18.114 16 20 16h1" stroke="#fff" stroke- stroke-linejoin="round"/></svg>';
const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 20,
  },
  imageBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  videoBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  playBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#34657B',
  },
  playIcon: {
    marginTop: 17.5,
    marginLeft: 22.5,
  },
  progressText: {
    marginLeft: 5,
    marginRight: 5,
    color: '#fff',
  },
  modalStyle: {flex: 1, backgroundColor: '#000'},
  fullscreenWrapper: {
    position: 'relative',
    borderRadius: 0,
    width: '100%',
    height: '100%',
  },
  toolbarStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  sliderStyle: {flex: 1},
  iconBox: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
interface SuperVideoProps {
  wrapperStyle?: StyleProp<ViewStyle>;
  imageSource: ImageSourcePropType;
  videoSource: {
    uri?: string | undefined;
    headers?: {[key: string]: string} | undefined;
    type?: string | undefined;
  };
}
interface ToolbarProps {
  paused: boolean;
  togglePaused: () => void;
  fullscreen: boolean;
  toggleFullscreen: () => void;
  progressData: OnProgressData;
  onValueChange: (value: number) => void;
}
