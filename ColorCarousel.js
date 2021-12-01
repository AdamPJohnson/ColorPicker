import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  View,
  Text,
  Pressable,
  Dimensions,
  Modal,
  TextInput,
} from "react-native";
import styles from "./styles";
import { AntDesign, Feather, Ionicons } from "react-native-vector-icons";
import ColorPicker from "react-native-wheel-color-picker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
function ColorCarousel({ setWelcome, currentColors }) {
  const scrollTopMax = -1 * (currentColors.length - 1) * windowHeight;
  const scroll = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  // const [scroll, setScroll] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [showHex, setShowHex] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [buttonColor, setButtonColor] = useState("#ffffff");
  const [colorName, setColorName] = useState("");
  const [description, setDescription] = useState("");

  const toggleHex = () => {
    setShowHex((hex) => !hex);
  };
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

  const submitColor = () => {
    console.log({ colorName, color, description });
  };
  useEffect(() => {
    Animated.timing(scroll, {
      toValue: windowHeight * scrollIndex,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    if (currentColors[-scrollIndex].hex === "#FFFFFF") {
      setButtonColor("#000001");
    }
    if (currentColors[-scrollIndex].hex === "#000000") {
      setButtonColor("#FFFFFF");
    }
  }, [scrollIndex]);

  const colorScroll = currentColors.map((color) => {
    var num = parseInt(color.hex.slice(1), 16);
    var r = Math.max((num >> 16) - 35, 0);
    var b = Math.max(((num >> 8) & 0x00ff) - 35, 0);
    var g = Math.max((num & 0x0000ff) - 35, 0);
    var newColor = g | (b << 8) | (r << 16);
    newColor = "#" + newColor.toString(16);

    if (newColor === "#0" || newColor === "#000000") {
      newColor = "#fffffe";
    }
    if (newColor === "#ffffff") {
      newColor = "#000001";
    }

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
        <AntDesign name="caretup" size={24} color="white" />
      </Pressable>
      <Pressable style={styles.scrollDownButton} onPress={onScrollDown}>
        <AntDesign name="caretdown" size={24} color="white" />
      </Pressable>
      <Pressable style={styles.backButton} onPress={() => setWelcome(true)}>
        <AntDesign name="back" size={24} color={buttonColor} />
      </Pressable>
      <Pressable
        style={styles.copyButton}
        onPress={() => {
          console.log(currentColors[-scrollIndex].hex);
        }}
      >
        <Feather name="copy" size={24} color={buttonColor} />
      </Pressable>
      <Pressable
        style={styles.addButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Ionicons name="ios-add" size={32} color={buttonColor} />
      </Pressable>
      <Modal
        style={styles.addColorModal}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.innerModal}>
            <Text style={styles.colorNameLabel}>Color Name:</Text>
            <TextInput
              style={styles.input}
              value={colorName}
              onChangeText={(text) => setColorName(text)}
            />
            <Text style={styles.descriptionLabel}>Description:</Text>
            <Text style={styles.descriptionText}>
              (List of Words Separated By Commas)
            </Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
            <Pressable onPress={submitColor}>
              <Text>Submit</Text>
            </Pressable>
            <ColorPicker
              style={styles.picker}
              color={color}
              onColorChange={(c) => setColor(c)}
              // onColorChangeComplete={this.onColorChangeComplete}
              thumbSize={30}
              sliderSize={20}
              noSnap={true}
              row={false}
              swatchesLast={true}
              swatches={true}
              // discrete={false}
            />
            <Pressable
              style={styles.closeModalButton}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Ionicons name="ios-close" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ColorCarousel;
