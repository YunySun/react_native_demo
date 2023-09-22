import {GestureHandlerRootView} from 'react-native-gesture-handler';
import NotifService from './src/utils/NotifService';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {
  Alert,
  Button,
  NativeAppEventEmitter,
  StyleSheet,
  Text,
} from 'react-native';
import {useEffect, useState} from 'react';
import TextSize from 'react-native-text-size';
import RNFS from 'react-native-fs';

// 查看被占用的端口
// netstat -nao|findstr 8081
// 关闭占用的端口
// taskkill /F /PID 1048

export default function App() {
  const [fontPath, setFontPath] = useState('');

  function readFont() {
    const directoryPath = `${RNFS.DocumentDirectoryPath}/fonts/`; // 替换为你要查看的目录路径

    RNFS.readDir(directoryPath)
      .then(result => {
        console.log('Directory Listing:', result);

        // 遍历目录下的文件
        result.forEach(file => {
          console.log('File Name:', file.name);
          console.log('File Size (bytes):', file.size);
          console.log('File Modification Date:', file.mtime);
          // if (file.name === 'test.ttf') {
          //   setFontPath(`${directoryPath}test`);
          // }
        });
      })
      .catch(error => {
        console.error('Directory Read Error:', error);
      });
  }

  readFont();

  const downloadFile = async () => {
    const fileUrl = 'http://192.168.8.31/QianTuMaKeShouXie.ttf'; // 文件的URL
    const downloadDest = `${RNFS.DocumentDirectoryPath}/fonts/`; // 下载目标文件夹路径（自定义）
    // const newFileName = 'test.ttf'; // 新文件名（包括文件扩展名）

    const fontLocalPath = `${RNFS.DocumentDirectoryPath}/fonts/QianTuMaKeShouXie.ttf`;
    // const response = await fetch(
    //   'http://www.hongshutest.com:8000/QianTuMaKeShouXie.ttf',
    // );

    console.log('==download==');
    try {
      const response = await fetch(fileUrl);

      console.log('response:', response);
      if (!response.ok) {
        throw new Error('Download failed.');
      }

      // const arrayBuffer = await response.arrayBuffer();

      console.log('downloadDest:', downloadDest);

      // const fontLocalPath = `${RNFS.DocumentDirectoryPath}${newFileName}`;

      // const base64 = Buffer.from(arrayBuffer).toString('base64');
      //
      // await RNFS.writeFile(fontLocalPath, base64, 'base64');
      //
      // setFontPath(fontLocalPath);

      const fileContent = await response.blob();
      const reader = new FileReader();

      reader.onload = async () => {
        console.log('Download Start', `File saved to: ${downloadDest}`);
        const base64Data = reader.result.split(',')[1]; // 从数据URL中提取base64数据部分

        // 检查目标文件夹是否存在，如果不存在则创建它
        if (!(await RNFS.exists(downloadDest))) {
          await RNFS.mkdir(downloadDest);
        }
        await RNFS.writeFile(fontLocalPath, base64Data, 'base64');
        console.log('Download Complete', `File saved to: ${fontLocalPath}`);
        setFontPath(() => fontLocalPath);
      };
      //
      reader.readAsDataURL(fileContent);
    } catch (error) {
      console.error('File download error:', error);
    }
  };

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
    '这是一段内容这是一段内容这是一段内容这是一1231232131asdsaodiasdasdioaudaiduaiouasoiduiasod段内容这lsakdla;kdla;klakdl;ask;ldkd;lkal;akdasmmdas,.sss是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容';

  console.log(text.length);

  // useEffect(() => {
  //   calculateText(text);
  // }, []);

  const arr = [];
  const numImages = Math.ceil(300 / 20);
  const imageWidth = 200;
  // 如果文案超出图片区域，创建新的图片
  // console.log(pxToDp(200)); // 设置图片宽度
  // const imageHeight = 100; // 设置图片高度
  const calculateText = async (textF: string) => {
    // 测量文案尺寸
    const textSize = await TextSize.measure({
      text: textF,
      fontSize: 16, // 设置文案字体大小
      width: imageWidth,
      fontFamily: 'QianTuMaKeShouXie',
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
      fontSize: 16, // 设置文案字体大小
      width: imageWidth,
      lineInfoForLine: numImages,
      fontFamily: 'QianTuMaKeShouXie',
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
      {/*<Button*/}
      {/*  title={'Local Notification (now)'}*/}
      {/*  onPress={() => {*/}
      {/*    notif.localNotif();*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<Button*/}
      {/*  title="Display Notification"*/}
      {/*  onPress={() => onDisplayNotification()}*/}
      {/*/>*/}
      <Text style={styles.text}>{text}</Text>

      <Button title={'Calculate'} onPress={() => handleCalculate()} />

      <Button title={'Download'} onPress={() => downloadFile()} />
      <Text>{fontPath}</Text>
      <Text style={{fontFamily: fontPath}}>{text}</Text>
      {/*<CanvasTest />*/}
      {/*<ColorTest />*/}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  text: {
    width: 200,
    height: 300,
    fontFamily: 'QianTuMaKeShouXie',
    fontSize: 16,
    lineHeight: 20,
  },
  // test: {fontFamily: '千图马克手写体'},
});
