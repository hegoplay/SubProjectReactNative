import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Choice from "./Choice";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const { width, height } = Dimensions.get("window");

const Card = ({
  name,
  job,
  age,
  image,
  isFirst,
  swipe,
  titlSign,
  ...rest
}) => {
  const rotate = Animated.multiply(swipe.x, titlSign || 1).interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ["8deg", "0deg", "-8deg"],
  });

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
  };

  const likeOpacity = swipe.x.interpolate({
    inputRange: [15, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-100, -15],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    // <TouchableWithoutFeedback>
      <Animated.View
        style={[styles.container, isFirst && animatedCardStyle]}
        {...rest}
      >
        <Image source={{uri:image}} style={styles.image} />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,.9)"]}
          style={styles.gradient}
        >
          <View style={styles.userContainer}>
            <Text style={styles.name}>
              {name}, {age}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <Text style={styles.howToCall}>she/her/hers</Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Ionicons name="folder-outline" color="white" size={16} />
              <Text style={styles.job}>{job}</Text>
            </View>
          </View>
        </LinearGradient>
        {isFirst && (
          <>
            <Animated.View
              style={[
                styles.choiceContainer,
                styles.nopeContainer,
                { opacity: nopeOpacity },
              ]}
            >
              <Choice type="nope" />
            </Animated.View>
            <Animated.View
              style={[
                styles.choiceContainer,
                styles.likeContainer,
                { opacity: likeOpacity },
              ]}
            >
              <Choice type="like" />
            </Animated.View>
          </>
        )}
      </Animated.View>
    // </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 25,
    width: width * 0.9,
    height: height * 0.78,
    padding: 3,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#333",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  gradient: {
    position: "absolute",
    bottom: 3,
    width: "98%",
    height: 200,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  userContainer: {
    position: "absolute",
    bottom: 24,
    left: 24,
    flexDirection: "column",
    gap: 12,
  },
  name: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  job: {
    fontSize: 18,
    color: "white",
    fontWeight: "300",
  },
  job: {
    fontSize: 18,
    color: "white",
    fontWeight: "300",
  },
  choiceContainer: {
    position: "absolute",
    bottom: 100,
  },
  likeContainer: {
    right: 45,
  },
  nopeContainer: {
    left: 45,
  },
  howToCall: {
    backgroundColor: Colors.purple100,
    color: Colors.purple300,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
});

export default Card;
