import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import {
  EditProfile,
  FilterScreen,
  GettingStarted,
  SignIn,
  SubScriptionPlan,
  MainChatScreen
} from "./screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Colors from "./constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { FilterContext, FilterProvider } from "./utils/stores/FilterContext";
import FindYourLoveScreen from "./screens/FindYourLoveScreen.jsx";
import { TouchableOpacity } from "react-native";
import LoverDetailScreen from "./screens/LoverDetails.jsx";
import MatchFoundModal from "./components/MatchFoundModal.jsx";
import InChatScreen from "./screens/messages/InChatScreen.jsx";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const ProfileDrawer = createDrawerNavigator();
  const LoveDrawer = createDrawerNavigator();
  const MessageDrawer = createDrawerNavigator();

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
        <LoveDrawer.Navigator initialRouteName="FindYourLove"
        screenOptions={({ navigation }) => ({
          title: "HeartSync",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity
              style={{
                padding: 12,
                backgroundColor: Colors.cyan100,
                marginRight: 24,
                borderRadius: 8,
              }}
              onPress={() => {
                navigation.navigate("Filter");
              }}
            >
              <Ionicons color={Colors.cyan500} name="settings" size={16} />
            </TouchableOpacity>
          ),
        })}>
          <LoveDrawer.Screen
            name="Filter"
            options={{ title: "Filters", headerTitleAlign: "center" }}
            component={FilterScreen}
          />
          <LoveDrawer.Screen
            name="FindYourLove"
            component={FindYourLoveScreen}
          />
          <LoveDrawer.Screen name = "LoverDetail" component={LoverDetailScreen} />
        </LoveDrawer.Navigator>
      </FilterProvider>
    );
  };
  const messageDrawers = () =>{
    return(
      <MessageDrawer.Navigator initialRouteName="MainChat" screenOptions={{headerShown: false}}>
        <MessageDrawer.Screen name = "MainChat" component={MainChatScreen}/>
        <MessageDrawer.Screen name = "InChat" component={InChatScreen}/>
      </MessageDrawer.Navigator>
    )
  }

  const functionTabs = () => (
    <Tab.Navigator
      initialRouteName="Message"
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
      <Tab.Screen name="Message" component={messageDrawers} />
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
          <Stack.Screen name="MatchFound" component={MatchFoundModal}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
