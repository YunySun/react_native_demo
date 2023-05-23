import {View, StyleSheet, Button} from 'react-native';
import Text from '../Components/Text';

/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-05-20 15:59:43
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-20 17:21:00
 * @Profile: 一个比较废柴的前端开发
 */

export default function CartRow({product, handleCalculate}) {
  return (
    <View style={[styles.rowWrapper, styles.flexBetween]}>
      <Text style={[styles.flex1]}>{product.name}</Text>
      <Text style={[styles.flex1, styles.rowCenter]}>{product.price}</Text>
      <View style={[styles.controller, styles.flex1]}>
        <Button
          style={styles.controlColor}
          title="+"
          onPress={() => {
            handleCalculate(product, 'increment');
          }}
        />
        <Text style={[styles.count]}>{product.count}</Text>
        <Button
          style={styles.controlColor}
          title="-"
          onPress={() => {
            handleCalculate(product, 'decrement');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flexBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  rowCenter: {
    textAlign: 'center',
  },
  controller: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  count: {
    width: 30,
    textAlign: 'center',
  },
  controlColor: {
    color: 'skyblue',
  },
  flex1: {
    flex: 1,
  },
});
