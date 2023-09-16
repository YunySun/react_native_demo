import {GestureHandlerRootView} from 'react-native-gesture-handler';
import NotifService from './src/utils/NotifService';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';

import {Alert, Button, NativeAppEventEmitter, Text, View} from 'react-native';
import {useEffect} from 'react';
import TextSize from 'react-native-text-size';
import pxToDp from './src/utils/pxToDp';

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

  const text =
    '这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容';

  console.log(text.length);

  // useEffect(() => {
  //   calculateText(text);
  // }, []);

  const arr = [];
  const numImages = Math.ceil(300 / 20);
  const imageWidth = pxToDp(200);
  // 如果文案超出图片区域，创建新的图片
  console.log(pxToDp(200)); // 设置图片宽度
  // const imageHeight = 100; // 设置图片高度
  const calculateText = async (textF: string) => {
    // 测量文案尺寸
    const textSize = await TextSize.measure({
      text: textF,
      fontSize: pxToDp(16), // 设置文案字体大小
      width: imageWidth,
    });

    if (textSize.lineCount > numImages) {
      const testArr = await substringText(textF);
      console.log('testArr: ', testArr);
      return testArr;
    }
    return textF;
  };

  const handleCalculate = async () => {
    const res = await calculateText(text);
    console.log('res:', res);
  };

  const substringText = async textF => {
    const textSize = await TextSize.measure({
      text: textF,
      fontSize: pxToDp(16), // 设置文案字体大小
      width: imageWidth,
      lineInfoForLine: numImages,
    });
    console.log(textSize);

    const a = textF.substring(0, textSize.lineInfo.start);
    arr.push(a);
    const b = textF.substring(textSize.lineInfo.start);
    if (textSize.lineCount / numImages > 2) {
      return await substringText(b);
    } else {
      arr.push(b);
      console.log(arr);
      return arr;
    }
  };

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
      <View
        style={{
          width: pxToDp(200),
          height: pxToDp(300),
        }}>
        <Text style={{lineHeight: pxToDp(20), fontSize: pxToDp(16)}}>
          {text}
        </Text>
      </View>
      <Button title="Get Text" onPress={() => handleCalculate()} />
    </GestureHandlerRootView>
  );
}
