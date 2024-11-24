import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Image, Pressable, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { users as usersArray } from "../utils/data";
import Colors from "../constants/Colors";
import { getUser } from "../connection/UserConnection";

const iconSize = 24;

const MatchFoundModal = ({ navigation, route }) => {
  const [user, setUser] = useState(null);
  // const userId = route.params.userId ?? null;

  const findUser = async (userId) => {
    const user = await getUser(route.params.userId ?? null);
    console.log(userId)
    setUser(user);
  };
  const navigateToChat = () => {
    navigation.navigate("InChat", { _id: user._id });
  };

  useLayoutEffect(() => {
    findUser();
  }, [route]);

  if (user == null) {
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="close" size={iconSize} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={iconSize} />
        </TouchableOpacity>
      </View>
      <View style={styles.middleContainer}>
        <Text
          style={{ fontSize: 36, color: Colors.cyan400, fontWeight: "bold" }}
        >
          Match found
        </Text>
        <View style={styles.imageArea}>
          <Image
            source={require("../assets/png-clipart-miku-chibi-hatsune-miku-vocaloid-chibi-art-hatsune-miku-fictional-characters-chibi-thumbnail.png")}
            style={[styles.image, { transform: [{ rotate: "-4deg" }] }]}
          />
          <Image
            source={user.image}
            style={[styles.image, { transform: [{ rotate: "4deg" }] }]}
          />
          <View style={styles.icon1Container} />
          <View style={styles.icon2Container} />
          <View style={styles.icon3Container}>
            <Ionicons name="heart" color="white" size={40} />
          </View>
        </View>
        <Text>
          You've both shown interest in each other! Now go send that first
          message. Don't wait too long!
        </Text>
      </View>
      <Pressable style={styles.footerContainer} onPress={navigateToChat}>
        <Ionicons name="flashlight-outline" size={16} color={Colors.cyan500} />
        <Text style={{ flex: 1, fontSize: 16, color: Colors.cyan500 }}>
          Type a message...
        </Text>
        <Ionicons name="paper-plane" size={16} color={Colors.cyan500} />
      </Pressable>
    </View>
  );
};

export default MatchFoundModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 24,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  middleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerContainer: {
    flexDirection: "row",
    backgroundColor: Colors.cyan100,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  imageArea: {
    height: 200,
    marginVertical: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 200,
    width: 175,
    shadowColor: "black",
    shadowOpacity: 0.6,
    shadowOffset: { height: 2, width: 2 },
  },
  icon1Container: {
    padding: 50,
    position: "absolute",
    borderRadius: 100,
    backgroundColor: Colors.primary100,
    opacity: 0.7,
  },
  icon2Container: {
    padding: 42,
    position: "absolute",
    borderRadius: 100,
    backgroundColor: Colors.primary300,
    opacity: 0.85,
  },
  icon3Container: {
    padding: 10,
    position: "absolute",
    borderRadius: 100,
    backgroundColor: Colors.primary500,
    opacity: 0.9,
  },
});
