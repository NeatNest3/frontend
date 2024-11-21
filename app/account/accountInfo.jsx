import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";  // For fetching data from backend
import { Colors } from "../../constants/Colors";  // Assuming your color constants are in this file
import { useNavigation } from "expo-router";

export default function AccountInfo() {
  const [userData, setUserData] = useState(null); // User data state
  const [customerData, setCustomerData] = useState(null); // Customer data state
  const [error, setError] = useState(null); // Error state for handling fetch errors
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Back to Account",
      headerShown: true,
      headerBackTitle: "Back to Account",
      headerTintColor: Colors.PRIM_DARK,
      headerStyle: {
        backgroundColor: Colors.PRIM_DARKGREEN,
      },
    });
  }, [navigation]);

  // Fetch user and customer data from the backend
  const fetchData = async () => {
    try {
      const userResponse = await axios.get('http://192.168.1.15:8000/users/3/'); // Update with correct IP and user ID
      setUserData(userResponse.data);

      const customerResponse = await axios.get("http://192.168.1.15:8000/customers/2/"); // Update with correct customer endpoint
      setCustomerData(customerResponse.data);
    } catch (err) {
      setError("Error fetching data. Please try again later.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Render user information
  const renderUserItem = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userTitle}>Account Information</Text>
      <Text style={styles.userText}>Name: {item.first_name} {item.last_name}</Text>
      <Text style={styles.userText}>Phone: {item.phone}</Text>
      <Text style={styles.userText}>Email: {item.email}</Text>
      <Text style={styles.userText}>Birthday: {item.dob}</Text>
    </View>
  );

  // Render customer bio
  const renderCustomerItem = ({ item }) => (
    <View style={styles.customerContainer}>
      <Text style={styles.customerTitle}>My Bio</Text>
      <Text style={styles.customerText}>{item.bio}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Displaying user info if available */}
      {userData ? (
        <FlatList
          data={[userData]} // FlatList expects an array, so wrap the object in an array
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.userList}
        />
      ) : (
        <Text style={styles.errorText}>Loading user info...</Text>
      )}

      {/* Displaying customer info if available */}
      {customerData ? (
        <FlatList
          data={[customerData]} // Same here, wrap the customer data in an array
          renderItem={renderCustomerItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.customerList}
        />
      ) : (
        <Text style={styles.errorText}>Loading customer info...</Text>
      )}

      {/* Error message */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.PRIM_GREEN,
  },
  userContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  userTitle: {
    fontSize: 22, 
    fontFamily: "Playfair-Bold",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3", 
    paddingBottom: 5,
  },
  userText: {
    fontSize: 18, 
    marginBottom: 8,
    fontFamily: "Playfair",

  },
  customerContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  customerTitle: {
    fontSize: 22, 
    fontFamily: "Playfair-Bold",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3", 
    paddingBottom: 5,
  },
  customerText: {
    fontSize: 18,
    fontFamily: "Playfair",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});
