import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";

const CustomHeaderLeftBack = () => {
    const navigation = useNavigation();
    return (
        <Pressable onPress= {() => navigation.goBack()} style = {{padding: 10}}>
            <Ionicons name = "chevron-back" size={24} color={"black"}/>
        </Pressable>
    )
}

export default CustomHeaderLeftBack;