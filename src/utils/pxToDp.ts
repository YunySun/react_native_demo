/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-05-26 20:41:11
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-26 20:55:57
 * @Profile: 一个比较废柴的前端开发
 */
import { Dimensions } from 'react-native';

// 竖屏模式
const deviceWidthDp = Dimensions.get('window').width;
// UI默认给图像素设置为640
const uiWidthPx = 360;

function pxToDp(uiElementPx) {
    return (uiElementPx * deviceWidthDp) / uiWidthPx;
}

export default pxToDp;
