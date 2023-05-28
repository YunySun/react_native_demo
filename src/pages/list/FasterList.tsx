/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-05-27 16:45:58
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-27 17:45:28
 * @Profile: 一个比较废柴的前端开发
 */
import {Dimensions, ScaledSize} from 'react-native';
import ListItem from './components/ListItem';

// npm install --save recyclerlistview
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

const NUM_ITEMS = 1000;
function makeContent(nItems: number) {
  return Array(nItems)
    .fill(1)
    .map((_, i) => {
      return {id: i + 1 + ''};
    });
}

const DATA = makeContent(NUM_ITEMS);

export default function FasterList() {
  let {width} = Dimensions.get('window');

  const dataProvide = new DataProvider((r1, r2) => {
    return r1.id !== r2.id;
  }).cloneWithRows(DATA);

  function rowRenderer(_, data) {
    return <ListItem item={data} />;
  }

  const layoutProvider = new LayoutProvider(
    () => 'nothing',
    (_, dim) => {
      dim.width = width;
      dim.height = 100;
    },
  );

  return (
    <RecyclerListView
      dataProvider={dataProvide}
      layoutProvider={layoutProvider}
      rowRenderer={rowRenderer}
    />
  );
}
