/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-05-18 22:12:32
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-23 21:56:36
 * @Profile: 一个比较废柴的前端开发
 */
import {Image, View} from 'react-native';
// import Game from './src/Product/Game';
const haitun = require('./src/assets/images/海豚.png');

export default function App() {
  return (
    <View>
      {/* <Game /> */}
      {
        //npx react-native bundle --entry-file App.tsx --dev false --minify false --bundle-output ./build/index.bundle --assets-dest ./build
      }
      <Image source={haitun} />
    </View>
  );
}
