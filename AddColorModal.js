import React, { useState } from "react";
import { Modal, View, Text, Pressable, TextInput } from "react-native";
import styles from "./styles";
import ColorPicker from "react-native-wheel-color-picker";
import { Ionicons } from "react-native-vector-icons";
import axios from "axios";
function AddColorModal({ modalVisible, setModalVisible }) {
  const [color, setColor] = useState("#ffffff");
  const [colorName, setColorName] = useState("");
  const [description, setDescription] = useState("");

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
  return (
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
  );
}
export default AddColorModal;
