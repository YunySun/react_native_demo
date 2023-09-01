/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-05-26 22:18:53
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-07-18 17:25:43
 * @Profile: 一个比较废柴的前端开发
 */
import {useLayoutEffect} from 'react';
import Text from '../Components/Text';
import {View, Image} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

export default function Detail({route, navigation}) {
  const {describe, image, symbol, price} = route.params;

  // React.useEffect()异步副作用回调 执行会导致setOptions闪屏 不推荐使用 如要隐藏头部和设置全局返回手势
  // 页面初始化的时候同步设置
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      fullScreenGestureEnabled: true,
      statusBarHidden: false,
    });
  }, [navigation]);

  // 点击按钮后，异步设置 多用于交互的场景

  function handlePress() {
    navigation.setOptions({
      title: describe,
    });
  }

  return (
    <View>
      <Text>{describe}</Text>
      <Text>
        {symbol}
        {price}
      </Text>
      <Image style={{width: 200, height: 200}} source={image} />
      <Text
        onPress={() => {
          if (symbol === '￥') {
            return;
          }
          navigation.setParams({
            symbol: '￥',
            price: price * 6.3,
          });
        }}>
        切换成￥
      </Text>
      <Text onPress={handlePress}>设置新标题</Text>
    </View>
  );
}
