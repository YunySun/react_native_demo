// 底部导航栏 npm install @react-navigation/material-bottom-tabs react-native-paper react-native-vector-icons
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Message from './Message';
import My from './My';
const Tab = createMaterialBottomTabNavigator();

export default function TabHome() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Message" component={Message} />
      <Tab.Screen name="My" component={My} />
    </Tab.Navigator>
  );
}
