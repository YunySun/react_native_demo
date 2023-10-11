import ListItem from './components/ListItem';
import {FlatList, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const NUM_ITEMS = 1000;

function makeContent(nItems: number) {
  return Array(nItems)
    .fill(1)
    .map((_, i) => {
      return {id: i + 1 + ''};
    });
}

function getItemLayout(_, index) {
  return {
    length: 100,
    offset: 100 * index,
    index,
  };
}

const DATA = makeContent(NUM_ITEMS);

export default function FastList() {
  const [refreshing, setRefreshing] = useState(false);
  const renderItem = ({item}) => {
    return <ListItem item={item} />;
  };

  const tapGesture = Gesture.Pan()
    .onStart(() => {})
    .onUpdate(e => {
      console.log(e);
    });

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={{flex: 1}}>
        <FlatList
          debug={true}
          data={DATA}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          refreshControl={
            <View style={{backgroundColor: 'lightgray', padding: 20}}>
              <Text>{refreshing ? '正在刷新...' : '下拉刷新'}</Text>
            </View>
          }
        />
      </Animated.View>
    </GestureDetector>
  );
}

function CustomRefreshControl() {
  return (
    <View style={{flex: 1}}>
      <Text>下拉刷新</Text>
    </View>
  );
}
