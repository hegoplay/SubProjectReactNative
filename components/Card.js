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

const { width, height } = Dimensions.get("window");

const Card = ({
  name,
  location,
  age,
  distance,
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
    <Animated.View
      style={[styles.container, isFirst && animatedCardStyle]}
      {...rest}
    >
      <Image source={image} style={styles.image} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,.9)"]}
        style={styles.gradient}
      >
        <View style={styles.userContainer}>
          <Text style={styles.name}>
            {name}, {age}
          </Text>
          <Text style={styles.location}>Live in {location}</Text>
          <Text style={styles.distance}>{distance} miles away</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 25,
    width: width * 0.9,
    height: height * 0.78,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 200,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  userContainer: {
    position: "absolute",
    bottom: 24,
    left: 24,
  },
  name: {
    fontSize: 30,
    color: "white",
    fontWeight: "400",
  },
  location: {
    fontSize: 18,
    color: "white",
    fontWeight: "300",
  },
  distance: {
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
});

export default Card;
