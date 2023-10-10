import React from 'react';
import Pointer, {PointerInterface} from './components/pointer';
import Animated, {useSharedValue} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

/**
 * @description 手势处理5 手动手势
 */
export default function HandleGesture() {
  const pointers: Animated.SharedValue<PointerInterface>[] = [];
  const active = useSharedValue(false);
  for (let i = 0; i < 12; i++) {
    pointers[i] = useSharedValue<PointerInterface>({
      visible: false,
      x: 0,
      y: 0,
    });
  }

  const gesture = Gesture.Manual()
    .onStart(() => {
      active.value = true;
    })
    .onTouchesDown((e, stateManager) => {
      console.log(e);
      for (const touch of e.changedTouches) {
        pointers[touch.id].value = {
          visible: true,
          x: touch.x,
          y: touch.y,
        };
      }

      // 如果有至少2个手势则激活
      if (e.numberOfTouches >= 2) {
        stateManager.activate();
      }
    })
    .onTouchesMove(e => {
      for (const touch of e.changedTouches) {
        pointers[touch.id].value = {
          visible: true,
          x: touch.x,
          y: touch.y,
        };
      }
    })
    .onTouchesUp((e, stateManager) => {
      for (const touch of e.changedTouches) {
        pointers[touch.id].value = {
          visible: false,
          x: touch.x,
          y: touch.y,
        };
      }
      if (e.numberOfTouches === 0) {
        stateManager.end();
      }
    })
    .onEnd(() => {
      active.value = false;
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={{flex: 1}}>
        {pointers.map((pointer, index) => {
          return <Pointer pointer={pointer} active={active} key={index} />;
        })}
      </Animated.View>
    </GestureDetector>
  );
}
