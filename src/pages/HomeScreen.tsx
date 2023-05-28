import Text from '../Components/Text';
import {useEffect} from 'react';
import {View, Button, ScrollView} from 'react-native';
/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-05-27 10:52:55
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-28 07:43:57
 * @Profile: 一个比较废柴的前端开发
 */
export default function HomeScreen({navigation, route}) {
  useEffect(() => {
    if (route.params?.post) {
      // 获取post
      console.log(route.params?.post);
    }
  }, [route.params?.post]);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="GO to Details"
        onPress={() => {
          navigation.navigate('Details', {
            itemId: 86,
            otherParams: 'anything you want here',
          });
        }}
      />
      <Button
        title="Create post"
        onPress={() => navigation.navigate('CreatePost')}
      />
      <Button
        title="Go to TabHome"
        onPress={() => {
          navigation.navigate('TabHome');
        }}
      />
      <Button
        title="Open a Dialog"
        onPress={() => {
          navigation.push('Modal');
        }}
      />
    </View>
  );
}
