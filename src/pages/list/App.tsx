/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-05-27 12:30:26
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-27 20:23:54
 * @Profile: 一个比较废柴的前端开发
 */
import {SafeAreaView} from 'react-native';
import SlowList from './SlowList';
import FastList from './FastList';
import FasterList from './FasterList';

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <SlowList /> */}
      {/* <FastList /> */}
      <FasterList />
    </SafeAreaView>
  );
}
