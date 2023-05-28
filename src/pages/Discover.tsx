/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-05-26 22:16:03
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-27 09:43:02
 * @Profile: 一个比较废柴的前端开发
 */
import {useContext} from 'react';
import {AnimalContext} from '../../Navigationdemo';
import Text from '../Components/Text';
import {Pressable, Image} from 'react-native';

// 函数组件默认是没有navigation对象的
// 当函数组件通过Stack.Screen生成页面时 才会有navigation对象
export default function Discover({navigation}) {
  const ALL_NTF = useContext(AnimalContext);
  return (
    <>
      {ALL_NTF.map(ntf => {
        return (
          <Pressable
            key={ntf.id}
            onPress={() => {
              navigation.navigate('Detail', ntf);
            }}>
            <Image style={{width: 100, height: 100}} source={ntf.image} />
          </Pressable>
        );
      })}
      <Pressable
        key="4"
        onPress={() => {
          navigation.navigate('Detail');
        }}>
        <Text>默认点击跳转</Text>
      </Pressable>
    </>
  );
}
