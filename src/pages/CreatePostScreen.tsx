/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-05-27 11:37:42
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-27 11:54:07
 * @Profile: 一个比较废柴的前端开发
 */
import {useState} from 'react';
import {TextInput, Button} from 'react-native';

export default function CreatePostScreen({navigation, route}) {
  const [postText, setPostText] = useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="what's on your mind?"
        style={{height: 200, padding: 10, backgroundColor: '#fff'}}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // 合并内容到home screen
          navigation.navigate({
            name: 'Home',
            params: {
              post: postText,
            },
            merge: true,
          });
        }}
      />
    </>
  );
}
