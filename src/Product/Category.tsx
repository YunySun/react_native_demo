import {View, Text} from 'react-native';

/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-05-16 22:39:05
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-16 22:49:31
 * @Profile: 一个比较废柴的前端开发
 */
export default function Category({category}): JSX.Element {
  return (
    <View>
      <Text>{category}</Text>
    </View>
  );
}
