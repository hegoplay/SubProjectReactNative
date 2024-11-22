import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { users as usersArray } from "../../utils/data";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import UserStatus from "../../components/UserStatus";

const MainChatScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="menu" size={24} />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor: "#eee",
            gap: 12,
            alignItems: "center",
            borderRadius: 4,
          }}
        >
          <Ionicons name="search" size={16} />
          <TextInput
            style={{ flex: 1 }}
            placeholder="Search"
            placeholderTextColor="gray"
          />
        </View>
      </View>
      <View style={styles.listConnectedContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>
          Matches ({usersArray.length})
        </Text>
        <UserStatus imgSource={usersArray[0].image}/>
      </View>
      <View>
        <View></View>
        <ScrollView></ScrollView>
      </View>
    </View>
  );
};

export default MainChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    padding: 16,
    gap: 16
  },
  headerContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  listConnectedContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "gray",
  },

  chatContainer: {},
});
