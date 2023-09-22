import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import type {RenderThumbProps} from 'reanimated-color-picker';
import React from 'react';

export default function MyCustomThumb({
  width,
  height,
  positionStyle,
  adaptiveColor,
  currentColor,
}: RenderThumbProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    borderColor: adaptiveColor.value,
    backgroundColor: currentColor.value,
  }));

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          // borderWidth: 1,
          borderRadius: width / 2,
          overflow: 'hidden',
        },
        animatedStyle,
        positionStyle,
      ]}>
      {/*<View*/}
      {/*  style={{*/}
      {/*    backgroundColor: initialColor,*/}
      {/*    width: '50%',*/}
      {/*    height,*/}
      {/*    alignSelf: 'flex-end',*/}
      {/*  }}*/}
      {/*/>*/}
    </Animated.View>
  );
}
