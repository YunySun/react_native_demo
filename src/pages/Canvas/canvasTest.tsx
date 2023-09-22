import React, {useRef, useState} from 'react';
import {Button, Image, Text, View} from 'react-native';

import {captureRef} from 'react-native-view-shot';

export default function CanvasTest() {
  // const [url, setUrl] = useState<string>();
  // const canvasRef = useRef();
  //
  // const drawCanvas = async canvas => {
  //   // 设置 Canvas 的宽度和高度
  //   canvas.width = 1080;
  //   canvas.height = 500;
  //
  //   // 在画布上绘制紫色矩形
  //   const ctx = canvas.getContext('2d');
  //   ctx.fillStyle = 'purple';
  //   ctx.imageSmoothingEnabled = true;
  //   ctx.fillRect(0, 0, 1080, 500);
  //
  //   // 设置文本样式
  //   ctx.font = '100px Arial'; // 设置字体和字号
  //   ctx.fillStyle = 'blue'; // 设置文本颜色
  //
  //   // 绘制文本
  //   ctx.fillText(
  //     '这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容',
  //     50,
  //     50,
  //   ); // 文本内容和位置 (x, y)
  //
  //   // 将画布渲染为图像并更新状态
  //   const dataUrl = await canvas.toDataURL('image/jpeg', 0.7);
  //   console.log('dataURL:', dataUrl);
  //   setUrl(() => dataUrl.replace(/^"|"$/g, ''));
  // };

  const willCaptureRef = useRef();
  const [img, setImage] = useState<string>();
  const handleShareCapture = () => {
    captureRef(willCaptureRef, {
      format: 'jpg',
      quality: 1,
      result: 'base64',
      width: 1080,
      height: 900,
    }).then(
      async uri => {
        // console.log(uri);
        setImage(() => 'data:image/png;base64,' + uri);
        // console.log('Image saved to', img);
      },
      error => console.error('Oops, snapshot failed', error),
    );
  };

  return (
    <View>
      <View>
        <Button title={'Generate Image'} onPress={handleShareCapture} />
        {/* 创建一个不可见的 Canvas */}
        {/*<Canvas ref={canvasRef} style={{display: 'none'}} />*/}

        {/*<Button*/}
        {/*  title={'Generate Image'}*/}
        {/*  onPress={() => {*/}
        {/*    if (canvasRef.current) {*/}
        {/*      drawCanvas(canvasRef.current);*/}
        {/*    }*/}
        {/*  }}*/}
        {/*/>*/}

        {img && (
          <Image
            style={{width: '100%', height: 500}}
            resizeMode="contain"
            source={{uri: img}}
          />
        )}
      </View>
      <View style={{marginTop: 1000}}>
        <View
          style={{backgroundColor: '#fff'}}
          width={1080}
          height={900}
          ref={willCaptureRef}>
          <Text>
            111这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案这是一段文案
          </Text>
        </View>
      </View>
    </View>
  );
}
