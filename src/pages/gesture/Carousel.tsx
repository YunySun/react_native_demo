import {FlatList, StyleSheet} from 'react-native';
import {useState} from 'react';

export default Carousel = () => {
  const data = useState([
    {classes: styles.slide1},
    {classes: styles.slide2},
    {classes: styles.slide3},
    {classes: styles.slide4},
    {classes: styles.slide5},
    {classes: styles.slide6},
    {classes: styles.slide7},
  ]);

  return <FlatList data={} renderItem={} />;
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
