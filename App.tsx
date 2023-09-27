import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MyDownLoad from './src/pages/Download';
import React from 'react';

// 查看被占用的端口
// netstat -nao|findstr 8081
// 关闭占用的端口
// taskkill /F /PID 1048

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <MyDownLoad />
    </GestureHandlerRootView>
  );
}
