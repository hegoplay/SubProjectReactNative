import { Pressable, TouchableOpacity } from "react-native";
import { View, Text, Button, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../components/CustomButton";
import CustomButtonNonIcon from "../components/CustomButtonNonIcon";
import Colors from "../constants/Colors";
import { useContext, useLayoutEffect, useReducer, useState } from "react";
import { FilterContext } from "../utils/stores/FilterContext";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
// import Slider from "@react-native-community/slider";

const typeList = {
  gender: "Gender",
  minAge: "MinAge",
  maxAge: "MaxAge",
  maxDistance: "MaxDistance",
  languages: "Languages",
  toggleGender: "toggleGender",
};

const reducer = (state, action) => {
  switch (action.type) {
    case typeList.gender:
      return { ...state, gender: action.payload };
    case typeList.minAge:
      return { ...state, minAge: action.payload };
    case typeList.maxAge:
      return { ...state, maxAge: action.payload };
    case typeList.maxDistance:
      // console.log("YES");
      return { ...state, maxDistance: action.payload };
    case typeList.languages:
      return { ...state, languages: action.payload };
    case typeList.toggleGender:
      let newGenders = state.gender ?? [];
      const idx = newGenders.indexOf(action.payload);
      newGenders =
        idx == -1
          ? [...newGenders, action.payload]
          : newGenders.filter((item) => item != action.payload);

      return { ...state, gender: newGenders };
    case "reset":
      return action.payload;
    default:
      return state; // Return current state if action type is unknown
  }
};

const FilterScreen = ({ navigation }) => {
  const genderList = ["Male", "Female", "Nonbinary"];
  const [isLoad, setIsLoad] = useState(false);
  const filterContext = useContext(FilterContext);
  const [curData, dispatch] = useReducer(reducer, {});

  useLayoutEffect(() => {
    dispatch({ type: "reset", payload: filterContext.data });
    setIsLoad(true);
  }, []);

  const applyFilter = async () => {
    filterContext.setMaxDistance(curData.maxDistance);
    filterContext.getPendingUsers(curData);
  };

  const resetData = () => {
    dispatch({ type: "reset", payload: filterContext.data });
    
  };

  const clickSize = 24;
  if (!isLoad)
    return (
      <View key={"Loading"}>
        <Text>Loading</Text>
      </View>
    );
  return (
    <View key={"main"} style={styles.outerContainer}>
      <ScrollView style={[styles.outerContainer, { padding: 12 }]}>
        {/* Gender */}
        <View>
          <Text style={styles.funcTitle}>What is your preferred gender</Text>
          <View style={styles.funcArea}>
            {genderList.map((gender) => (
              <View
                key={gender}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text>{gender}</Text>
                <Pressable
                  onPress={dispatch.bind(this, {
                    type: typeList.toggleGender,
                    payload: gender,
                  })}
                >
                  {curData.gender.includes(gender) ? (
                    <Ionicons
                      name="checkbox"
                      color={Colors.cyan300}
                      size={clickSize}
                    />
                  ) : (
                    <Ionicons name="square-outline" size={clickSize} />
                  )}
                </Pressable>
              </View>
            ))}
          </View>
        </View>
        {/* Age range */}
        <View>
          <Text style={styles.funcTitle}>Age range:</Text>
          <View style={styles.funcArea}>
          </View>
        </View>
        {/* Distance */}
        <View>
          <Text style={styles.funcTitle}>Distance:</Text>
          <View style={styles.funcArea}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>{curData.maxDistance} km</Text>
              <Text>80 km</Text>
            </View>
            <Slider
              minimumValuealue={0}
              maximumValue={80}
              value={curData.maxDistance}
              onValueChange={
                (value) => {
                  dispatch({
                    type: typeList.maxDistance,
                    payload: value,
                  });
                  // console.log(value)
                }
              }
              minimumTrackTintColor={Colors.cyan300}
              maximumTrackTintColor={Colors.cyan100}
              step={1}
              thumbTintColor={Colors.cyan300}

              // thumbStyle={{height: 15, width: 15, backgroundColor: Colors.cyan300}}
              // StepMarker={1}
            />
          </View>
        </View>
        {/* Languages */}
        <View>
          <Text style={styles.funcTitle}>Languages:</Text>
          <View></View>
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <CustomButtonNonIcon
          btnColor="#eee"
          color="gray"
          fontSize={16}
          style={{ flex: 1, borderRadius: 4 }}
          onPress={() => {
            resetData();
            // console.log("Reset");
          }}
        >
          Clear all
        </CustomButtonNonIcon>
        <CustomButtonNonIcon
          btnColor={Colors.cyan300}
          color="white"
          fontSize={16}
          style={{ flex: 1, borderRadius: 8 }}
          onPress={() => {
            applyFilter();
            // console.log("Apply");
            navigation.navigate("FindYourLove");
          }}
        >
          Apply filters
        </CustomButtonNonIcon>
      </View>
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  footerContainer: {
    borderTopColor: "lightgray",
    borderTopWidth: 2,
    padding: 12,
    flexDirection: "row",
    backgroundColor: "white",
    gap: 12,
  },
  funcTitle: {
    color: Colors.cyan300,
    fontWeight: "bold",
    marginVertical: 12,
  },
  funcArea: {
    padding: 12,
    borderRadius: 4,
    borderColor: "gray",
    borderWidth: 1,
    gap: 8,
  },
});
