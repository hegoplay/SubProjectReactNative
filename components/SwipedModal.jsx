import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import CustomButtonNonIcon from "./CustomButtonNonIcon";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const SwipedModal = ({ visible, setVisible = () => {}, userId  = 1}) => {
  const navigation = useNavigation();
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.content}>
        <View style={styles.modalCard}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Ionicons
              name="chevron-forward"
              style={{
                padding: 12,
                backgroundColor: Colors.cyan100,
                borderRadius: "50%",
              }}
              color={Colors.cyan500}
              size={24}
            />
          </View>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            You've just swiped right!
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "light",
              color: "gray",
            }}
          >
            By swiping right, you're expressing interest in this person. If they
            also swipe right on your profile, it's a match! Do you want to
            continue?
          </Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <CustomButtonNonIcon
              btnColor="#eeeeee"
              color="gray"
              style={{ flex: 1 }}
              onPress={() => {
                setVisible(false);
              }}
            >
              Cancel
            </CustomButtonNonIcon>
            <CustomButtonNonIcon
              btnColor={Colors.cyan300}
              color="white"
              style={{ flex: 1, width: "50%" }}
              onPress={() => {
                setVisible(false);
                // console.log(visible)
                navigation.navigate("MatchFound",{userId: userId})
                navigat
              }}
            >
              Continue
            </CustomButtonNonIcon>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SwipedModal;

const styles = StyleSheet.create({
  modalCard: {
    width: "80%",
    padding: 20,
    borderRadius: 4,
    backgroundColor: "white",
    flexDirection: "column",
    gap: 12,
    // alignItems: "center",
  },
  content: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
