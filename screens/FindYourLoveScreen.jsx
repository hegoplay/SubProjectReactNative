import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Dimensions, Modal, PanResponder, Text } from "react-native";
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { users as usersArray } from "../utils/data";
import Card from "../components/Card";
import { Ionicons } from "@expo/vector-icons";
import SwipedModal from "../components/SwipedModal";
import { getUsersPending } from "../connection/UserConnection";
import { createChat } from "../connection/ChatListConnection";
import { FilterContext } from "../utils/stores/FilterContext";

const { width, height } = Dimensions.get("window");
export default FindYourLoveScreen = ({ navigation }) => {

  // Use useRef for Animated.Value
  const [users, setUsers] = useState([]);
  const filterContext = useContext(FilterContext);
  const [showIntroScreen, setShowIntroScreen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [prevUserId, setPrevUserId] = useState(1);
  // const [direction, setDirection] = useState(1);

  const visibleIntroScreen = useRef(new Animated.Value(1)).current;
  const swipe = useRef(new Animated.ValueXY()).current;
  const titlSign = useRef(new Animated.Value(1)).current;

  const removeTopCard = (direction) => {
    // console.log(direction)
    if (direction > 0) {
      setOpenModal(true);
      createChat(users[0]._id);
    }
    setUsers((prevState) => prevState.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  };

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
    onPanResponderRelease: (_, { dx, dy, vx, vy }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > 100;
      const isJustTouch =
        Math.abs(dx) < 5 &&
        Math.abs(dy) < 5 &&
        Math.abs(vx) < 0.1 &&
        Math.abs(vy) < 0.1;
      if (isJustTouch) {
        navigation.navigate("LoverDetail", {
        // console.log("User Id first: {}",users[0].id );
          userId: users[0]._id,
          isSelecting: true,
        });
        return;
      }
      if (isActionActive) {
        // swipe the card off the screen
        Animated.timing(swipe, {
          duration: 100,
          toValue: {
            x: direction * 500,
            y: dy,
          },
          useNativeDriver: true,
        }).start(() => {
          setPrevUserId(users[0]._id)
          removeTopCard(direction);
        });
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

  const setPendingUsers = async () => {
    const users = await getUsersPending();
    setUsers(users);
  };



  useEffect(() => {
    if (!users.length) {
      if (filterContext.users.length == 0) {
        alert("No users found");
      }
      setPendingUsers();
    }
  }, [users.length]);

  useLayoutEffect(() => {
    setUsers(filterContext.users);
  }, [filterContext.users]);



  if (users.length == 0) {
    return (
      <View>
        <SwipedModal
        visible={openModal}
        setVisible={setOpenModal}
        userId={prevUserId}
      />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SwipedModal
        visible={openModal}
        setVisible={setOpenModal}
        userId={prevUserId}
      />
      {users
        .map(({ name, image, location, job, age, id }, index) => {
          const isFirst = index == 0;
          const dragHandlers = isFirst ? panResponder.panHandlers : {};

          return (
            <Card
              id={id}
              key={name}
              name={name}
              location={location}
              job={job}
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
              <View style={{ flex: 1, alignItems: "flex-end" }}>
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
              <View style={{ flex: 1 }}>
                <Ionicons name="chevron-back" color="white" size={24} />
              </View>
              <View style={{ flex: 3 }}>
                <Text style={styles.title}>Swipe left to pass</Text>
                <Text style={styles.label}>
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
  modalCard: {
    width: "80%",
    padding: 20,
    borderRadius: 4,
    backgroundColor: "white",
    flexDirection: "column",
    gap: 12,
    // alignItems: "center",
  },
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
  content: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
