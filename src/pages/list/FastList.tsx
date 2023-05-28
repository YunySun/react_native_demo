import ListItem from './components/ListItem';
import {FlatList} from 'react-native';

/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-05-27 16:27:00
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-27 18:23:44
 * @Profile: 一个比较废柴的前端开发
 */
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
  const renderItem = ({item}) => {
    return <ListItem item={item} />;
  };

  return (
    <FlatList
      debug={true}
      data={DATA}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      getItemLayout={getItemLayout}
    />
  );
}
