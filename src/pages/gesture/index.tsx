/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-06-18 16:53:53
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-06-18 17:33:09
 * @Profile: 一个比较废柴的前端开发
 */
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';
import Text from '../../Components/Text';

/**Gesture手势库是在UI线程里面跑的 所以console事件实际上实在Reanimated创建的JS虚拟机中执行的，日志也是从UI线程里面打印的。
 * 不能调用setState的渲染方法 调用就会报错 渲染过程是跑在 JavaScript 线程中的
 * 如果想使用手势回调函数来操作JS里的渲染 就需要使用runOnJS来执行setState
 */
export default function GestureDemo() {
  const [logs, setLogs] = useState<string[]>([]);
  // 手势
  const singleTap = Gesture.Tap().onStart(() => {
    console.log('开始触发请按事件');
    runOnJS(setLogs)(logs.concat('开始触发请按事件'));
  });

  return (
    <View>
      <GestureDetector gesture={singleTap}>
        <View style={styles.container} />
      </GestureDetector>
      <View>
        {logs.map((log, index) => (
          <Text key={index}>{log}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    borderBottomWidth: 200,
    height: 200,
  },
});
