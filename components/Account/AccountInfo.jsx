import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function AccountInfo() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchables}
      >
        <Text
          style={styles.texts}
        >
          Account Information
        </Text>
        <Text
          style={styles.texts}
        >
          {">"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    paddingTop: 20,
  },
  touchables: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 40,
    borderBottomWidth: 0.5,
    gap: 25,
  },
  texts: {
    fontSize: 25,
    fontSize: 25,fontFamily:'Playfair-Light'
  }
});