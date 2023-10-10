import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HandleGesture from './src/pages/gesture/handleGesture';

// 查看被占用的端口
// netstat -nao|findstr 8081
// 关闭占用的端口
// taskkill /F /PID 1048

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        {/*<MyDownLoad />*/}
        <HandleGesture />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
