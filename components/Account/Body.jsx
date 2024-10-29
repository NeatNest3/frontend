import { View, Text } from "react-native";
import React from "react";

export default function Body() {
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        paddingTop:30
      }}>
      <View style={{
        padding:40
      }}>
        <Text
          style={{
            fontSize: 25,
          }}>
          Account Information
        </Text>
      </View>
      <View style={{
        padding:40
      }}>
        <Text
          style={{
            fontSize: 25,
          }}>
          Home(s)
        </Text>
      </View>
      <View style={{
        padding:40
      }}>
        <Text
          style={{
            fontSize: 25,
          }}>
          Payment
        </Text>
      </View>
      <View style={{
        padding:40
      }}>
        <Text
          style={{
            fontSize: 25,
          }}>
          CustomerSupport
        </Text>
      </View>
    </View>
  );
}
