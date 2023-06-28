import {View, StyleSheet, Dimensions, Platform} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
export default function ScrollAnimatedDemo() {
  const transY = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  const windowH = Dimensions.get('window').height;
  const height = Platform.OS === 'web' ? windowH : undefined;

  const handleScroll = useAnimatedScrollHandler({
    onScroll: event => {
      console.log(event.contentOffset.y);
      transY.value = event.contentOffset.y;
    },
    onBeginDrag: () => {
      isScrolling.value = true;
    },
    onEndDrag: () => {
      isScrolling.value = false;
    },
  });

  const stylez = useAnimatedStyle(() => {
    const size = isScrolling.value ? 80 : 40;
    return {
      transform: [{translateY: transY.value}],
      width: withSpring(size),
      height: withSpring(size),
    };
  });

  return (
    <View style={styles.container}>
      <View style={[styles.half, {height, backgroundColor: 'red'}]}>
        <Animated.View style={[styles.box, stylez]} />
      </View>
      <View style={[styles.half, {height, backgroundColor: 'green'}]}>
        <Animated.ScrollView
          style={styles.scroll}
          scrollEventThrottle={1}
          onScroll={handleScroll}>
          <View style={styles.placeholder} />
          <View style={styles.placeholder} />
          <View style={styles.placeholder} />
          <View style={styles.placeholder} />
          <View style={styles.placeholder} />
          <View style={styles.placeholder} />
        </Animated.ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  half: {
    flex: 1,
    overflow: 'hidden',
  },
  scroll: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  box: {
    alignSelf: 'center',
    backgroundColor: 'black',
  },
  placeholder: {
    width: 40,
    height: 40,
    backgroundColor: 'lightskyblue',
    marginVertical: 300,
  },
});
