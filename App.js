import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import {
  EditProfile,
  FilterScreen,
  GettingStarted,
  SignIn,
  SubScriptionPlan,
} from "./screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Colors from "./constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { FilterContext, FilterProvider } from "./utils/stores/FilterContext";
import FindYourLoveScreen from "./screens/FindYourLoveScreen.jsx";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const ProfileDrawer = createDrawerNavigator();
  const LoveDrawer = createDrawerNavigator();

  const profileDrawers = () => {
    return (
      <ProfileDrawer.Navigator initialRouteName="EditProfile">
        <ProfileDrawer.Screen
          name="SubScriptionPlan"
          component={SubScriptionPlan}
          options={{ headerShadowVisible: false, headerTitle: "" }}
        />
        <ProfileDrawer.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerTitleAlign: "center",
            headerTitle: "Edit Profile",
          }}
        />
      </ProfileDrawer.Navigator>
    );
  };

  const loveDrawers = () => {
    return (
      <FilterProvider>
        <LoveDrawer.Navigator initialRouteName="FindYourLoveScreen">
          <LoveDrawer.Screen
            name="FilterScreen"
            options={{ title: "Filters" , headerTitleAlign: "center"}}
            component={FilterScreen}
          />
          <LoveDrawer.Screen
            name="FindYourLoveScreen"
            options={{ title: "FindYourLove" , headerTitleAlign: "center"}}
            component={FindYourLoveScreen}
          />
        </LoveDrawer.Navigator>
      </FilterProvider>
    );
  };

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
      <Tab.Screen name="EditProfile" component={profileDrawers} />
      <Tab.Screen name="GettingStarted" component={loveDrawers} />
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
