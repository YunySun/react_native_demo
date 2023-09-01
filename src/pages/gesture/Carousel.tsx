import {FlatList, StyleSheet, View, Text, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';

export default Carousel = () => {
  const width = Dimensions.get('window').width;
  const [loop] = useState(true);

  const [data] = useState([
    {classes: styles.slide1},
    {classes: styles.slide2},
    {classes: styles.slide3},
    // {classes: styles.slide4},
    // {classes: styles.slide5},
    // {classes: styles.slide6},
    // {classes: styles.slide7},
  ]);

  useEffect(() => {}, []);

  const renderItem = ({item, index}) => {
    return (
      <View style={[item.classes, {width: width, height: 300}]}>
        <Text>{index}</Text>
      </View>
    );
  };

  const handleScrollEnd = event => {
    console.log(event.nativeEvent);
  };

  return (
    <FlatList
      horizontal
      data={loop ? [data[data.length - 1], ...data, data[0]] : data}
      renderItem={renderItem}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      onScrollEndDrag={handleScrollEnd}
      snapToInterval={width}
    />
  );
};

const styles = StyleSheet.create({
  slide1: {
    backgroundColor: 'red',
  },
  slide2: {
    backgroundColor: 'orange',
  },
  slide3: {
    backgroundColor: 'yellow',
  },
  slide4: {
    backgroundColor: 'green',
  },
  slide5: {
    backgroundColor: 'purple',
  },
  slide6: {
    backgroundColor: 'lightblue',
  },
  slide7: {
    backgroundColor: 'lightgreen',
  },
});
