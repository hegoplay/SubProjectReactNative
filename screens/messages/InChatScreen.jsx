import { Ionicons } from "@expo/vector-icons";
import React, { useLayoutEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import { appendChat, getChat } from "../../connection/ChatListConnection";

const iconSize = 24;

const convertTime = (time = "2023-10-01T10:01:00Z") => {
  const date = new Date(time);
  let str = "";
  str += date.getDay() + 1 + "/";
  str += date.getMonth() + 1 + "/";
  str += date.getFullYear() + " ";
  if (date.getHours() > 12) {
    str += date.getHours() - 12 + ":";
    str += date.getMinutes() + " ";
    str += "PM";
  } else {
    str += date.getHours() + ":";
    str += date.getMinutes() + " ";
    str += "AM";
  }
  return str;
};

const MessageDetail = ({ isHer = true, item }) => {
  const alg = isHer ? "flex-start" : "flex-end";
  const txtColor = isHer ? "black" : "white";
  const bgColor = isHer ? "#ddd" : Colors.cyan300;
  return (
    <View style={{ alignItems: alg }}>
      <Text style={{ color: "gray" }}>{convertTime(item.time)}</Text>
      <Text
        style={{
          padding: 12,
          backgroundColor: bgColor,
          color: txtColor,
          borderRadius: 4,
          marginVertical: 8,
        }}
      >
        {item.message}
      </Text>
    </View>
  );
};


const InChatScreen = ({ route, navigation }) => {
  const { _id } = route.params || { _id: 1 };
  const [chat, setChat] = useState(null);
  const [curText, setCurText] = useState("");
  const sendMsg = (msg) => {
    const msgObj = {
      isMe: 1,
      message: msg,
      time: new Date(),
    };
    chat.chatHistory.push(msgObj);
    appendChat(_id, msgObj);
    setCurText("");

  };
  
  const configChat = async () => {
    const chat = await getChat(_id);
    setChat(chat);
  };

  useLayoutEffect(() => {
    // console.log(chat);
    configChat();
  }, [_id]);
  if (chat == null) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        <TouchableOpacity>
          <Ionicons
            name="arrow-back"
            size={iconSize}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 12,
          }}
        >
          <TouchableOpacity>
            <Ionicons name="camera-outline" size={iconSize} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={iconSize} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.userDetail}>
        <Image source={chat?.image} style={styles.image} />
        <View
          style={{ flexDirection: "column", alignItems: "flex-start", gap: 12 }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            {chat?.name}, {chat?.age}
          </Text>
          <Text
            style={{
              backgroundColor: Colors.cyan50,
              color: Colors.cyan500,
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 4,
              fontWeight: "bold",
            }}
          >
            she/her/hers
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Ionicons name="folder-outline" size={20} />
            <Text>{chat?.job}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log("LoverDetail");
            navigation.navigate("GettingStarted", {
              screen: "LoverDetail",
              params: { userId: chat?._id },
            });
          }}
        >
          <Ionicons
            name="chevron-forward"
            size={iconSize}
            style={{
              padding: 12,
              backgroundColor: Colors.cyan100,
              borderRadius: "50%",
            }}
            color={Colors.cyan500}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.chatArea} contentContainerStyle={{ flexGrow: 1 }}>
        <FlatList
          data={chat?.chatHistory}
          renderItem={({ item }) =>
            MessageDetail({ item, isHer: item.isMe == 0 })
          }
        />
      </ScrollView>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <TextInput
          style={{
            flex: 1,
            backgroundColor: "#eee",
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 30,
            fontSize: 16,
          }}
          placeholder="Type a message..."
          placeholderTextColor="gray"
          value={curText}
          onChangeText={(text) => {
            setCurText(text);
          }}
        />
        <TouchableOpacity onPress={() => {
          sendMsg(curText);
        }}>
          <Ionicons
            name="paper-plane-outline"
            size={iconSize}
            color={Colors.cyan300}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 12,
    backgroundColor: "#fff",
    gap: 12,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // padding: 12,
  },
  userDetail: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 12,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  chatArea: {
    flex: 1,
    flexDirection: "column",
    paddingVertical: 12,
    borderTopColor: "#eee",
    borderTopWidth: 1,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
});
