import Text from '../Components/Text';
import {View, Button} from 'react-native';
/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-05-27 11:32:15
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-27 12:12:53
 * @Profile: 一个比较废柴的前端开发
 */
export default function DetailsScreen({route, navigation}) {
  const {itemId, otherParams, query} = route.params;
  console.log(itemId, otherParams, query);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParams: {JSON.stringify(otherParams)}</Text>
      <Text>query: {JSON.stringify(query)}</Text>
      <Button
        title="Updating params"
        onPress={() => {
          navigation.setParams({
            query: 'someText',
          });
        }}
      />
      <Button
        title="Go to Details... again"
        onPress={() => {
          //   navigation.navigate('Details');
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          });
        }}
      />
      <Button
        title="Go to Home"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
      <Button
        title="Go back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
}
