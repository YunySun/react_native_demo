import {ShareDialog} from 'react-native-fbsdk-next';
import {Pressable, Text, View} from 'react-native';
import {NativeModules, DeviceEventEmitter} from 'react-native';
import {useEffect} from 'react';
import {encode} from '../../assets/js/mod';

export default function SharePage() {
  useEffect(() => {
    // 监听Twitter分享事件
    DeviceEventEmitter.addListener('TwitterShareEvent', status => {
      console.log('Twitter分享状态:', status);
    });

    const text =
      'http://chatmcdn.wisnovel.com/shareCharacterPage?code=ca615ced31065f007b947ab122d4c2eaec7b51968d84c4ff50f3afe21343ce1f&fbclid=IwAR1vZp0rzOtJfIn-2xTIg-Lf0AGFPc-VzlY6O8APIVXS17IzMXnZMBY2j80';
    console.log(encode(text).length);
  });

  const TwitterShareModule = NativeModules.TwitterShare;

  const handleTwitterShare = () => {
    const text = '这是一条分享到 Twitter 的消息';
    const url =
      'http://chatmcdn.wisnovel.com/shareCharacterPage?code=ca615ced31065f007b947ab122d4c2eaec7b51968d84c4ff50f3afe21343ce1f&fbclid=IwAR1vZp0rzOtJfIn-2xTIg-Lf0AGFPc-VzlY6O8APIVXS17IzMXnZMBY2j80'; // 可选，可以分享一个链接

    try {
      TwitterShareModule.shareToTwitter(text, url);
      // .then(res => {
      //   console.log(res);
      // })
      // .catch(err => {
      //   console.log(err);
      // });
    } catch (error) {
      console.log('分享报错：', error);
    }
  };

  // Build up a shareable link.
  const shareLinkContent = {
    contentType: 'link',
    contentUrl:
      'http://chatmcdn.wisnovel.com/shareCharacterPage?code=ca615ced31065f007b947ab122d4c2eaec7b51968d84c4ff50f3afe21343ce1f&fbclid=IwAR1vZp0rzOtJfIn-2xTIg-Lf0AGFPc-VzlY6O8APIVXS17IzMXnZMBY2j80',
  };

  // ...

  // Share the link using the share dialog.
  function shareLinkWithShareDialog() {
    ShareDialog.canShow(shareLinkContent)
      .then(function (canShow) {
        if (canShow) {
          return ShareDialog.show(shareLinkContent);
        }
      })
      .then(
        function (result) {
          if (result.isCancelled) {
            console.log('Share cancelled');
          } else {
            console.log('Share success with postId: ' + result.postId);
          }
        },
        function (error) {
          console.log('Share fail with error: ' + error);
        },
      );
  }
  return (
    <View>
      <Pressable onPress={shareLinkWithShareDialog}>
        <Text>Facebook Share</Text>
      </Pressable>
      <Pressable onPress={handleTwitterShare}>
        <Text>Twitter Share</Text>
      </Pressable>
    </View>
  );
}
