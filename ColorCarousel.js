import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  View,
  Text,
  Pressable,
  Dimensions,
  Modal,
  TextInput,
  Alert,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";
import styles from "./styles";
import { AntDesign, Feather, Ionicons } from "react-native-vector-icons";
import ColorPicker from "react-native-wheel-color-picker";
import axios from "axios";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function ColorCarousel({ setWelcome, currentColors }) {
  const scrollTopMax = -1 * (currentColors.length - 1) * windowHeight;
  const scroll = useRef(new Animated.Value(0)).current;
  const [scrollIndex, setScrollIndex] = useState(0);
  const [showHex, setShowHex] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [colorName, setColorName] = useState("");
  const [description, setDescription] = useState("");
  const scrollUpVis = scrollIndex !== 0;
  const scrollDownVis = scrollIndex !== -currentColors.length + 1;

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
    if (colorName === "") {
      Alert.alert("Invalid Color Name", "Please enter a color name...");
      return;
    }
    axios
      .post("http://localhost:8080/colors", {
        colorName,
        color,
        description,
      })
      .then((d) => {
        console.log("fog");
        setModalVisible(false);
        setColor("#ffffff");
        setColorName("");
        setDescription("");
        console.log(d);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    Animated.timing(scroll, {
      toValue: windowHeight * scrollIndex,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [scrollIndex]);

  const colorScroll = currentColors.map((color) => {
    // console.log(parseInt(color.hex.slice(1), 16));
    const dark = parseInt(color.hex.slice(1), 16) < 1600000;
    console.log(dark);
    if (!dark) {
      var num = parseInt(color.hex.slice(1), 16);
      var r = Math.max((num >> 16) - 35, 0);
      var b = Math.max(((num >> 8) & 0x00ff) - 25, 0);
      var g = Math.max((num & 0x0000ff) - 25, 0);
      var newColor = g | (b << 8) | (r << 16);
      newColor = "#" + newColor.toString(16);
    } else {
      var num = parseInt(color.hex.slice(1), 16);
      var r = Math.min((num >> 16) + 55, 255);
      var b = Math.min(((num >> 8) & 0x00ff) + 55, 255);
      var g = Math.min((num & 0x0000ff) + 55, 255);
      var newColor = g | (b << 8) | (r << 16);
      newColor = "#" + newColor.toString(16);
    }
    // console.log(newColor);
    // if (newColor === "#0" || newColor === "#000000") {
    //   newColor = "#fffffe";
    // }
    // if (newColor === "#ffffff") {
    //   newColor = "#000001";
    // }
    // newColor = "rgba(0,0,0,0.1)";
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
          textShadowColor: "rgba(255, 255, 255,1)",
          textShadowOffset: 5,
          textShadowRadius: 100,
        }}
      >
        <Text onPress={toggleHex} style={{ color: newColor, fontSize: 20 }}>
          {label}
        </Text>
      </View>
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
          console.log(currentColors[-scrollIndex].hex);
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
          <View
            style={{
              width: "90%",
              height: "75%",
              backgroundColor: color,
              opacity: 1,
              borderRadius: 10,
              display: "flex",
              flexDirection: "column",

              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.5,
              shadowRadius: 5,
            }}
          >
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
            <Pressable style={styles.submitButton} onPress={submitColor}>
              <Text>Submit</Text>
            </Pressable>
            <Text>{color}</Text>
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
              <Ionicons
                style={{ textAlign: "center" }}
                name="ios-close"
                size={24}
                color="black"
              />
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default ColorCarousel;
