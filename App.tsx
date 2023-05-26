/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-05-24 15:53:41
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-25 11:11:55
 * @Profile: 一个比较废柴的前端开发
 */
import Text from './src/Components/Text';
import {ScrollView, SafeAreaView, View} from 'react-native';

export default function App() {
  return (
    // </View>
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View>
          <Text>123</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
