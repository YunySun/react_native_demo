/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-05-18 22:12:32
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-24 16:46:13
 * @Profile: 一个比较废柴的前端开发
 */
import {ScrollView, SafeAreaView, Image, View} from 'react-native';
import Text from './src/Components/Text';
import FastImage from 'react-native-fast-image';
// import Game from './src/Product/Game';
const dolphin = require('./src/assets/images/cat.png');
// import ICON_BASE64 from './src/assets/js/icon_base64';

// 获取本地文件的信息
// Alert.alert(JSON.stringify(Image.resolveAssetSource(dolphin)));

export default function App() {
  return (
    // <View>
    //   <Game />

    // </View>
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        {
          // 安卓端构建应用程序的发布版本
          //npx react-native bundle --entry-file App.tsx --dev false --minify false --bundle-output ./build/index.bundle --assets-dest ./build
          // cd android
          // gradlew assembleRelease(最好gradlew clean一下)
          // npx react-native run-android --variant=release
          // 使用dolphin.png报错 应该是图片的问题
        }
        <Text>本地图片</Text>
        <View>
          <Image
            source={require('./src/assets/images/logo.png')}
            style={{width: 200, height: 200, resizeMode: 'contain'}}
          />
        </View>

        <View>
          <Text>网络图片</Text>
          <Image
            style={{width: 200, height: 200}}
            source={{
              uri: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F1a6130e4-c85d-4e04-a35f-29ca1c3bbe15%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1686925360&t=d80ccdf38db10b5e0939c6f7ecd6317f',
              cache: 'only-if-cached',
            }}
          />
        </View>
        <View>
          {/**npm i -s react-native-fast-image
           * npm config set proxy http://127.0.0.1:10800
           * npm config set https-proxy http://127.0.0.1:10800  安装代理的问题
           */}
          <Text>FastImage</Text>
          <FastImage
            style={{width: 200, height: 200}}
            source={{
              uri: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F1a6130e4-c85d-4e04-a35f-29ca1c3bbe15%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1686925360&t=d80ccdf38db10b5e0939c6f7ecd6317f',
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
