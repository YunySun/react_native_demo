import {Button, View} from 'react-native';
import React from 'react';
import RNFS from 'react-native-fs'; // 用于文件操作
import {unzip} from 'react-native-zip-archive'; // 用于解压zip文件
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

export default function MyDownLoad() {
  function readFont() {
    const directoryPath = `${RNFS.DocumentDirectoryPath}/downloads`; // 替换为你要查看的目录路径

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
        console.log('Directory Read Error:', error);
      });
  }

  readFont();
  // 下载zip文件
  const downloadZipFile = async () => {
    const url = 'http://192.168.8.31/download.zip';
    const downloadFolderPath =
      RNFS.DocumentDirectoryPath + `/downloads/${new Date().getTime()}/`;
    const zipFilePath = `${downloadFolderPath}/downloaded.zip`;

    try {
      // 创建目标文件夹（如果不存在）
      await RNFS.mkdir(downloadFolderPath, {
        NSURLIsExcludedFromBackupKey: true,
      });

      const response = await RNFS.downloadFile({
        fromUrl: url,
        toFile: zipFilePath,
        begin: res => {
          console.log('begin res:', res);
        },
        progress: res => {
          console.log('res:', res);
        },
      }).promise;
      console.log(response);
      if (response.statusCode === 200) {
        // 解压zip文件
        const unzipPath = RNFS.DocumentDirectoryPath + '/unzipped/';
        const res = await unzip(zipFilePath, unzipPath);
        console.log('unzip res:', res);

        // 删除原始图片
        await RNFS.unlink(zipFilePath);

        // 移动解压后的图片到相册
        const imagePaths = await RNFS.readDir(unzipPath);
        for (const imagePath of imagePaths) {
          await CameraRoll.save(imagePath.path, {type: 'photo'});
          await RNFS.unlink(imagePath.path); // 删除已移动的图片
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View>
      <Button title="下载" onPress={downloadZipFile} />
    </View>
  );
}
