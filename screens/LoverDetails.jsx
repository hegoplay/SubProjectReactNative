import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { users as usersArray } from "../utils/data";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native";
import SwipedModal from "../components/SwipedModal";
import { getUser } from "../connection/UserConnection";
import { createChat } from "../connection/ChatListConnection";

const { width, height } = Dimensions.get("window");

const LoverDetailScreen = ({ route, navigation }) => {
  const { userId, isSelecting } = route.params ?? {
    userId: 1,
    isSelecting: false,
  };
  const [user, setUser] = useState(null);
  const [isShow, setIsShow] = useState(false);

  
  const findUser = async (userId) =>{
    const user = await getUser(userId);
    setUser(user);
  }

  useLayoutEffect(() => {
    findUser(userId);
  }, [userId]);

  if (user == null) {
    return <ActivityIndicator size={"large"} />;
  }

  return (
    <>
      <SwipedModal visible={isShow} setVisible={setIsShow} userId={userId} />
      <ScrollView style={styles.container}>
        <View style={{ marginBottom: 24 }}>
          <View style={{ borderRadius: 4 }}>
            <Image source={{uri: user.image}} style={styles.mainImage} />
          </View>
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,.4)"]}
            style={styles.gradient}
          >
            <Text style={styles.title}>
              {user.name}, {user.age}
            </Text>
            <Text style={styles.howToCall}>she/her/hers</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <Ionicons name="folder-outline" color="white" size={16} />
              <Text style={styles.label}>Business Analyst at Tech</Text>
            </View>
          </LinearGradient>
        </View>
        {/* distance */}
        <View style={styles.locatonOuterContainer}>
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <Ionicons name="location-outline" color="red" size={16} />
            <Text style={styles.smallText}>
              {user.distance} kilometres away{" "}
            </Text>
          </View>
          <Text style={styles.bigText}>{user.location}</Text>
        </View>
        {/* about me */}
        <View>
          <Text style={styles.infoTitle}>About me</Text>
          <Text>{user.description}</Text>
        </View>
        {/* My detail */}
        <View>
          <Text style={styles.infoTitle}>My details</Text>
          <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
            {user.enjoy.map((x) => {
              return (
                <Text
                  style={[styles.smallText, styles.component]}
                  numberOfLines={1}
                >
                  {x}
                </Text>
              );
            })}
          </View>
        </View>
        {/* I enjoy */}
        <View>
          <Text style={styles.infoTitle}>I enjoy</Text>
          <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
            {user.enjoy.map((x) => {
              return (
                <Text
                  style={[styles.smallText, styles.component]}
                  numberOfLines={1}
                >
                  {x}
                </Text>
              );
            })}
            <Text></Text>
          </View>
        </View>
        {/* languages */}
        <View>
          <Text style={styles.infoTitle}>I communicate in</Text>
          <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
            {user.languages.map((x) => {
              return (
                <Text
                  style={[styles.smallText, styles.component]}
                  numberOfLines={1}
                >
                  {x}
                </Text>
              );
            })}
            <Text></Text>
          </View>
        </View>
        {/* Images */}
        <View style={styles.funContainer}>
          <Image
            style={{ height: width, width: "100%" }}
            source={{ uri: user.subImage[0] }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            <Image
              style={{ height: width / 2, width: "48%" }}
              source={{ uri: user.subImage[1] }}
            />
            <Image
              style={{ height: width / 2, width: "48%" }}
              source={{ uri: user.subImage[2] }}
            />
          </View>
        </View>
        {isSelecting && (
          <View
            style={[
              { flexDirection: "row", justifyContent: "center", gap: 24 },
              styles.funContainer,
            ]}
          >
            <TouchableOpacity
              style={{
                padding: 12,
                borderRadius: "50%",
                backgroundColor: Colors.red100,
              }}
              onPress={()=> {
                navigation.navigate("FindYourLove");
              }}
            >
              <Ionicons name="close" color="#DE4040" size={36} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 12,
                borderRadius: "50%",
                backgroundColor: Colors.green100,
              }}
              onPress={() => {
                createChat(userId);
                setIsShow(true);
              }}
            >
              <Ionicons name="checkmark" color="#437C36" size={36} />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default LoverDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    paddingHorizontal: 24,
    gap: 24,
  },
  gradient: {
    height: 200,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: "flex-end",
    paddingBottom: 30,
    paddingHorizontal: 24,
    gap: 8,
    alignItems: "flex-start",
    // backgroundColor: "green"
  },
  mainImage: {
    width: "100%",
    height: height * 0.78,
    borderRadius: 4,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  howToCall: {
    color: Colors.cyan500,
    backgroundColor: Colors.cyan100,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  label: {
    color: "white",
    fontSize: 16,
  },
  locatonOuterContainer: {
    backgroundColor: Colors.cyan50,
    padding: 12,
    gap: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 1 },
  },
  smallText: { fontSize: 12, fontWeight: "light" },
  bigText: { fontSize: 24, fontWeight: "bold" },
  infoTitle: { fontSize: 24, fontWeight: "bold", marginVertical: 24 },
  component: {
    backgroundColor: "#eee",
    color: "black",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  funContainer: {
    paddingVertical: 20,
  },
});
