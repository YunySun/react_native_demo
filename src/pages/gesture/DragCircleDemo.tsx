/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-06-18 17:30:49
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-06-18 18:14:02
 * @Profile: 一个比较废柴的前端开发
 */
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
export default function DragCircleDemo() {
  /**
   * onBegin：开始识别到手势，但此时拖拽并未发生。也就是说，这时你的手指是触碰到 View 视图，不过手指并未移动；
   * onTouchesDown：手指按下触摸到视图时会触发。你可以理解为在手指触摸到视图时，先触发了 onBegin ，紧接着就触发了 onTouchesDown；
   * onTouchesMove：手指移动后会触发；
   * onStart：当手指移动距离超过 Float.MIN_VALUE 的阈值时，也就是精度为 0.000000 的距离时，就会触发该回调，此时拖拽事件正式触发；
   * onUpdate：在手指移动的过程中 x/y 坐标系等参数会更新，参数更新后 onUpdate 回调就会触发
   * onChange：在手指移动的过程中 x/y 坐标系等参数会更新，参数更新后 onChange 回调会紧接着 onUpdate 触发。onChange 和 onUpdate 的区别是，onChange 的参数是以上一次回调的参数作为基准进行更新的，而 onUpdate 是以手势触发 onStart 时的参数为基准进行更新的；
   * onTouchesUp：当手指离开屏幕时，触发 onTouchesUp 回调
   * onEnd：当手指离开屏幕时，会先触发 onTouchesUp 回调，然后紧接着触发 onEnd 回调。需要注意的是， onEnd 回调是和 onStart 配套出现的，如果没有触发 onStart 回调，那也不会触发 onEnd 回调；
   * onTouchesCancelled：一般是在系统弹窗中断手势的情况下触发，较为少见；
   * onFinalize：只要手势结束，最终都会触发 onFinalize 回调
   */
  const isPress = useSharedValue(false);
  const offset = useSharedValue({x: 0, y: 0});

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value.x}, {translateY: offset.value.y}],
      backgroundColor: isPress.value ? 'lightskyblue' : '#ccc',
    };
  });

  const handleDragGesture = Gesture.Pan()
    .onBegin(() => {
      console.log('onBegin');
      isPress.value = true;
    })
    .onTouchesDown(() => {
      console.log('onTouchesDown');
    })
    .onTouchesMove(() => {
      console.log('onTouchesMove');
    })
    .onStart(() => {
      console.log('onStart');
    })
    .onUpdate(() => {
      console.log('onUpdate');
    })
    .onChange(e => {
      console.log('onChange', e);
      offset.value = {
        x: offset.value.x + e.changeX,
        y: offset.value.y + e.changeY,
      };
    })
    .onTouchesUp(() => {
      console.log('onTouchesUp');
    })
    .onEnd(() => {
      console.log('onEnd');
    })
    .onTouchesCancelled(() => {
      console.log('onTouchesCancelled');
    })
    .onFinalize(() => {
      console.log('onFinalize');
      isPress.value = false;
      offset.value = {
        x: 0,
        y: 0,
      };
    });

  return (
    <GestureDetector gesture={handleDragGesture}>
      <Animated.View style={[styles.circle, animatedStyles]} />
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#ccc',
  },
});
