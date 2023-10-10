import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import React from 'react';

/**
 * @description: 手势4 实现一个既响应单击又响应双击的组件
 */
export default function GestureExclusive() {
  const singleTap = Gesture.Tap().onEnd((event, success) => {
    if (success) {
      console.log('single tap');
    }
  });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((event, success) => {
      if (success) {
        console.log('double tap');
      }
    });

  // exclusive
  const taps = Gesture.Exclusive(doubleTap, singleTap);

  return (
    <GestureDetector gesture={taps}>
      <Animated.View style={styles.ball} />
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'blue',
    alignSelf: 'center',
  },
});
