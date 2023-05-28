import Text from '../Components/Text';
import {View, Button} from 'react-native';

export default function My({route, navigation}) {
  return (
    <View>
      <Text>这是我的页面</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate('Details', {
            itemId: 86,
            otherParams: 'anything you want here -- feed',
          });
        }}
      />
    </View>
  );
}
