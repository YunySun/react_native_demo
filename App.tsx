import {GestureHandlerRootView} from 'react-native-gesture-handler';
import NotifService from './src/utils/NotifService';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';

import {Alert, Button, NativeAppEventEmitter} from 'react-native';
import {useEffect} from 'react';

// 查看被占用的端口
// netstat -nao|findstr 8081
// 关闭占用的端口
// taskkill /F /PID 1048

export default function App() {
  const onRegister = token => {
    Alert.alert('Registered !', JSON.stringify(token));
    console.log('token: ', token);
    // this.setState({registerToken: token.token, gcmRegistered: true});
  };

  const onNotif = notif => {
    console.log(notif);
    // Alert.alert(notif.title, notif.message);
  };
  const notif = new NotifService(onRegister, onNotif);

  notif.checkPermission(data => {
    console.log(data);
  });

  useEffect(() => {
    var receiveRemoteNotificationSub = NativeAppEventEmitter.addListener(
      'receiveRemoteNotification',
      notification => {
        switch (notification.type) {
          case 'cid':
            console.log('初始化获取到cid' + JSON.stringify(notification));
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

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'test-channel',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Test body',
      subtitle: 'subTitle',
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'test-channel',
          launchActivity: 'default',
        },
      },
    });
  }

  // notifee.onBackgroundEvent(async ({type, detail}) => {
  //   const {notification, pressAction} = detail;
  //
  //   // Check if the user pressed the "Mark as read" action
  //   if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
  //     // Update external API
  //     // await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
  //     //   method: 'POST',
  //     // });
  //     //
  //     // // Remove the notification
  //     // await notifee.cancelNotification(notification.id);
  //   }
  // });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {/*<Carousel />*/}
      {/*<VideoTest />*/}
      {/*<CustomVideo />*/}
      <Button
        title={'Local Notification (now)'}
        onPress={() => {
          notif.localNotif();
        }}
      />
      <Button
        title="Display Notification"
        onPress={() => onDisplayNotification()}
      />
    </GestureHandlerRootView>
  );
}
