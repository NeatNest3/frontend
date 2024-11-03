import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "./../../constants/Colors";
import { useNavigation } from "expo-router";

export default function HousesList() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: " ",
      headerShown: true,
      headerBackTitle: "Return",
    });
  }, [navigation]);

  const homes = [
    {
      id: 1,
      customerId: 1,
      homeName: "Elm Street House",
      address: "123 Elm St",
      city: "Springfield",
      state: "IL",
      zip: "62704",
      homeType: "Home",
      outdoorPicture: "https://via.placeholder.com/150", // Example image URL
      pets: "Yes",
    },
    {
      id: 2,
      customerId: 1,
      homeName: "City Apartment",
      address: "456 Oak Ave",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      homeType: "Apartment",
      outdoorPicture: "https://via.placeholder.com/150", // Example image URL
      pets: "No",
    },
  ];

  const renderHomeItem = ({ item }) => (
    <View style={styles.homeContainer}>
      <Text style={styles.homeTitle}>{item.homeName}</Text>
      <Image source={{ uri: item.outdoorPicture }} style={styles.homeImage} />
      <Text style={styles.homeText}>Address: {item.address}</Text>
      <Text style={styles.homeText}>City: {item.city}</Text>
      <Text style={styles.homeText}>State: {item.state}</Text>
      <Text style={styles.homeText}>Zip: {item.zip}</Text>
      <Text style={styles.homeText}>Type: {item.homeType}</Text>
      <Text style={styles.homeText}>Pets Allowed: {item.pets}</Text>
    </View>
  );

  return (
    <View>
      <View
        style={{
          backgroundColor: Colors.PRIM_DARKGREEN,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("./../../assets/images/TransNoText.png")}
            style={{
              width: 35,
              height: 35,
              borderRadius: 99,
              marginBottom: 10,
            }}
          />
        </View>
      </View>
      <View>
        <FlatList
          data={homes}
          renderItem={renderHomeItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.homeList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  homeContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  homeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  homeImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  homeText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
