import {Alert, Button, StyleSheet, View} from 'react-native';
import Text from '../Components/Text';
import {useState} from 'react';

/*
 * @Description:
 * @Author: 虾饺
 * @Date: 2023-05-20 22:51:09
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-22 22:06:54
 * @Profile: 一个比较废柴的前端开发
 */
export default function Game() {
  enum GameStatus {
    PLAYER1 = 'O',
    PLAYER2 = 'X',
    NOPLAYER = '',
  }
  const defaultCheckerBoard: string[] = Array(9).fill(GameStatus.NOPLAYER);
  let [nowPlayer, setPlayer] = useState<GameStatus>(GameStatus.PLAYER1);
  const [checkerboard, setCheckerboard] =
    useState<string[]>(defaultCheckerBoard);
  // 添加一个计数器 用于记录当前下棋的棋子数量
  const [chessmanCount, setChessmanCount] = useState<number>(0);

  function updatePlayer() {
    setPlayer(
      nowPlayer === GameStatus.PLAYER1
        ? GameStatus.PLAYER2
        : GameStatus.PLAYER1,
    );
  }

  // 胜者
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // 判断当前游戏胜利者
  function checkWinner(array: string[], count: number) {
    if (count === 4) {
      return;
    }
    // 123 456 789 147 258 369 159 357
    for (let i = 0, len = winPatterns.length; i < len; i++) {
      const [a, b, c] = winPatterns[i];
      // console.log(a, b, c);
      // console.log(checkerboard[a], checkerboard[b], checkerboard[c]);
      // console.log(checkerboard);
      if (
        array[a] !== GameStatus.NOPLAYER &&
        array[a] === array[b] &&
        array[a] === array[c]
      ) {
        Alert.alert('胜者是：' + array[a]);
        return;
      }
    }

    if (count === 9) {
      Alert.alert('没有胜者');
      return;
    }
  }

  function handleChess(index: number) {
    if (checkerboard[index] === GameStatus.NOPLAYER) {
      const updatedCheckerboard = [...checkerboard]; // 创建一个新的数组副本
      updatedCheckerboard[index] = nowPlayer; // 更新副本中的值
      console.log(updatedCheckerboard);
      setCheckerboard(updatedCheckerboard); // 更新状态值为新的副本
      updatePlayer();
      const count = chessmanCount + 1;
      setChessmanCount(count);
      checkWinner(updatedCheckerboard, count);
    } else {
      Alert.alert('当前位置已下过棋子');
    }
  }

  return (
    <View>
      <View style={styles.wrapper}>
        {checkerboard.map((chessman, index) => {
          return (
            <Text
              style={styles.button}
              key={index}
              onPress={() => {
                handleChess(index);
              }}>
              {chessman === GameStatus.NOPLAYER ? index + 1 : chessman}
            </Text>
          );
        })}
      </View>
      <View style={{marginVertical: 10}}>
        <Text>
          当前玩家是: {nowPlayer === GameStatus.PLAYER1 ? 'PLAYER1' : 'PLAYER2'}
        </Text>
      </View>
      <View style={{width: 100}}>
        <Button
          title="重开一局"
          onPress={() => {
            setCheckerboard(defaultCheckerBoard);
            setPlayer(GameStatus.PLAYER1);
            setChessmanCount(0);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 271,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 0.5,
  },
  button: {
    color: '#000',
    width: 90,
    height: 90,
    textAlign: 'center',
    lineHeight: 30,
    borderWidth: 0.5,
    fontSize: 24,
  },
});
