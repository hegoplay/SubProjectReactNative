import { useLayoutEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
} from "react-native";
import CustomHeaderLeftBack from "../components/CustomHeaderLeftBack";
import { Bar } from "react-native-progress";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faRuler,
  faFolder,
  faPerson,
  faMedal,
  faLocation,
  faSmoking,
  faPaw,
  faChild,
  faStar,
  faWineGlass,
  faHandsPraying,
} from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";
const heightPhotoArea = 400;
const plusImgUri =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/8c1d44c0-e27e-483c-accd-7223df6f4a5f/d5cp9s4-ad5d4ecb-0854-413e-9e2a-fe1f3f0f6d5a.png";

const detailList = [
  { icon: faFolder, title: "Occupation", subTitle: "Add" },
  { icon: faPerson, title: "Gender & Pronouns", subTitle: "Male" },
  { icon: faMedal, title: "Education", subTitle: "Add" },
  { icon: faLocation, title: "Location", subTitle: "NV 89104" },

  { icon: faRuler, title: "Height", subTitle: "Add" },
  { icon: faSmoking, title: "Smoking", subTitle: "Add" },
  { icon: faWineGlass, title: "Drinking", subTitle: "Add" },
  { icon: faPaw, title: "Pets", subTitle: "Add" },
  { icon: faChild, title: "Children", subTitle: "Add" },
  { icon: faStar, title: "Zodiac sign", subTitle: "Add" },
  { icon: faHandsPraying, title: "Religion", subTitle: "Add" },
];

const linkedAccount = [
  { icon: "logo-facebook", title: "Facebook", subTitle: "Add" },
  { icon: "logo-instagram", title: "Instagram", subTitle: "Add" },
  { icon: "logo-twitter", title: "Twitter", subTitle: "Add" },
]

const enjoyData = [
  { key: "1", value: "Sci-fi movies" },
  { key: "2", value: "Coffee brewing" },
  { key: "3", value: "Trekking" },
];
const languageData = [
  { key: "en", value: "English" },
  { key: "fi", value: "Finnish" },
  { key: "vn", value: "Vietnam" },
]

const EditProfile = ({ navigation }) => {
  const [selectedEnjoy, setSelectedEnjoy] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CustomHeaderLeftBack />,
    });
  });

  return (
    <ScrollView style={styles.container}>
      {/* progess area */}
      <View style={styles.progressArea}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.progressTitle}>Profile completion: </Text>
          <Text style={[styles.progressTitle, styles.textPrimaryColor]}>
            45%
          </Text>
        </View>
        <View>
          <Bar
            progress={0.45}
            width={null}
            unfilledColor={Colors.cyan100}
            color={Colors.cyan300}
            height={8}
            borderRadius={40}
          />
        </View>
      </View>
      {/* Photos area */}
      <View style={styles.funcArea}>
        <Text style={styles.functionTile}>Photos</Text>
        <Text style={styles.smallText}>
          The main photo is how you appear to others on the swipe view.
        </Text>
        <View style={styles.photoInputArea}>
          {/* Img 2x3 */}
          <Image
            style={{ flex: 2 }}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIb-Rk2eVewQacj7na5QsYGjLCT8sEYROi3Q&s",
            }}
          />
          <View style={{ flex: 1, flexDirection: "column", gap: 8 }}>
            {/* 3 img 1x1 */}
            <Image style={{ flex: 1 }} source={{ uri: plusImgUri }} />
            <Image style={{ flex: 1 }} source={{ uri: plusImgUri }} />
            <Image style={{ flex: 1 }} source={{ uri: plusImgUri }} />
          </View>
        </View>
      </View>

      {/* About me area */}
      <View style={styles.funcArea}>
        <Text style={styles.functionTile}>About me</Text>
        <Text style={styles.smallText}>
          Make it easy for orhers to get a sense of who you are.
        </Text>
        <TextInput
          numberOfLines={4}
          multiline
          style={{
            padding: 8,
            backgroundColor: "#eee",
            marginHorizontal: 8,
            fontSize: 12,
          }}
          placeholderTextColor={"gray"}
          placeholder="Share a few words about yourself, your interests, and what you're looking for in a connection..."
        />
        <Ionicons
          name="filter-outline"
          style={{ position: "absolute", bottom: 0, right: 8 }}
          size={20}
          color={"gray"}
        />
      </View>
      {/* My details area */}
      <View style={[styles.funcArea, { marginTop: 36 }]}>
        <Text style={styles.functionTile}>My details</Text>
        <FlatList
          data={detailList.slice(0, 4)}
          renderItem={({ item }) => (
            <View style={styles.myDetailItem}>
              <FontAwesomeIcon icon={item.icon} style={{ padding: 12 }} />
              <Text style={{ flex: 1 }}>{item.title}</Text>
              <TouchableOpacity style={{ flexDirection: "row", gap: 12 }}>
                <Text style={{ color: "gray" }}>{item.subTitle}</Text>
                <Ionicons name="chevron-forward" color={"gray"} />
              </TouchableOpacity>
            </View>
          )}
        />
        <Text style={[{ marginTop: 36 }, styles.smallText]}>
          Most people also want to know.
        </Text>
        <FlatList
          data={detailList.slice(5, 11)}
          renderItem={({ item }) => (
            <View style={styles.myDetailItem}>
              <FontAwesomeIcon icon={item.icon} style={{ padding: 12 }} />
              <Text style={{ flex: 1 }}>{item.title}</Text>
              <TouchableOpacity style={{ flexDirection: "row", gap: 12 }}>
                <Text style={{ color: "gray" }}>{item.subTitle}</Text>
                <Ionicons name="chevron-forward" color={"gray"} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      {/* I enjoy area */}
      <View style={styles.funcArea}>
      <Text style = {styles.functionTile}>I enjoy</Text>
        <Text style={styles.smallText}>
          I enjoy your interest is a great way to find like-mided connections.
        </Text>
        <MultipleSelectList
          setSelected={(val) => setSelectedEnjoy(val)}
          data={enjoyData}
          save="value"
          label="Categories"
        />
      </View>
      {/* communicate in */}
      <View style={styles.funcArea}>
        <Text style = {styles.functionTile}>I communicate in</Text>
        <MultipleSelectList
          setSelected={(val) => setSelectedLanguages(val)}
          data={languageData}
          save="value"
          
        />
      </View>
      {/* Linked acocunts */}
      <View style={[styles.funcArea, { marginTop: 36 }]}>
        <Text style={styles.functionTile}>My details</Text>
        <FlatList
          data={linkedAccount}
          renderItem={({ item }) => (
            <View style={styles.myDetailItem}>
              <Ionicons name={item.icon}  style={{ padding: 12 }}/>
              <Text style={{ flex: 1 }}>{item.title}</Text>
              <TouchableOpacity style={{ flexDirection: "row", gap: 12 }}>
                <Text style={{ color: "gray" }}>{item.subTitle}</Text>
                <Ionicons name="chevron-forward" color={"gray"} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  functionTile: {
    fontWeight: "bold",
    fontSize: 24,
  },
  functionLabel: {
    fontSize: 12,
    fontWeight: "light",
  },
  progressArea: {
    flexDirection: "column",
    gap: 12,
    marginVertical: 12,
  },
  progressTitle: {
    fontWeight: "bold",
  },
  textPrimaryColor: {
    color: Colors.cyan300,
  },
  funcArea: {
    flexDirection: "column",
    gap: 8,
    marginTop: 36,
  },
  photoInputArea: {
    flexDirection: "row",
    height: heightPhotoArea,
    gap: 8,
  },
  myDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  smallText: {
    color: "gray",
    fontSize: 12,
    fontWeight: "light",
  },
});
