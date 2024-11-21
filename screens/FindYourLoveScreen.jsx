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
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default FindYourLoveScreen = () => {
  // Use useRef for Animated.Value
  const [users, setUsers] = useState(usersArray ?? []);
  const [showIntroScreen, setShowIntroScreen] = useState(true);
  // const [direction, setDirection] = useState(1);

  const visibleIntroScreen = useRef(new Animated.Value(1)).current;
  const swipe = useRef(new Animated.ValueXY()).current;
  const titlSign = useRef(new Animated.Value(1)).current;
  

  const removeTopCard = (direction) => {
    setUsers((prevState) => prevState.slice(1));
    swipe.setValue({ x: 0, y: 0 });
    // console.log(direction)
    if (direction > 0){

    }
  }

  const removeIntro = () => {
    Animated.timing(visibleIntroScreen, { toValue: 0, duration: 500 }).start(
      () => {
        setShowIntroScreen(false);
      }
    );
  };

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
        }).start(() => removeTopCard(direction));

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
      {showIntroScreen && (
        <TouchableWithoutFeedback onPress={removeIntro}>
          <Animated.View
            style={[styles.introScreen, { opacity: visibleIntroScreen }]}
          >
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "white",
                paddingBottom: 48,
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 3 }}>
                <Text style={styles.title}>Swipe right if you like</Text>
                <Text style={styles.label}>
                  If the person also swipes right on you, it's a match and you
                  can connect.
                </Text>
              </View>
              <View style={{ flex: 1 , alignItems: "flex-end"}}>
                <Ionicons name="chevron-forward" color="white" size={24} />
              </View>
            </View>
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: "white",
                paddingTop: 48,
                flexDirection: "row",
              }}
            >
              <View style= {{flex: 1}}>
                <Ionicons name="chevron-back" color="white" size={24}/>
              </View>
              <View style={{ flex: 3 }} >
                <Text style={styles.title}>Swipe left to pass</Text>
                <Text style = {styles.label}>
                  If the person is not your cup of tea simple pass it's that
                  easy!
                </Text>
              </View>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
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
  introScreen: {
    position: "absolute",
    top: 25,
    width: width * 0.9,
    height: height * 0.78,
    backgroundColor: "rgba(87,191,215,0.4)",
    borderRadius: 10,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: "white",
    fontWeight: "light",
  },
});
