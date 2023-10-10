import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import React from 'react';

/** @gesture 02手势 Race
 *  手势有很多种有长按操作 有拖拽操作 但是在长按的时候并不希望拖拽移动
 */
export default function GestureRace() {
  const offset = useSharedValue({x: 0, y: 0});
  const start = useSharedValue({x: 0, y: 0});

  // popup位置
  const popupOffset = useSharedValue({x: 0, y: 0});
  const popupAlpha = useSharedValue(0);

  // popup元素的样式
  const popupAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: popupOffset.value.x},
        {translateY: popupOffset.value.y},
      ],
      opacity: popupAlpha.value,
    };
  });

  // 改变元素样式
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value.x}, {translateY: offset.value.y}],
    };
  });

  // 手势点击事件
  const dragGesture = Gesture.Pan()
    .onStart(() => {
      popupAlpha.value = withTiming(0);
    })
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

  // 手势的长按事件
  const longPressGesture = Gesture.LongPress().onStart(() => {
    popupOffset.value = {
      x: offset.value.x,
      y: offset.value.y,
    };
    popupAlpha.value = withTiming(1);
  });

  // race
  const raceComposed = Gesture.Race(dragGesture, longPressGesture);

  return (
    <View>
      <Animated.View style={[styles.popupBall, popupAnimatedStyle]} />
      <GestureDetector gesture={raceComposed}>
        <Animated.View style={[styles.ball, animatedStyle]} />
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
    backgroundColor: 'blue',
  },
  popupBall: {
    width: 30,
    height: 30,
    borderRadius: 30,
    alignSelf: 'center',
    backgroundColor: 'red',
  },
});
