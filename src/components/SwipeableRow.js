import React from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';

const SwipeableRow = ({ children }) => {
  const translateX = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({ translationX }) => {
      translateX.value = translationX;
    },
  });
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={style}>{children}</Animated.View>
    </PanGestureHandler>
  );
};

export default SwipeableRow;
