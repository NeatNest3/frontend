import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "./../../constants/Colors";
import { useNavigation } from "expo-router";

export default function Header() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: " ",
      headerShown: true,
      headerBackTitle: "Return",
    });
  }, [navigation]);

  const users = [
    {
      id: 1,
      first_name: "Jane",
      last_name: "Doe",
      phone: "123-456-7890",
      email: "BookNerd3@gmail.com",
      dob: "January 2, 1973",
    },
  ];

  const customers = [
    {
      id: 1,
      bio: "Avid book lover and aspiring writer. Always looking for the next great read!",
    },
  ];

  const renderUserItem = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userTitle}>About Me</Text>
      <Text style={styles.userText}>
        Name: {item.first_name} {item.last_name}
      </Text>
      <Text style={styles.userText}>Phone: {item.phone}</Text>
      <Text style={styles.userText}>Email: {item.email}</Text>
      <Text style={styles.userText}>Birthday: {item.dob}</Text>
    </View>
  );

  const renderCustomerItem = ({ item }) => (
    <View style={styles.customerContainer}>
      <Text style={styles.customerTitle}>My Bio</Text>
      <Text style={styles.customerText}>{item.bio}</Text>
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
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.userList}
      />
      <FlatList
        data={customers}
        renderItem={renderCustomerItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.customerList}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  userContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,

  },
  userTitle: {
    fontSize: 25,
    fontFamily:'Playfair-Bold',
    marginBottom: 10,
  },
  userText: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily:'Playfair-Light',
  },
  customerContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    
  },
  customerTitle: {
    fontSize: 25,
    fontFamily:'Playfair-Bold',
    marginBottom: 10,
  },
  customerText: {
    fontSize: 16,
    fontFamily:'Playfair-Light',
  },
});