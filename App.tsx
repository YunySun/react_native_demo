import {useState} from 'react';
import Text from './src/Components/Text';

/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-05-27 12:30:26
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-28 16:15:07
 * @Profile: 一个比较废柴的前端开发
 */

// 使用Reanimated npm i --save react-native-reanimated 报错

// babel.config.js
// plugins: [
//   [
//     'react-native-reanimated/plugin',
//     {
//       relativeSourceLocation: true,
//     },
//   ],
// ],
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
// } from 'react-native-reanimated';

export default function App() {
  // const randomWidth = useSharedValue(10);

  // const style = useAnimatedStyle(() => {
  //   return {width: randomWidth.value};
  // });
  // <Animated.View style={[{width: 100}, style]} />
  return <Text>123</Text>;
}
