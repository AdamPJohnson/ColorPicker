import axios from "axios";
import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { FontAwesome } from "react-native-vector-icons";
function Swatch({ color, windowWidth, windowHeight, random, searchWord }) {
  const [showHex, setShowHex] = useState(false);
  const [currentVote, setCurrentVote] = useState(null);
  const toggleHex = () => {
    setShowHex((hex) => !hex);
  };

  const updateVote = (colorId, word, num) => {
    axios
      .patch(`http://localhost:8080/votes/${colorId}/${word}/${num}`)
      .then((d) => {})
      .catch((e) => console.log(e));
  };

  const vote = (direction) => {
    if (direction === "up") {
      if (currentVote === "up") {
        updateVote(color.id, searchWord, -1);
        setCurrentVote(null);
      } else {
        setCurrentVote("up");
        if (currentVote === "down") {
          updateVote(color.id, searchWord, 2);
        } else {
          updateVote(color.id, searchWord, 1);
        }
      }
    }
    if (direction === "down") {
      if (currentVote === "down") {
        updateVote(color.id, searchWord, 1);
        setCurrentVote(null);
      } else {
        setCurrentVote("down");
        if (currentVote === "up") {
          updateVote(color.id, searchWord, -2);
        } else {
          updateVote(color.id, searchWord, -1);
        }
      }
    }
  };

  const downOpacity = currentVote === "down" ? 1 : 0.3;
  const upOpacity = currentVote === "up" ? 1 : 0.3;
  var newColor = similarColor(color);
  const label = showHex ? color.hex : color.name;
  return (
    <View
      key={color.id}
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
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {!random && (
          <Pressable
            onPress={() => vote("down")}
            style={{ opacity: downOpacity, margin: 10 }}
          >
            <FontAwesome size={20} color={newColor} name="thumbs-o-down" />
          </Pressable>
        )}
        <Text onPress={toggleHex} style={{ color: newColor, fontSize: 20 }}>
          {label}
        </Text>
        {!random && (
          <Pressable
            onPress={() => vote("up")}
            style={{ opacity: upOpacity, margin: 10 }}
          >
            <FontAwesome size={20} color={newColor} name="thumbs-o-up" />
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default Swatch;

//// Shifts color to either slightly darker or lighter depending on darkness.
function similarColor(color) {
  var num = parseInt(color.hex.slice(1), 16);
  let [red, green, blue] = [num >> 16, (num >> 8) & 0x00ff, num & 0x000ff];
  const hues = [red, blue, green];
  const dark = hues.every((hue) => hue < 55);

  if (!dark) {
    red = Math.max(red - 35, 0);
    green = Math.max(green - 25, 0);
    blue = Math.max(blue - 25, 0);
    return `rgb(${red},${green},${blue})`;
  } else {
    red = Math.min(red + 55, 255);
    green = Math.min(green + 55, 255);
    blue = Math.min(blue + 55, 255);
    return `rgb(${red},${green},${blue})`;
  }
}
