import React, { useState, useRef, useEffect } from "react";
import { Animated, View, Text, Pressable, Dimensions } from "react-native";
import styles from "./styles";
import { AntDesign, Feather } from "react-native-vector-icons";

const fakeColors = [
  { name: "lightblue", hex: "#add8e6" },
  { name: "coral", hex: "#ff7f50" },
  { name: "salmon", hex: "#fa8072" },
  { name: "dodgerblue", hex: "#1e90ff" },
];
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const scrollTopMax = -1 * (fakeColors.length - 1) * windowHeight;
function ColorCarousel({ setWelcome }) {
  const scroll = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  // const [scroll, setScroll] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [showHex, setShowHex] = useState(false);

  const toggleHex = () => {
    setShowHex((hex) => !hex);
  };
  const onScrollUp = () => {
    if (scrollIndex < 0) {
      setScrollIndex((index) => index + 1);
    }
  };
  const onScrollDown = () => {
    if (scrollIndex > -fakeColors.length + 1) {
      setScrollIndex((index) => index - 1);
    }
  };
  useEffect(() => {
    Animated.timing(scroll, {
      toValue: windowHeight * scrollIndex,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [scrollIndex]);
  const colorScroll = fakeColors.map((color) => {
    var num = parseInt(color.hex.slice(1), 16);
    var r = Math.max((num >> 16) - 35, 0);
    var b = Math.max(((num >> 8) & 0x00ff) - 35, 0);
    var g = Math.max((num & 0x0000ff) - 35, 0);
    var newColor = g | (b << 8) | (r << 16);
    newColor = "#" + newColor.toString(16);
    const label = showHex ? color.hex : color.name;
    return (
      <View
        key={color.hex}
        style={{
          zIndex: -1,
          backgroundColor: color.hex,
          width: windowWidth,
          height: windowHeight,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text onPress={toggleHex} style={{ color: newColor, fontSize: 20 }}>
          {label}
        </Text>
      </View>
    );
  });
  return (
    <View style={styles.colorScrollContainer}>
      <Animated.View
        style={{
          transition: "top 100ms ease 0s",
          position: "absolute",
          top: scroll,
          height: windowHeight,
          width: windowWidth,
        }}
      >
        {colorScroll}
      </Animated.View>
      <Pressable style={styles.scrollUpButton} onPress={onScrollUp}>
        <Text style={{ color: "white" }}>
          <AntDesign name="caretup" />
        </Text>
      </Pressable>
      <Pressable style={styles.scrollDownButton} onPress={onScrollDown}>
        <Text style={{ color: "white" }}>
          <AntDesign name="caretdown" />
        </Text>
      </Pressable>
      <Pressable style={styles.backButton} onPress={() => setWelcome(true)}>
        <AntDesign name="back" size={24} color="white" />
      </Pressable>
      <Pressable
        style={styles.copyButton}
        onPress={() => {
          console.log(fakeColors[-scrollIndex].hex);
        }}
      >
        <Feather name="copy" size={24} color="white" />
      </Pressable>
    </View>
  );
}

export default ColorCarousel;
