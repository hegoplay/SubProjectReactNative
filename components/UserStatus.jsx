import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Status from "../constants/Status";
// how to fix this
const statusColor = { online: "green", disable: "gray", current: "blue" };

const UserStatus = ({ size = 30, imgSource, status }) => {
  const statusSize = size / 8;

  const statusColor = statusColor[status] ?? "gray";

  return (
    <View>
      <Image source={imgSource} style={{ width: size, height: size }} />
      <View
        style={{
          position: "absolute",
          padding: 12,
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
