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
  const [backgroundColor, setBackgrondColor] = useState("white");
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
  const getOneRandom = () => {
    axios
      .get("http://localhost:8080/randomColors/1")
      .then((response) => {
        setBackgrondColor(response.data[0].hex);
      })
      .catch((e) => {
        setErrorMessage("Something went wrong... please try again.");
        console.log(e);
      });
    /////handle this
  };
  function addAlpha(color, opacity) {
    // coerce values so ti is between 0 and 1.
    var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
  }

  // useEffect(() => {
  //   getOneRandom();
  // }, [welcome]);
  return (
    <>
      {welcome && (
        <View
          style={{
            flex: 1,
            backgroundColor: addAlpha(backgroundColor, 0.3),
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
            <Button title="Search!" onPress={searchForWord} />
            <Button title="Random!" onPress={getFiveRandom} />
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
