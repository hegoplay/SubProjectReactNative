import { Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";

const CustomButtonNonIcon = ({
  children,
  color = "white",
  onPress = () => {},
  btnColor = Colors.primary500,
  iconName = "",
  style = {},
  fontSize = 18,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[({ pressed }) => {
        pressed && styles.pressed;
      },{borderRadius: 32},style]}
    >
      <View style={[styles.container, { backgroundColor: btnColor }]}>
        <Text style={{ color: color, fontSize: fontSize }}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButtonNonIcon;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    flexDirection: "row",
    gap: 12,
  },
});
