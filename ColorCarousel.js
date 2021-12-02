import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  Pressable,
  Dimensions,
  SafeAreaView,
  TouchableHighlight,
  Clipboard,
} from "react-native";
import styles from "./styles";
import { AntDesign, Feather, Ionicons } from "react-native-vector-icons";
import Swatch from "./Swatch";
import AddColorModal from "./AddColorModal";

function ColorCarousel({ setWelcome, currentColors }) {
  const scroll = useRef(new Animated.Value(0)).current;
  const [scrollIndex, setScrollIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const scrollUpVis = scrollIndex !== 0;
  const scrollDownVis = scrollIndex !== -currentColors.length + 1;
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );

  Dimensions.addEventListener("change", () => {
    setWindowWidth(Dimensions.get("window").width);
    setWindowHeight(Dimensions.get("window").height);
  });

  const onScrollUp = () => {
    if (scrollIndex < 0) {
      setScrollIndex((index) => index + 1);
    }
  };
  const onScrollDown = () => {
    if (scrollIndex > -currentColors.length + 1) {
      setScrollIndex((index) => index - 1);
    }
  };

  useEffect(() => {
    Animated.timing(scroll, {
      toValue: windowHeight * scrollIndex,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    return () =>
      Animated.timing(scroll, {
        toValue: windowHeight * scrollIndex,
        duration: 1000,
        useNativeDriver: false,
      }).stop();
  }, [scrollIndex]);

  useEffect(() => {
    Animated.timing(scroll, {
      toValue: windowHeight * scrollIndex,
      duration: 1,
      useNativeDriver: false,
    }).start();
    return () =>
      Animated.timing(scroll, {
        toValue: windowHeight * scrollIndex,
        duration: 1,
        useNativeDriver: false,
      }).stop();
  }, [windowHeight]);

  const colorScroll = currentColors.map((color) => {
    return (
      <Swatch
        color={color}
        windowHeight={windowHeight}
        windowWidth={windowWidth}
      />
    );
  });
  return (
    <SafeAreaView style={styles.colorScrollContainer}>
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
      {scrollUpVis && (
        <TouchableHighlight style={styles.scrollUpButton} onPress={onScrollUp}>
          <AntDesign name="caretup" size={24} color="white" />
        </TouchableHighlight>
      )}
      {scrollDownVis && (
        <TouchableHighlight
          style={styles.scrollDownButton}
          onPress={onScrollDown}
        >
          <AntDesign name="caretdown" size={24} color="white" />
        </TouchableHighlight>
      )}
      <Pressable style={styles.backButton} onPress={() => setWelcome(true)}>
        <AntDesign
          style={{ textAlign: "center" }}
          name="back"
          size={24}
          color="black"
        />
      </Pressable>
      <Pressable
        style={styles.copyButton}
        onPress={() => {
          Clipboard.setString(currentColors[-scrollIndex].hex);
        }}
      >
        <Feather
          style={{ textAlign: "center" }}
          name="copy"
          size={24}
          color="black"
        />
      </Pressable>
      <Pressable
        style={styles.addButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Ionicons
          name="ios-add"
          style={{ textAlign: "center" }}
          size={32}
          color="black"
        />
      </Pressable>

      <AddColorModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
}

export default ColorCarousel;
