import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movie from "../screens/Movie";
import Search from "../screens/Search";
import Tv from "../screens/Tv";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { View, Text } from "react-native";
const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    initialRouteName="Search"
    screenOptions={{
      tabBarStyle: { backgroundColor: "tomato" },
      tabBarActiveTintColor: "red",
      tabBarInactiveTintColor: "blue",
    }}
  >
    <Tab.Screen
      name="Movie"
      component={Movie}
      options={{
        headerTitleStyle: {
          color: "tomato",
        },
        headerRight: () => {
          return (
            <View>
              <Text>Hello</Text>
            </View>
          );
        },
      }}
    />
    <Tab.Screen name="Tv" component={Tv} options={{ tabBarBadge: 5 }} />
    <Tab.Screen name="Search" component={Search} />
  </Tab.Navigator>
);

export default Tabs;
