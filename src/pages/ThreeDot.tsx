import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

const DotsCycle = () => {
  const dotData = [
    [0, 0, 0], // Initial state
    [1, 0, 0], // After 500ms
    [1, 1, 0], // After 1000ms
    [1, 1, 1], // After 1500ms
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const dotsToShow = dotData[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % dotData.length);
    }, 300); // 2000ms to loop through all stages

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{flexDirection: 'row'}}>
      {dotsToShow.map((opacity, index) => (
        <Text
          key={index}
          style={{fontSize: 24, opacity: opacity === 0 ? 0 : 1}}>
          .
        </Text>
      ))}
    </View>
  );
};

export default DotsCycle;
