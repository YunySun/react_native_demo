/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-05-16 22:38:48
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-17 23:48:01
 * @Profile: 一个比较废柴的前端开发
 */

import {View, Text, Image, StyleSheet} from 'react-native';
import Product from './Product';
import Category from './Category';

export default function ProductTable({products}): JSX.Element {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 10,
        }}>
        <Text
          style={{
            color: '#000',
            borderColor: 'green',
            borderWidth: 1,
            borderRadius: 5,
          }}>
          名称
        </Text>
        <Text style={{color: '#000'}}>价格</Text>
      </View>
      {products.map(category => {
        return (
          <View
            style={{marginBottom: 10, backgroundColor: 'powderblue'}}
            key={category.key}>
            <Category category={category.category} />
            {category.products.map(product => {
              return <Product product={product} key={product.key} />;
            })}
          </View>
        );
      })}
      <Text>左图右文布局</Text>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{width: 100, height: 100}}
          source={{
            uri: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F1a6130e4-c85d-4e04-a35f-29ca1c3bbe15%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1686925360&t=d80ccdf38db10b5e0939c6f7ecd6317f',
          }}
        />
        <Text style={{flex: 1, fontSize: 18}}>我是文字</Text>
      </View>
      <Text>文字居中对齐</Text>
      <View style={styles.container}>
        <Text style={styles.texts}>我是文字1</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    fontSize: 18,
    // 文字默认内边距会导致垂直居中偏下
    includeFontPadding: false,
    // 文字默认基于基线对齐 会导致垂直居中偏下
    textAlignVertical: 'center',
    lineHeight: 20, // 我不加行高的话 文字会被剪切
  },
});
