import React, { useState, useEffect } from "react";
import { Animated } from "react-native";

const FloatingEmoji = ({ emoji, size }) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    animateEmoji();
  }, []);

  const animateEmoji = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: -5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  return (
    <Animated.Text
      style={{
        fontSize: size,
        transform: [{ translateY: animation }],
      }}
    >
      {emoji}
    </Animated.Text>
  );
};

export default FloatingEmoji;
