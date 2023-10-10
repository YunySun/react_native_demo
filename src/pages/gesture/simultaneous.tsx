/** @gesture 03 手势 simultaneous
 *  多个手势同时进行
 */
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import React from 'react';

export default function GestureSimultaneous() {
  const offset = useSharedValue({x: 0, y: 0});
  const start = useSharedValue({x: 0, y: 0});
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);

  // 运动动画
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: offset.value.x},
        {translateY: offset.value.y},
        {scale: scale.value},
        {rotate: `${rotation.value}rad`},
      ],
    };
  });

  // 点击事件
  const dragGesture = Gesture.Pan()
    .onUpdate(e => {
      offset.value = {
        x: start.value.x + e.translationX,
        y: start.value.y + e.translationY,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  // 放大缩小事件
  const zoomGesture = Gesture.Pinch()
    .onUpdate(e => {
      scale.value = e.scale * savedScale.value;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  // 旋转事件
  const rotateGesture = Gesture.Rotation()
    .onUpdate(e => {
      rotation.value = savedRotation.value + e.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  // simultaneous
  const composed = Gesture.Simultaneous(
    dragGesture,
    Gesture.Simultaneous(zoomGesture, rotateGesture),
  );

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={[styles.ball, animatedStyle]} />
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    alignSelf: 'center',
  },
});
