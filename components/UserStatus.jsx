import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Status from "../constants/Status";
// how to fix this
const statusColorList = { online: "green", disable: "gray", current: "orange" };

const UserStatus = ({ size = 100, imgSource, status }) => {
  const statusSize = size / 8;

  const statusColor = statusColorList[status] ?? "gray";

  return (
    <View>
      <Image
        source={{uri: imgSource}}
        style={{ width: size, height: size, borderRadius: "50%" }}
      />
      <View
        style={{
          position: "absolute",
          padding: statusSize,
          backgroundColor: statusColor,
          borderRadius: "50%",
          bottom: 5,
          right: 5,
        }}
      />
    </View>
  );
};

export default UserStatus;

const styles = StyleSheet.create({});
