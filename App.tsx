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
} from 'react-native';

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
      </ScrollView>
    </SafeAreaView>
  );
}
