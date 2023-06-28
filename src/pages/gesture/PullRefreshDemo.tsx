import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

export default function PullRefreshDemo() {
  const LOADING_H = 60;
  const {height: windowH} = useWindowDimensions();
  const wrapperH = LOADING_H + windowH;

  // 拖拽偏移来控制整体的视图也就是Animated.View的纵轴偏移量  所以他的loading图标占位需要隐藏
  const overallOffsetY = useSharedValue(-LOADING_H);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: overallOffsetY.value}],
    };
  });

  const scrollY = useSharedValue(0);

  // hack: 使用 tapGesture 手势作为控制 scrollGesture 是否执行动画的开关
  const tapGesture = Gesture.Tap()
    .onTouchesMove((_, manager) => {
      // 如果ScrollView容器没有顶到屏幕顶部
      if (LOADING_H + overallOffsetY.value === 0) {
        // 设置Tap手势为FAILED
        manager.fail();
      } else {
        // 其他情况则设置为ACTIVE 因为tap手势触发了 所以内部也会调用
        manager.activate();
      }
    })
    .maxDuration(1000000);
  const scrollGesture = Gesture.Native()
    // requireExternalGestureToFail
    // 当Tap手势内部状态为ACTIVE 时，滚动动画不执行
    // 当Tap手势内部状态为FAILED时，滚动动画执行
    .requireExternalGestureToFail(tapGesture);
  // 手势的拖拽事件
  const panGesture = Gesture.Pan()
    // 响应panGesture手势时，可以同时响应scrollGesture、tapGesture手势。
    .simultaneousWithExternalGesture(scrollGesture, tapGesture)
    .onChange(e => {
      console.log('拖拽onChange事件： ', e, overallOffsetY.value);
      // 拖拽动画
      if (scrollY.value === 0 || overallOffsetY.value !== -LOADING_H) {
        // 当滚动的位置在0的时候 下拉更新整体视图的偏移
        console.log(
          '滚动的位置是0或者整体的位置不是在-LOADING_H的时候：',
          overallOffsetY.value + e.changeY,
        );
        overallOffsetY.value = Math.max(
          -LOADING_H,
          overallOffsetY.value + e.changeY,
        );
      }
    })
    .onEnd(() => {
      console.log('松手的时候');
      // 松手的时候 如果整体视图的偏离不在正常位置 则恢复
      if (overallOffsetY.value !== -LOADING_H) {
        // 使用弹性动画withSpring回弹到原来的位置
        overallOffsetY.value = withSpring(-LOADING_H, {
          stiffness: 100,
          overshootClamping: true, // 这个默认是false 他会按默认形变的中心线反复回弹 true的话则是到了设定的位置就停止回弹
        });
      }
    });

  const handleScroll = useAnimatedScrollHandler({
    onScroll(e) {
      // 记录偏移值 只读不写
      console.log('handleScroll: ', e);
      scrollY.value = e.contentOffset.y;
    },
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[{height: wrapperH}, animatedStyle]}>
        <View style={[{height: LOADING_H}, style.loadingWrapper]}>
          <Text>loading...</Text>
        </View>
        <GestureDetector
          gesture={Gesture.Simultaneous(scrollGesture, tapGesture)}>
          <Animated.ScrollView
            style={style.scrollViewWrapper}
            bounces={false}
            scrollEventThrottle={1}
            onScroll={handleScroll}>
            {<View style={style.placeholder} />}
            {<View style={style.placeholder} />}
            {<View style={style.placeholder} />}
            {<View style={style.placeholder} />}
            {<View style={style.placeholder} />}
            {<View style={style.placeholder} />}
            {<View style={style.placeholder} />}
            {<View style={style.placeholder} />}
            {<View style={style.placeholder} />}
          </Animated.ScrollView>
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}

const style = StyleSheet.create({
  loadingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
  scrollViewWrapper: {
    backgroundColor: 'lightskyblue',
  },
  placeholder: {
    width: 100,
    height: 100,
    marginVertical: 100,
    backgroundColor: 'red',
  },
});
