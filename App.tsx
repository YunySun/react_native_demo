import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Carousel from './src/pages/gesture/Carousel';
import SharePage from './src/pages/share';
import ThreeDots from './src/pages/ThreeDot';
import VideoTest from './src/pages/VideoTest';
import CustomVideo from './src/pages/CustomVideo';

import {Alert, NativeAppEventEmitter} from 'react-native';
import {useEffect} from 'react';

export default function App() {
  useEffect(() => {
    var receiveRemoteNotificationSub = NativeAppEventEmitter.addListener(
      'receiveRemoteNotification',
      notification => {
        switch (notification.type) {
          case 'cid':
            // Alert.alert('初始化获取到cid', JSON.stringify(notification));
            break;
          case 'payload':
            Alert.alert('payload 消息通知', JSON.stringify(notification));
            break;
          case 'cmd':
            Alert.alert('cmd 消息通知', 'cmd action = ' + notification.cmd);
            break;
          case 'notificationArrived':
            Alert.alert(
              'notificationArrived 通知到达',
              JSON.stringify(notification),
            );
            break;
          case 'notificationClicked':
            Alert.alert(
              'notificationArrived 通知点击',
              JSON.stringify(notification),
            );
            break;
          default:
            break;
        }
      },
    );

    var clickRemoteNotificationSub = NativeAppEventEmitter.addListener(
      'clickRemoteNotification',
      notification => {
        Alert.alert('点击通知', JSON.stringify(notification));
      },
    );

    return () => {
      receiveRemoteNotificationSub.remove();
      clickRemoteNotificationSub.remove();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {/*<Carousel />*/}
      {/*<VideoTest />*/}
      <CustomVideo />
    </GestureHandlerRootView>
  );
}
