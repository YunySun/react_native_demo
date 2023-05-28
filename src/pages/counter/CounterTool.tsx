import {counterSlice} from '../../../App';
import Text from '../../Components/Text';
import {View, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

export default function CounterTool() {
  const counter = useSelector(state => state.counter.value);

  const dispatch = useDispatch();

  function handleAddPress() {
    dispatch(counterSlice.actions.increment(10));
  }

  function handleMinusPress() {
    dispatch(counterSlice.actions.increment(-10));
  }
  return (
    <View>
      <Pressable onPress={handleMinusPress}>
        <Text>-</Text>
      </Pressable>
      <Text>{counter}</Text>
      <Pressable onPress={handleAddPress}>
        <Text>+</Text>
      </Pressable>
    </View>
  );
}
