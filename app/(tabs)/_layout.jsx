import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "./../../constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIM_DARKGREEN,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bird" size={35} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="newClean"
        options={{
          tabBarLabel: "New Clean",
          tabBarIcon: ({ color }) => (
            <Entypo name="book" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          tabBarLabel: "Messages",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="message-star"
              size={25}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="shield-account"
              size={25}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
