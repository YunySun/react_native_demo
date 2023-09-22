import React from 'react';
import {StyleSheet, View} from 'react-native';

import ColorPicker, {HueSlider, Panel1, Panel5} from 'reanimated-color-picker';
import MyCustomThumb from './MyCustomThumb';

export default function ColorTest() {
  const onSelectColor = ({hex}) => {
    // do something with the selected color.
    console.log(hex);
  };

  return (
    <View style={styles.container}>
      <ColorPicker
        style={{width: '70%'}}
        value="red"
        onComplete={onSelectColor}>
        {/*<Preview />*/}
        <Panel1 />
        <HueSlider
          style={{marginTop: 10}}
          sliderThickness={10}
          thumbShape="circle"
          thumbSize={20}
          boundedThumb
          renderThumb={({
            adaptiveColor,
            height,
            width,
            positionStyle,
            currentColor,
          }) => (
            <MyCustomThumb
              adaptiveColor={adaptiveColor}
              positionStyle={positionStyle}
              width={width}
              height={height}
              currentColor={currentColor}
              initialColor="red"
            />
          )}
        />
        {/*<OpacitySlider />*/}
        {/*<Swatches />*/}
        <Panel5 />
      </ColorPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
