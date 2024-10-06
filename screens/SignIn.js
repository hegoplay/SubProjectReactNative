import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
const SignIn = () => {
  const defaultSize = 150;
  const circleGap = 30;
  return (
    <View style={styles.outerContainer}>
      {/* Ve logo */}
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1
        }}
      >
        <View
          style={{
            backgroundColor: Colors.primary100,
            width: defaultSize,
            height: defaultSize,
            borderRadius: defaultSize / 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: Colors.primary300,
              width: defaultSize - circleGap,
              height: defaultSize - circleGap,
              borderRadius: (defaultSize - circleGap) / 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: Colors.primary500,
                width: defaultSize - circleGap * 2,
                height: defaultSize - circleGap * 2,
                borderRadius: (defaultSize - circleGap * 2) / 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="heart" size={64} color="white" />
            </View>
          </View>
        </View>
        <Text style={styles.title}>HeartSync</Text>
        <Text style={styles.label}>
          where Hearts Connect, Love Finds Its Sync
        </Text>
      </View>
      {/* cac phuong thuc dang nhap */}

      <View>
        <Text>fasdfas</Text>
        <Text>afdasfas</Text>
      </View>
    </View>
  );
};

export { SignIn };

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "light",
    color: Colors.gray300,
  },
});
