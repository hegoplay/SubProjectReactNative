import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Colors from "../constants/Colors";
// import CircularProgress from "react-native-circular-progress-indicator"; "react-native-circular-progress-indicator";
import CircularProgress from "react-native-circular-progress-indicator";
import { useState } from "react";

const SubScriptionPlan = ({navigation}) => {
  const planList = ["Plans", "Safety"];
  const includeList = [
    "Unlimited swipes",
    "Advanced filters",
    "Remove ads",
    "Undo accidental left swipes",
    "Push you profile to more viewers",
  ];
  const includeValue = [1, 1, 0, 0, 0];
  const [curPlan, setCurPlan] = useState(planList[0]);
  return (
    <ScrollView style={styles.container}>
      {/* khu vưc của tên user */}
      <View style={styles.headerStyle}>
        <View style={styles.progressArea}>
          <View style={styles.outerImg}>
            <Image
              source={require("../assets/png-clipart-miku-chibi-hatsune-miku-vocaloid-chibi-art-hatsune-miku-fictional-characters-chibi-thumbnail.png")}
              style={styles.img}
            />
            <View>
              <CircularProgress
                radius={60}
                value={45}
                progressValueColor="transparent"
                titleFontSize={20}
                activeStrokeColor={Colors.cyan300}
                inActiveStrokeOpacity={0.2}
                inActiveStrokeWidth={6}
                activeStrokeWidth={6}
                rotation={180}
              />
            </View>
          </View>
          <Text style={styles.progessLabel}>45% complete</Text>
        </View>
        <View style={styles.infoArea}>
          <Text style={styles.userName}>
            Hatsune Miku, 29 <Ionicons name="shield-checkmark" color={"gray"} />
          </Text>
          <TouchableOpacity onPress = {() => {navigation.navigate("EditProfile")}}>
            <Text style={styles.editYourProfile}>
              Edit your profile <Ionicons name="chevron-forward" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* verification */}
      <View style={styles.verificationArea}>
        <Ionicons
          name="shield-checkmark"
          style={styles.shieldIcon}
          size={24}
          color={Colors.blue300}
        />
        <View style={styles.veriTextArea}>
          <Text style={{ color: "gray" }}>
            Verification adds an extra layer of authencity and trust to your
            profile
          </Text>
          <Text style={{ color: Colors.blue300, fontWeight: "bold" }}>
            Verify your account now!
          </Text>
        </View>
        <TouchableOpacity>
          <Ionicons color="gray" name="chevron-forward" size={24} />
        </TouchableOpacity>
      </View>
      {/* Plan */}
      <View style={styles.planArea}>
        {planList.map((item) => {
          return (
            <TouchableOpacity onPress={() => setCurPlan(item)}>
              <Text
                style={[
                  styles.planItem,
                  curPlan == item && styles.selectedPlanItem,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* banner */}
      <ImageBackground
        style={{
          margin: 12,
          borderRadius: 6,
          flexDirection: "column",
          paddingHorizontal: 60,
          paddingTop: 20,
          paddingBottom: 12,
          justifyContent: "center",
          alignContent: "center",
          gap: 6,
          overflow: "hidden",
        }}
        source={{
          uri: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/51adcfb1-e52f-41c6-b0ff-4252365a0262/d9duilp-9c975c58-83b7-43d3-9c86-0020a5707ff3.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzUxYWRjZmIxLWU1MmYtNDFjNi1iMGZmLTQyNTIzNjVhMDI2MlwvZDlkdWlscC05Yzk3NWM1OC04M2I3LTQzZDMtOWM4Ni0wMDIwYTU3MDdmZjMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.bCxw6XbZWWGnJuXOFPTZJ7_cVogM9qPhYRFCiZLuPt4",
        }}
      >
        <Text style={styles.titleBanner}>HeartSync Premium</Text>
        <Text style={styles.labelBanner}>
          Unlock exclusive features and superchanges your dating experience.
        </Text>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            elevation: 20,
            shadowColor: "#ddd",
          }}
        >
          <Text style={styles.upgradeBanner}>Upgrade from $7.99</Text>
        </View>
      </ImageBackground>
      {/* includes */}
      <View style={styles.includeArea}>
        <View style={styles.includeRow}>
          <Text style={{ flex: 2, fontWeight: "bold" }}>What's included</Text>
          <Text style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>
            Free
          </Text>
          <Text
            style={{
              flex: 1,
              fontWeight: "bold",
              color: Colors.cyan300,
              textAlign: "center",
            }}
          >
            Premium
          </Text>
        </View>
        {includeList.map((item, idx) => {
          return (
            <View style={styles.includeRow}>
              <View style={styles.wideCell}>
                <Text style={{ fontSize: 12 }}>{item}</Text>
              </View>
              <View style={[styles.smallCell]}>
                {includeValue[idx] > 0 ? (
                  <Ionicons name="checkbox" color={Colors.cyan300} size={20} />
                ) : (
                  <Ionicons name="square-outline" size={20} />
                )}
              </View>
              <View style={styles.smallCell}>
                <Ionicons name="checkbox" color={Colors.cyan300} size={20} />
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default SubScriptionPlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerStyle: {
    flexDirection: "row",
  },
  progressArea: {
    flex: 2,
    alignItems: "center",
  },

  outerImg: {
    marginTop: 6,
    paddingtop: 6,
  },
  img: {
    height: 120,
    width: 120,
    borderRadius: "50%",
    position: "absolute",
  },
  progessLabel: {
    backgroundColor: Colors.cyan300,
    color: "white",
    marginTop: -17,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 12,
  },
  infoArea: {
    flex: 3,
    justifyContent: "center",
    gap: 12,
    alignItems: "flex-start",
  },
  userName: {
    fontWeight: "bold",
    fontSize: 20,
    alignItems: "center",
  },
  editYourProfile: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: Colors.cyan100,
    color: Colors.cyan500,
    borderRadius: 16,
    alignItems: "center",
  },
  verificationArea: {
    marginTop: 36,
    paddingHorizontal: 36,
    paddingBottom: 36,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  veriTextArea: {
    flex: 1,
    gap: 4,
  },
  shieldIcon: {
    padding: 16,
    borderRadius: 100,
    backgroundColor: Colors.blue100,
  },
  planArea: {
    marginVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    textAlign: "center",
  },
  planItem: {
    padding: 16,
    color: "gray",
    fontSize: 16,
    fontWeight: "light",
  },
  selectedPlanItem: {
    fontWeight: "bold",
    borderBottomColor: Colors.cyan300,
    color: Colors.cyan300,
    borderBottomWidth: 4,
  },
  titleBanner: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  labelBanner: {
    color: "white",
    textAlign: "center",
    lineHeight: 20,
    fontSize: 12,
  },
  upgradeBanner: {
    backgroundColor: "white",
    paddingHorizontal: 6,
    paddingVertical: 6,
    marginTop: 14,
    borderRadius: 20,
  },
  includeArea: {
    flexDirection: "column",
    gap: 20,
    marginHorizontal: 30,
  },
  includeRow: {
    flexDirection: "row",
  },
  wideCell: {
    flex: 2,
    alignItems: "flex-start",
  },
  smallCell: {
    flex: 1,
    alignItems: "center",
  },
});
