/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Text as NativeText,
} from 'react-native';
import ProductTable from './src/Product/ProductTable';

const PRODUCTS = [
  {
    category: '水果',
    products: [
      {price: '￥1', name: 'PingGuo', key: 'PingGuo'},
      {price: '￥1', name: 'HuoLongGuo', key: 'HuoLongGuo'},
      {price: '￥2', name: 'BaiXiangGuo', key: 'BaiXiangGuo'},
    ],
    key: 'shuiguo',
  },
  {
    category: '蔬菜',
    products: [
      {price: '￥2', name: 'BoCai', key: 'BoCai'},
      {price: '￥4', name: 'NanGua', key: 'NanGua'},
      {price: '￥1', name: 'WanDou', key: 'WanDou'},
    ],
    key: 'shucai',
  },
];

function Text({style, ...props}) {
  // 合并默认样式和传递的样式
  const mergeStyle = [defaultStyle, style];
  return <NativeText style={mergeStyle} {...props} />;
}

// 设置默认的样式
const defaultStyle = {
  color: 'red',
};

function App(): JSX.Element {
  return (
    <SafeAreaView style={{marginHorizontal: 10}}>
      <ScrollView>
        <ProductTable products={PRODUCTS} />
        <View style={{flexDirection: 'row', flexWrap: 'nowrap'}}>
          <View style={[styles.fallsSide, styles.fallsSide1]}>
            <View style={styles.fallsItem}>
              <Image
                style={styles.image1}
                source={{
                  uri: 'https://n.sinaimg.cn/sinakd20200629ac/704/w1024h1280/20200629/ea83-ivrxcex4237053.jpg',
                }}
              />
            </View>
            <View style={styles.fallsItem}>
              <Image
                style={styles.image2}
                source={{
                  uri: 'https://p8.itc.cn/images01/20211125/d4a9c4dbba824403b436919dd7f6ee14.jpeg',
                }}
              />
            </View>
          </View>
          <View style={styles.fallsSide}>
            <View style={styles.fallsItem}>
              <Image
                style={styles.image3}
                source={{
                  uri: 'https://pics4.baidu.com/feed/c995d143ad4bd1137596b2a49ab353074afb05f5.jpeg?token=d9bed08fa41d3ab73830c1d12f2ce7b3',
                }}
              />
            </View>
            <View style={styles.fallsItem}>
              <Image
                style={styles.image4}
                source={{
                  uri: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202001%2F17%2F20200117210154_nyiWy.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1686927442&t=31091c5d9b866b6d304f7ffcb442262e',
                }}
              />
            </View>
          </View>
        </View>

        <Text>Hello, world!</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  fallsSide: {
    flex: 1,
  },
  fallsSide1: {
    marginRight: 10,
  },
  fallsItem: {
    width: '100%',
    marginBottom: 10,
  },
  image1: {
    aspectRatio: 385 / 482,
  },
  image2: {
    aspectRatio: 385 / 240,
  },
  image3: {
    aspectRatio: 385 / 356,
  },
  image4: {
    aspectRatio: 385 / 834,
  },
});
