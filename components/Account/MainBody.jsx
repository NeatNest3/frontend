import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function MainBody() {
  const router = useRouter();

  const onMainClick = (item) => {
    router.push(item.path);
  };

  const MainList = [
    {
      id: 1,
      name: "Account Information",
      path: "/account/accountInfo",
    },
    {
      id: 2,
      name: "Home(s)",
      path: "/houses/housesList",
    },
    {
      id: 3,
      name: "Payment",
      path: "/payments/paymentList",
    },
    {
      id: 4,
      name: "Customer Service",
      path: "/cs/custServ",
    },
    {
      id: 5,
      name: "Logout",
      path: "",
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={MainList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onMainClick(item)}
            style={styles.touchables}
          >
            <Text style={styles.texts}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
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
    justifyContent: "center",
    padding: 40,
    borderBottomWidth: 0.5,
    gap: 25,
  },
  texts: {
    fontSize: 25,
    fontFamily: "Playfair-Light",
    textAlign: "center",
  },
});
