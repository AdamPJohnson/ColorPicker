import { StatusBar } from "expo-status-bar";
import ColorCarousel from "./ColorCarousel";
import React, { useState, useEffect } from "react";
import { Text, View, Button, TextInput } from "react-native";
import styles from "./styles";
import axios from "axios";
export default function App() {
  const [currentColors, setCurrentColors] = useState([]);
  const [welcome, setWelcome] = useState(true);
  const [searchWord, setSearchWord] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const backgroundColor = "rgba(50,200,255,0.1)";
  const buttonColor = "lightblue";
  const searchForWord = () => {
    if (searchWord.length) {
      axios
        .get(`http://localhost:8080/colors/${searchWord}`)
        .then((response) => {
          if (response.data.length) {
            setCurrentColors(response.data);
            setWelcome(false);
            setErrorMessage("");
          } else {
            setErrorMessage("No colors match that word...");
          }
        })
        .catch((e) => {
          setErrorMessage("Something went wrong... please try again.");
          console.log(e);
        });
      /////handle this
    } else {
      setErrorMessage("Please enter a word");
    }
  };
  const getFiveRandom = () => {
    axios
      .get("http://localhost:8080/randomColors/5")
      .then((response) => {
        setCurrentColors(response.data);
        setWelcome(false);
        setErrorMessage("");
      })
      .catch((e) => {
        setErrorMessage("Something went wrong... please try again.");
        console.log(e);
      });
    /////handle this
  };

  return (
    <>
      {welcome && (
        <View
          style={{
            flex: 1,
            backgroundColor: backgroundColor,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <>
            <Text>Enter a word below to get started...</Text>
            <TextInput
              style={styles.input}
              value={searchWord}
              onChangeText={(text) => setSearchWord(text)}
            />
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <Button
              color={buttonColor}
              title="Search!"
              onPress={searchForWord}
            />
            <Button
              color={buttonColor}
              title="Random!"
              onPress={getFiveRandom}
            />
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
