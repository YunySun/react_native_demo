/*
 * @Description:自定义原生组件Text
 * @Author: 虾饺
 * @Date: 2023-05-20 16:43:17
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-20 16:57:25
 * @Profile: 一个比较废柴的前端开发
 */

import {Text as NativeText} from 'react-native';

const defaultStyle = {
  color: '#000',
  includeFontPadding: false,
  textAlignVertical: 'center',
  lineHeight: 20,
};

export default function Text({style, ...props}) {
  const mergeStyle = [defaultStyle, style];
  return <NativeText style={mergeStyle} {...props} />;
}
