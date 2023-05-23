/*
 * @Description: 商品组件
 * @Author: 虾饺
 * @Date: 2023-05-16 22:26:25
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-16 22:49:20
 * @Profile: 一个比较废柴的前端开发
 */
/** 复合组件 纯JS函数
 * 如果要创建自定义的宿主组件 则需要Native代码 但是有些组件是可以直接用JS创建的，并且不用写Native代码 这类组件也叫复合组件
 */

import {Text, View} from 'react-native';

export default function Product({
  product = {name: '苹果', price: '1元'},
}): JSX.Element {
  return (
    <View style={{flexDirection: 'row', marginTop: 5}}>
      <Text style={{flex: 1}}>{product.name}</Text>
      <Text style={{width: 50}}>{product.price}</Text>
    </View>
  );
}
