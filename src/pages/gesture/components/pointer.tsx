import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import React from 'react';

export interface PointerInterface {
  visible: boolean;
  x: number;
  y: number;
}

export default function Pointer(props: {
  pointer: Animated.SharedValue<PointerInterface>;
  active: Animated.SharedValue<boolean>;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: props.pointer.value.x},
        {translateY: props.pointer.value.y},
        {
          scale:
            (props.pointer.value.visible ? 1 : 0) *
            (props.active.value ? 1.3 : 1),
        },
      ],
      backgroundColor: props.active.value ? 'red' : 'blue',
    };
  });

  return <Animated.View style={[styles.pointer, animatedStyle]} />;
}

const styles = StyleSheet.create({
  pointer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    position: 'absolute',
    marginStart: -30,
    marginTop: -30,
  },
});
