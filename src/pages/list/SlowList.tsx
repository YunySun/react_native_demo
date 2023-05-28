import {ScrollView} from 'react-native';
import ListItem from './components/ListItem';
/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-05-27 15:28:12
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-27 16:16:45
 * @Profile: 一个比较废柴的前端开发
 */

const NUM_ITEMS = 1000;
function makeContent(nItems: number) {
  return Array(nItems)
    .fill(1)
    .map((_, i) => {
      return <ListItem key={i} item={{id: i + 1}} />;
    });
}

export default function SlowList() {
  return (
    <ScrollView
      onScroll={e => {
        console.debug(e.nativeEvent.layoutMeasurement);
      }}
      scrollEventThrottle={100}>
      {makeContent(NUM_ITEMS)}
    </ScrollView>
  );
}
