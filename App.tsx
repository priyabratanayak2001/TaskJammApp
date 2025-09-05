import React from "react";
import { View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PeopleScreen from "./src/screen/PeopleScreen";
import CreateJammScreen from "./src/screen/CreateJammScreen";
import EventsScreen from "./src/screen/EventsScreen";

const Tab = createBottomTabNavigator();

// Local icons
const peopleIcon = require("./src/asserts/people.png");
const jamsIcon = require("./src/asserts/jamms.png");
const eventsIcon = require("./src/asserts/Request.png");
const profileIcon = require("./src/asserts/chats.png");

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Jams"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, size }) => {
            let iconSource;
            let badgeCount = 0;

            if (route.name === "People") iconSource = peopleIcon;
            else if (route.name === "Jams") iconSource = jamsIcon;
            else if (route.name === "Request") {
              iconSource = eventsIcon;
              badgeCount = 2; // number on top
            } else if (route.name === "chats") {
              iconSource = profileIcon;
              badgeCount = 23; // number on top
            }

            return (
              <View style={{ width: size, height: size }}>
                <Image
                  source={iconSource}
                  style={{
                    width: size,
                    height: size,
                    tintColor: focused ? "black" : "gray",
                  }}
                  resizeMode="contain"
                />
                {badgeCount > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      right: -6,
                      top: -3,
                      backgroundColor: "red",
                      borderRadius: 8,
                      width: 16,
                      height: 16,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 10,
                        fontWeight: "bold",
                      }}
                    >
                      {badgeCount}
                    </Text>
                  </View>
                )}
              </View>
            );
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="People" component={PeopleScreen} />
        <Tab.Screen name="Jams" component={CreateJammScreen} />
        <Tab.Screen name="Request" component={EventsScreen} />
        <Tab.Screen name="chats" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Placeholder Profile Screen
function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Page (Coming Soon)</Text>
    </View>
  );
}
