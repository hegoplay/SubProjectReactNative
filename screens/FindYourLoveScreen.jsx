import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, PanResponder, Text } from "react-native";
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { users as usersArray } from "../utils/data";
import Card from "../components/Card";
import Footer from "../components/Footer";

const { width, height } = Dimensions.get("window");

export default FindYourLoveScreen = () => {
  // Use useRef for Animated.Value
  const [users, setUsers] = useState(usersArray ?? []);

  const swipe = useRef(new Animated.ValueXY()).current;
  const titlSign = useRef(new Animated.Value(1)).current;
  
  const removeTopCard = useCallback(() =>{
    setUsers((prevState) => prevState.slice(1))
    swipe.setValue({x: 0, y: 0})
  },[swipe])
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      titlSign.setValue(y0 > (height * 0.9) / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > 100;
      if (isActionActive) {
        // swipe the card off the screen
        Animated.timing(swipe, {
          duration: 100,
          toValue: {
            x: direction * 500,
            y: dy,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else {
        // return card to original position
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });
  useEffect(() => {
    if (!users.length) {
      setUsers(users);
    }
  }, [users.length]);

  return (
    <View style={styles.container}>
      {users
        .map(({ name, image, location, distance, age }, index) => {
          const isFirst = index == 0;
          const dragHandlers = isFirst ? panResponder.panHandlers : {};
          return (
            <Card
              key={name}
              name={name}
              location={location}
              distance={distance}
              age={age}
              image={image}
              isFirst={isFirst}
              swipe={swipe}
              titlSign={titlSign}
              {...dragHandlers}
            />
          );
        })
        .reverse()}
      {/* <Footer/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: "tomato",
  },
});
