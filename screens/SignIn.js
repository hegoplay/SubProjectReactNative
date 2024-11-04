import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import CustomButton from "../components/CustomButton";



const SignIn = ({navigation}) => {

  const goToFunctions = () =>{
    navigation.navigate("TabScreen");
  }

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
      
      <View style = {styles.footer}>
        <CustomButton btnColor="black" color="white" iconName="logo-apple" onPress={goToFunctions}>Continue with Apple</CustomButton>
        <CustomButton btnColor= {Colors.blue300} color="white" iconName="logo-facebook" onPress={goToFunctions}>Continue with Facebook</CustomButton>
        <CustomButton btnColor= {Colors.cyan300} color="white" iconName="phone-portrait-outline" onPress={goToFunctions}>Use phone number</CustomButton>
        <View style = {{marginTop:24, gap: 5, flexDirection:"column"}}>
          <Text style = {styles.label}>By signing up you agree to our Terms and Conditions</Text>
          <Text style = {styles.label}>See how we use your data in our Privacy Policy</Text>
        </View>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "white",
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  label: {
    fontSize: 12,
    fontWeight: "light",
    color: "gray",
    textAlign:"center",
  },
  footer:{
    flexDirection: "column",
    gap: 12,
  }
});
