import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const COLORS = {
  like: "#00eda6",
  nope: "#ff006f",
};

const Choice = ({ type }) => {
  const color = COLORS[type];
  const size = 100;
  return (
    <View
      style={{
        borderRadius: "50%",
        borderWidth: 1,
        height: size,
        width: size,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        borderColor: color
      }}
    >
      {type == "like" ? (
        <FontAwesome name="check" size={size/2} color={color}/>
      ) : (
        <FontAwesome name="times" size={size/2}  color={color}/>
      )}
    </View>
  );
};

export default Choice;
