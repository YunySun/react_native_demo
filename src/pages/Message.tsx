/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-05-27 11:06:30
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-27 12:14:38
 * @Profile: 一个比较废柴的前端开发
 */
import Text from '../Components/Text';
import {View} from 'react-native';

export default function Message() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>这是消息页面</Text>
    </View>
  );
}
