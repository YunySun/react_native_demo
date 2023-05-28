// npm install @reduxjs/toolkit npm install react-redux
import {configureStore, createSlice} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import CounterTool from './CounterTool';
import {View, StyleSheet} from 'react-native';
// npm i react-native-linear-gradient 添加渐变
import LinearGradient from 'react-native-linear-gradient';
const initialState = {value: 0};
export const counterSlice = createSlice({
  name: 'counter', // 分片名字 字符串类型
  initialState, // 分片的初始化状态
  reducers: {
    increment: (state, action) => {
      // 直接修改状态
      state.value += action.payload;
    },
  }, // 对象类型 用于创建分片action和分片reducer
});

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

console.log(counterSlice.actions.increment(1));
// {"payload": 1, "type": "counter/increment"}
console.log(counterSlice.reducer);

export default function App() {
  return (
    <Provider store={store}>
      {/* <LinearGradient
        colors={['#FF0000', '#00FF00', '#0000FF']} // 渐变颜色数组
        start={{x: 0, y: 0}} // 渐变起点坐标
        end={{x: 1, y: 0}} // 渐变终点坐标
        style={{flex: 1}}> */}
      <View style={styles.container}>
        <CounterTool />
        {/* <Text style={{position: 'absolute', top: 0}}>123</Text> */}
      </View>
      {/* </LinearGradient> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
});
