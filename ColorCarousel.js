import React, { useState } from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import styles from "./styles";

const fakeColors = ["lightblue", "coral", "salmon", "dodgerblue"];
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const scrollTopMax = -1 * (fakeColors.length - 1) * windowHeight;
function ColorCarousel({ setWelcome }) {
  const [scroll, setScroll] = useState(0);
  const onScroll = (direction) => {
    if (direction === "up" && scroll < 0) {
      setScroll((s) => s + windowHeight);
      console.log(scroll);
    } else if (direction === "down" && scroll > scrollTopMax) {
      setScroll((s) => s - windowHeight);
    }
  };
  const colorScroll = fakeColors.map((color) => (
    <View
      key={color}
      style={{
        zIndex: -1,
        backgroundColor: color,
        width: windowWidth,
        height: windowHeight,
      }}
    />
  ));
  return (
    <View style={styles.colorScrollContainer}>
      <View
        style={{
          position: "absolute",
          top: scroll,
          height: windowHeight,
          width: windowWidth,
        }}
      >
        {colorScroll}
      </View>
      <Pressable style={styles.scrollUpButton} onPress={() => onScroll("up")}>
        <Text>Up</Text>
      </Pressable>
      <Pressable
        style={styles.scrollDownButton}
        onPress={() => onScroll("down")}
      >
        <Text>DOWN</Text>
      </Pressable>
      {/* <Pressable style={styles.stopButton} onPress={() => setWelcome(true)}>
        <Text>Stop</Text>
      </Pressable> */}
    </View>
  );
}

export default ColorCarousel;
