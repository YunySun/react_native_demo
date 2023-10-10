import React, {useState} from 'react';
import {
  Animated,
  PanResponder,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SwipeableListItem = ({item, onDelete}) => {
  const [panResponder, setPanResponder] = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: item.translateX}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50) {
          // 如果滑动距离大于50，执行删除操作
          onDelete();
        } else {
          // 否则，恢复原来的位置
          Animated.spring(item.translateX, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  );

  return (
    <View>
      <Animated.View
        style={{
          transform: [{translateX: item.translateX}],
        }}
        {...panResponder.panHandlers}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: 50,
            backgroundColor: 'red',
          }}>
          <TouchableOpacity onPress={onDelete}>
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 50,
            justifyContent: 'center',
            paddingLeft: 10,
            backgroundColor: 'white',
          }}>
          <Text>{item.text}</Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default SwipeableListItem;
