import {Pressable} from 'react-native';
import Text from '../../../Components/Text';
import {Styles} from '../Styles';

export default function ListItem({item}) {
  console.debug('render item: ', item.id);
  return (
    <Pressable
      onLayout={() => {
        console.debug('layout: ', item.id);
      }}
      style={[Styles.itemWrapper]}>
      <Text>{item.id}</Text>
    </Pressable>
  );
}
