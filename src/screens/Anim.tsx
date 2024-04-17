import React, {useRef} from 'react';
import {Animated, View, Button, StyleSheet, Easing} from 'react-native';

const AnimationExample = () => {
  const decayValue = useRef(new Animated.ValueXY()).current;
  const springValue = useRef(new Animated.Value(1)).current;
  const timingValue = useRef(new Animated.Value(0)).current;

  const startDecayAnimation = () => {
    Animated.decay(decayValue, {
      velocity: {x: 0.5, y: 0},
      deceleration: 0.999,
      useNativeDriver: true,
    }).start();
  };

  const startSpringAnimation = () => {
    Animated.spring(springValue, {
      toValue: 2,
      friction: 5,
      tension: 50,
      useNativeDriver: true,
    }).start();
  };

  const startTimingAnimation = () => {
    Animated.timing(timingValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.box, {transform: decayValue.getTranslateTransform()}]}
      />
      <Button title="Start Decay Animation" onPress={startDecayAnimation} />

      <Animated.View
        style={[styles.box, {transform: [{scale: springValue}]}]}
      />
      <Button title="Start Spring Animation" onPress={startSpringAnimation} />

      <Animated.View style={[styles.box, {opacity: timingValue}]} />
      <Button title="Start Timing Animation" onPress={startTimingAnimation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});

export default AnimationExample;
