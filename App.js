import { StatusBar } from "expo-status-bar";
import ColorCarousel from "./ColorCarousel";
import React, { useState } from "react";
import { Text, View, Button, TextInput } from "react-native";
import styles from "./styles";

export default function App() {
  const [currentColors, setCurrentColors] = useState([]);
  const [welcome, setWelcome] = useState(true);
  const [searchColor, setSearchColor] = useState("");

  return (
    <>
      {welcome && (
        <View style={styles.welcomeContainer}>
          <>
            <Text>Welcome! Click START below to get started...</Text>
            <TextInput
              style={styles.input}
              value={searchColor}
              onChangeText={(text) => setSearchColor(text)}
            />
            <Button title="Start!" onPress={() => setWelcome(false)} />
          </>
        </View>
      )}
      {!welcome && (
        <ColorCarousel setWelcome={setWelcome} currentColors={currentColors} />
      )}
      <StatusBar style="auto" />
    </>
  );
}
