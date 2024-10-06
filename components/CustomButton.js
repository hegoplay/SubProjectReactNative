import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";
import Colors from "../constants/Colors";

const CustomButton = ({ children, color = 'white', onPress = () =>{},btnColor = Colors.primary500, iconName = "", style= {}, fontSize = 24 }) => {
  return (
    <Pressable onPress={onPress} style = {({pressed}) => {pressed && styles.pressed}}>
      <View style = {[styles.container,style]}>
        <Ionicons name = {iconName} color={color} size={fontSize}/>
        <Text style = {{color:color, fontSize: fontSize}} >{children}</Text>
      </View>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
    pressed:{
        opacity: 0.7
    },
    container:{
        alignItems:"center",
        justifyContent:"center",
        padding: 6
    }

    
})
