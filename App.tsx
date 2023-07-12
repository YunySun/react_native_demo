/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-05-27 12:30:26
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-06-18 22:10:29
 * @Profile: 一个比较废柴的前端开发
 */

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Carousel from './src/pages/gesture/Carousel';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Carousel />
    </GestureHandlerRootView>
  );
}
