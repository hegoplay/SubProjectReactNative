import React, { useLayoutEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { chatList } from "../../utils/chatList";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import UserStatus from "../../components/UserStatus";
import Colors from "../../constants/Colors";
import { getChatList } from "../../connection/ChatListConnection";

const convertTime = (time) => {
  const date = new Date(time);
  const currentDate = new Date();
  const diff = currentDate - date;
  // if diff hours < 24, return hours
  //  else return day
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor(diff / 1000 / 60);
  if (minutes < 60) {
    return `${minutes} minutes ago`;
  }
  if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${Math.floor(hours / 24)} days ago`;
  }
};

const MainChatScreen = ({navigation}) => {
  const [curChatList, setCurChatList] = useState([]);

  const getCurChatList = async () => {
    const chatList = await getChatList();
    setCurChatList(chatList);
  };

  useLayoutEffect(() => {
    getCurChatList(); 
  },[navigation]);
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
        <Text style={styles.title}>Matches ({curChatList.length})</Text>
        <FlatList
          data={curChatList}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{ alignItems: "center", justifyContent: "center" }}
                onPress={() => {
                  navigation.navigate("InChat", { _id: item._id });
                }}
              >
                <UserStatus imgSource={item.image} status={item.status} />
                <Text style={{ marginTop: 12 }}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
          horizontal={true}
          keyExtractor={(item) => item._id.toString()}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          scrollEnabled={true}
          nestedScrollEnabled={true} // Allow nested scrolling
        />
      </View>
      <View style={styles.chatContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.title}>Chat ({curChatList.filter((x) => x.chatHistory.length > 0).length})</Text>
          <Ionicons name="filter-outline" size={24} />
        </View>
        <FlatList
          data={curChatList.filter((x) => x.chatHistory.length > 0)}
          renderItem={({ item }) => {
            return (
              <Pressable
                style={({ pressed }) => [
                  { flexDirection: "row", padding: 8, gap: 12 },
                  pressed && {
                    backgroundColor: Colors.cyan50,
                  },
                ]}
                onPress={() => {
                  navigation.navigate("InChat", { _id: item._id });
                }}
              >
                <UserStatus
                  imgSource={item.image}
                  status={item.status}
                  size={50}
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: "space-between",
                    flexDirection: "column",
                    // backgroundColor: "black"
                  }}
                >
                  <View style={{ flexDirection: "row", gap: 4 }}>
                    <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                    <Text style={{ color: "gray", fontWeight: "light" }}>
                      {convertTime(item.chatHistory.at(-1).time)}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", gap: 4 }}>
                    <Text>
                      {item.chatHistory.at(-1).isMe == 1 ? "You:" : "Her:"}
                    </Text>
                    <Text>{item.chatHistory.at(-1).message}</Text>
                  </View>
                  {/* get last element in chatHistory */}
                </View>
              </Pressable>
            );
          }}
        />
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
    gap: 16,
  },
  headerContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontWeight: "bold", fontSize: 24, paddingVertical: 12 },
  listConnectedContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "gray",
    // height: 300
  },

  chatContainer: {
    flexDirection: "column",
    flex: 1,
  },
});
