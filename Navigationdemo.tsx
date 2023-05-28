/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-05-24 15:53:41
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-27 15:17:42
 * @Profile: 一个比较废柴的前端开发
 */
import Text from './src/Components/Text';
import {
  ScrollView,
  SafeAreaView,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';

// npm i -s react-native-responsive-screen 适配
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
import {NavigationContainer} from '@react-navigation/native';
// npm install @react-navigation/native 导航栏
// npm install react-native-screens react-native-safe-area-context 导航栏后需要安装
// ios端需要npx pod-install ios

// 安卓端需要android/app/src/main/java/<your package name>/MainActivity.java
// public class MainActivity extends ReactActivity {
//   // ...
//   @Override
//   protected void onCreate(Bundle savedInstanceState) {
//     super.onCreate(null);
//   }
//   // ...
// }

// 并且头部添加 import android.os.Bundle;

// 使用Native Stack Navigator npm install @react-navigation/native-stack

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Discover from './src/pages/Discover';
import Detail from './src/pages/Detail';
import {createContext} from 'react';
import HomeScreen from './src/pages/HomeScreen';
import TabHome from './src/pages/TabHome';
import DetailsScreen from './src/pages/DetailsScreen';
import CreatePostScreen from './src/pages/CreatePostScreen';
import DialogScreen from './src/pages/DialogScreen';

const Stack = createNativeStackNavigator();

export const AnimalContext = createContext([]);

export default function App() {
  const animals = [
    {
      describe: '一只小猫咪',
      image: require('./src/assets/images/cat_01.jpg'),
      price: 10,
      id: 1,
    },
    {
      describe: '另一只猫咪',
      image: require('./src/assets/images/cat_02.jpg'),
      price: 20,
      id: 2,
    },
    {
      describe: '其他的小猫咪',
      image: require('./src/assets/images/cat_03.jpg'),
      price: 30,
      id: 3,
    },
  ];
  return (
    <AnimalContext.Provider value={animals}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: 'blue',
            },
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: 'normal',
              color: '#fff',
            },
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Overview'}}
          />
          <Stack.Screen
            name="Details"
            initialParams={{itemId: 42}}
            component={DetailsScreen}
          />
          <Stack.Screen
            name="Modal"
            component={DialogScreen}
            options={{
              presentation: 'transparentModal',
              animation: 'fade',
              headerShown: false,
            }}
          />
          <Stack.Screen name="CreatePost" component={CreatePostScreen} />
          <Stack.Screen name="Discover" component={Discover} />
          <Stack.Screen name="TabHome" component={TabHome} />
          <Stack.Screen
            name="Detail"
            component={Detail}
            initialParams={{...animals[0], ...{symbol: '$'}}}
            options={({route}) => ({
              headerStyle: {
                backgroundColor: 'green',
              },
              // headerTitleStyle: {fontSize: 20, fontWeight: 'bold'},
              title: 'test' || route.params.describe,
              // headerTintColor: 'red',
              // 其他导航栏选项...
              headerShown: false,
              statusBarHidden: true,
              headerRight: () => (
                <Pressable onPress={() => console.log('Custom Button Pressed')}>
                  <Text style={{color: 'white', marginRight: 10}}>
                    Custom Button
                  </Text>
                </Pressable>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AnimalContext.Provider>
  );
}
