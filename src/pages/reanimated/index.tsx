import {StyleSheet, View, Button} from 'react-native';

// babel.config.js
// plugins: [
//   [
//     'react-native-reanimated/plugin',
//     {
//       relativeSourceLocation: true,
//     },
//   ],
// ],
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {DefaultStyle} from '../DefaultStyle';

export default function ReanimatedDemo() {
  // 驱动动画的最初因子是共享值ShareValue useSharedValue用于初始化共享值的钩子函数
  const randomWidth = useSharedValue(10); // 默认数字10

  // ❌
  //   const style = {
  //     width: randomWidth.value,
  //   };

  // ✔ useAnimatedStyle专门处理动画样式的衍生值
  const style = useAnimatedStyle(() => {
    console.log('==Animated==');
    return {
      width: randomWidth.value, // 可以在这处使用withTiming
    };
  });

  console.log('==Render==');
  // 引入动画组件 Animated.View 还有Animated.Text Animated.FlatList等
  return (
    <View>
      <View>
        <Animated.View style={[AnimatedDemoStyle.defaultAnimated, style]} />
        <View style={DefaultStyle.flexRow}>
          <Button
            title="不带动画的更新"
            onPress={() => {
              randomWidth.value = Math.random() * 360;
            }}
          />
          <Button
            title="带动画的更新"
            onPress={() => {
              randomWidth.value = withTiming(Math.random() * 360);
            }}
          />
        </View>
      </View>
    </View>
  );
}

const AnimatedDemoStyle = StyleSheet.create({
  defaultAnimated: {
    width: 100,
    height: 20,
    backgroundColor: 'tomato',
  },
});
