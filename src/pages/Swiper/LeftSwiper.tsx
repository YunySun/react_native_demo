import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');

export default function LeftSwiper() {
  const Insets = useSafeAreaInsets();
  const Data = [
    {title: '测试1', label: 'label1'},
    {title: '测试2', label: 'label2'},
    {
      title: '测试3',
      label: 'label3',
    },
  ];

  // 跳转任务详情页
  // const HandleTaskBtn = () => {
  //   if (Platform.OS === 'ios') {
  //     navigation.navigate('TaskIos');
  //   } else {
  //     navigation.navigate('TaskAndroid');
  //   }
  // };

  // 定义任务列表左滑的动画效果
  const currentIndex = useRef(null);
  const translateXList = useRef(Data.map(() => new Animated.Value(0))).current;
  const panResponderList = useRef(
    Data.map((_, index) =>
      PanResponder.create({
        onMoveShouldSetPanResponderCapture: (_, g) =>
          Math.abs(g.dx) > 5 || Math.abs(g.dy) < 0,
        onPanResponderRelease: (_, g) => {
          if (g.dx < -40 && g.vx < -0.3) {
            try {
              Animated.timing(translateXList[index], {
                toValue: -(width * 0.3),
                duration: 200,
                useNativeDriver: false,
              }).start();
            } catch (e) {}
            currentIndex.current = index;
          } else if (g.dx > -40 && g.vx > -0.3) {
            try {
              Animated.spring(translateXList[index], {
                toValue: 0,
                useNativeDriver: false,
              }).start();
            } catch (e) {}
            currentIndex.current = null;
          }
        },
        onPanResponderMove: () => {
          console.log(index);
          try {
            if (currentIndex.current != index) {
              Animated.spring(translateXList[currentIndex.current], {
                toValue: 0,
                useNativeDriver: false,
              }).start();
            }
          } catch (e) {}
        },
      }),
    ),
  ).current;

  // 点击删除按钮确认后的回调函数
  const [AlertVisible, setAlertVisible] = useState(false);
  const onConfim = () => {
    setAlertVisible(false);
    // HandleSnackBarShow('删除成功', true);
  };

  return (
    <View style={[{paddingBottom: Insets.bottom}]}>
      {Data.map((item, index) => (
        <Animated.View
          key={index}
          style={[{transform: [{translateX: translateXList[index]}]}]}
          {...panResponderList[index].panHandlers}>
          <View style={styles.task}>
            <View style={styles.text}>
              <View style={styles.title_view}>
                <Text numberOfLines={1} style={styles.title}>
                  {item.title}
                </Text>
                {/*<Ionicons*/}
                {/*  name="alert-circle"*/}
                {/*  size={22}*/}
                {/*  color={item.important == 1 ? '#464646' : '#3F51B5'}*/}
                {/*/>*/}
              </View>
              <Text numberOfLines={2} style={styles.content}>
                {item.label}
              </Text>
              <View style={styles.progress_view}>
                <View style={styles.progressContainer} />
                <View style={styles.progress}>
                  <Text style={styles.progress_item}>进度</Text>
                  <Text style={styles.progress_item}>待开始</Text>
                </View>
              </View>
            </View>
            <View style={styles.task_btn}>
              <TouchableOpacity>
                <View style={styles.update}>
                  <Text>跳转</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.delete}>
                  <Text>删除</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  task_btn: {
    width: width * 0.3,
    height: 155,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  delete: {
    width: 40,
    height: 40,
    backgroundColor: '#8c7ae6',
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  update: {
    width: 40,
    height: 40,
    backgroundColor: '#E4CE00',
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: '100%',
    height: 155,
    backgroundColor: '#2C2C2C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingTop: 25,
    paddingHorizontal: 30,
    marginBottom: 10,
    borderRadius: 20,
  },
  title_view: {
    width: '100%',
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    width: '90%',
    fontSize: 15,
    color: '#ffffff',
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'justify',
  },
  content: {
    width: '100%',
    fontSize: 12,
    color: '#9c9c9c',
    textAlign: 'justify',
    paddingBottom: 10,
  },
  progressContainer: {
    width: '100%',
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#232323',
  },
  progress_view: {
    width: '100%',
  },
  progress: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progress_item: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
