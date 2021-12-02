import React, { useState } from "react";
import { View, Text } from "react-native";

function Swatch({ color, windowWidth, windowHeight }) {
  const [showHex, setShowHex] = useState(false);
  const toggleHex = () => {
    setShowHex((hex) => !hex);
  };
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
      <Text onPress={toggleHex} style={{ color: newColor, fontSize: 20 }}>
        {label}
      </Text>
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
