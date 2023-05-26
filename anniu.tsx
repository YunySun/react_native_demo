/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-05-24 15:53:41
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-25 10:55:30
 * @Profile: 一个比较废柴的前端开发
 */
import Text from './src/Components/Text';
import {
  ScrollView,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableHighlight,
  //   TouchableBounce,
  Alert,
  Button,
  Pressable,
  StyleSheet,
} from 'react-native';

function handlePressIn(e) {
  console.log('开始点击', e);
}

// 点击事件和长按事件只能触发一个 是通过开始和结束来判断的 且都在结束点按事件和点击事件之间触发的
function handlePressOut() {
  console.log('结束点按事件');
}

function handlePress() {
  console.log('点击事件');
}

function handleLongPress() {
  console.log('长按事件');
}

export default function App() {
  return (
    // </View>
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View>
          <Text>
            TouchableWithoutFeedback响应用户的点按操作，但不给出任何点按反馈效果
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              Alert.alert(
                'TouchableWithoutFeedback响应用户的点按操作，但不给出任何点按反馈效果',
              );
            }}>
            <View style={{backgroundColor: 'green'}}>
              <Text style={{color: 'white'}}>TouchableWithoutFeedback</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View>
          <Text>TouchableNativeFeedback原生平台的效果 安卓的涟漪效果</Text>
          <TouchableNativeFeedback
            onPress={() => {
              Alert.alert(
                'TouchableNativeFeedback原生平台的效果 安卓的涟漪效果',
              );
            }}>
            <View style={{backgroundColor: 'red'}}>
              <Text style={{color: 'white'}}>TouchableNativeFeedback</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View>
          <Text>TouchableOpacity 短暂改变组件的透明度</Text>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('TouchOpacity可以短暂的改变组件的透明度');
            }}>
            <View style={{backgroundColor: 'blue'}}>
              <Text style={{color: 'white'}}>TouchOpacity</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text>TouchableHighlight 短暂加深组件背景色</Text>
          <TouchableHighlight
            onPress={() => {
              Alert.alert('短暂加深组件背景色');
            }}>
            <View style={{backgroundColor: 'lightskyblue'}}>
              <Text style={{color: '#fff'}}>TouchableHighlight</Text>
            </View>
          </TouchableHighlight>
        </View>
        {/* <View>
          <Text>TouchableBounce 有回弹效果 文档里面并没有找到</Text>
          <TouchableBounce>
            <View style={{backgroundColor: 'purple'}}>
              <Text style={{color: '#fff'}}>TouchableBounce</Text>
            </View>
          </TouchableBounce>
        </View> */}
        <View>
          <Text>
            Button在Android上是TouchableNativeFeedback组件，在iOS上是TouchableOpacity组件
          </Text>
          <Button
            title="Button"
            color="yellow"
            accessibilityLabel="Learn more about this yellow button"
            onPress={() => {
              Alert.alert(
                'Button在Android上是TouchableNativeFeedback组件，在iOS上是TouchableOpacity组件',
              );
            }}
          />
        </View>
        <View>
          <Text>Pressable按钮</Text>
          <Pressable style={[styles.pressable]}>
            <Text>Pressable</Text>
          </Pressable>
        </View>
        <View>
          <Text>Pressable按钮动态样式</Text>
          <Pressable
            style={({pressed}) => {
              return [styles.pressable, {opacity: pressed ? 0.5 : 1}];
            }}>
            <Text>Pressable</Text>
          </Pressable>
        </View>
        <View>
          <Text>Pressable按钮安卓的涟漪效果</Text>
          <Pressable style={styles.pressable} android_ripple={{color: 'green'}}>
            <Text>Pressable</Text>
          </Pressable>
        </View>
        <View>
          <Text>Pressable按钮的点击事件</Text>
          <Pressable
            style={styles.pressable}
            android_ripple={{color: 'green'}}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
            onLongPress={handleLongPress}>
            <Text>Pressable</Text>
          </Pressable>
        </View>
        <View>
          <Text>
            Pressable可触发区域hitSlop和支持中途取消功能PressRetentionOffset
          </Text>
          <Pressable
            style={styles.rectPressable}
            android_ripple={{color: 'green'}}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
            onLongPress={handleLongPress}
            hitSlop={10}
            pressRetentionOffset={10}>
            <Text style={{color: '#fff'}}>Pressable</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // pressable按钮的固定样式
  pressable: {
    width: 80,
    height: 50,
    backgroundColor: 'lightgreen',
  },
  // pressable按钮可触发的区域和可保留的区域
  rectPressable: {
    width: 100,
    height: 54,
    padding: 10,
    margin: 10,
    backgroundColor: 'black',
    borderColor: 'red',
    borderWidth: 2,
  },
});
