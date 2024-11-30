// homeinfo.jsx
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "./../../constants/Colors";
import { useNavigation } from "expo-router";
import { users } from "./../../data"; 

export default function HousesList() {
  const navigation = useNavigation();

  // Assuming there's only one logged-in user, we can use the first user in the array for now.
  // In a real app, this would come from your authentication or user management system.
  const currentUser = users[0]; // Change this if you have dynamic user data

  useEffect(() => {
    navigation.setOptions({
      headerTitle: " ",
      headerShown: true,
      headerBackTitle: "Return",
            
    });
  }, [navigation]);

  const renderHomeItem = ({ item }) => (
    <View style={styles.homeContainer}>

      {item.outdoorPicture && (
        <Image
          source={{ uri: item.outdoorPicture }}
          style={styles.homeImage}
        />
      )}

      <Text style={styles.homeTitle}>{item.homeName}</Text>
      
      <Text style={styles.homeText}>Address: {item.address}</Text>
      <Text style={styles.homeText}>City: {item.city}</Text>
      <Text style={styles.homeText}>State: {item.state}</Text>
      <Text style={styles.homeText}>Zip: {item.zip}</Text>
      <Text style={styles.homeText}>Type: {item.homeType}</Text>

      {item.pets && (
        <View style={styles.petsContainer}>
          <Text style={styles.petsTitle}>Pets:</Text>
          {item.pets.map((pet, index) => (
            <Text key={index} style={styles.petsText}>
              {pet.amount} {pet.type}(s)
            </Text>
          ))}
        </View>
      )}
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


      <FlatList
        data={currentUser.homes}  
        renderItem={renderHomeItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.homeList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: "#f5f5f5",
  },
  homeContainer: {
    margin: 10,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    paddingBottom: 25,
  },
  homeTitle: {
    fontSize: 22,
    fontFamily: 'Playfair-Bold',
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
    fontFamily: 'Playfair-Light',
    marginBottom: 5,
  },
  petsContainer: {
    marginTop: 10,
    paddingTop: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 10,
  },
  petsTitle: {
    fontSize: 18,
    fontFamily: 'Playfair-Bold',
    marginBottom: 10,
  },
  petsText: {
    fontSize: 16,
    fontFamily: 'Playfair-Light',
    marginBottom: 5,
  },
});
