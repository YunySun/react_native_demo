/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-05-13 14:19:59
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-06-17 22:11:54
 * @Profile: 一个比较废柴的前端开发
 */
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'react-native-reanimated/plugin',
      {
        relativeSourceLocation: true,
      },
    ],
  ],
};
