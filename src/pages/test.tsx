import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

const DotsCycle = () => {
  const [visibleIndex, setVisibleIndex] = useState(0); // 控制当前可见元素的索引

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex(prevIndex => (prevIndex + 1) % 3); // 在0、1、2之间切换
    }, 1500); // 每1500ms切换一次

    return () => clearInterval(interval); // 清除定时器
  }, []);

  const dotStyles = [
    {fontSize: 24, opacity: visibleIndex === 0 ? 1 : 0},
    {fontSize: 24, opacity: visibleIndex === 1 ? 1 : 0},
    {fontSize: 24, opacity: visibleIndex === 2 ? 1 : 0},
  ];

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Text style={dotStyles[0]}>.</Text>
        <Text style={dotStyles[1]}>.</Text>
        <Text style={dotStyles[2]}>.</Text>
      </View>
    </View>
  );
};

export default DotsCycle;
