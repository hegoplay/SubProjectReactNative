import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EditProfile, GettingStarted, SignIn } from "./screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "./constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const Stack = createNativeStackNavigator();

  const Tab = createBottomTabNavigator();

  const functionTabs = () => (
    <Tab.Navigator
      initialRouteName="GettingStarted"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name == "EditProfile") {
            iconName = "person-outline";
          } else if (route.name == "GettingStarted") {
            iconName = "heart-outline";
          } else if (route.name == "Bookmark") {
            iconName = "bookmark-outline";
          } else {
            iconName = "paper-plane-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.cyan300,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="EditProfile" component={EditProfile} />
      <Tab.Screen name="GettingStarted" component={GettingStarted} />
      <Tab.Screen name="Bookmark" component={EditProfile} />
      <Tab.Screen name="Message" component={EditProfile} />
    </Tab.Navigator>
  );

  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="TabScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SignInScreen" component={SignIn} />
          <Stack.Screen name="TabScreen" component={functionTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
