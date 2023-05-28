import {View, Pressable, Button, StyleSheet} from 'react-native';
import Text from '../Components/Text';

export default function DialogScreen({navigation, route}) {
  return (
    <View style={styles.container}>
      <Text style={{color: 'green'}}>我是{route.name}页面</Text>
      <Pressable
        style={styles.backdrop}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.dialog}>
        <Text>这是一个弹窗</Text>
      </View>
      <Button title="我知道了" onPress={navigation.goBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialog: {
    padding: 16,
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
});
