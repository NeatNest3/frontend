import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "./../../constants/Colors";
import { useNavigation } from "expo-router";
import { users } from "./../../data";

export default function Header() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: " ",
      headerShown: true,
      headerBackTitle: "Return",
    });
  }, [navigation]);

  const renderUserItem = ({ item }) => (
    <View style={styles.userContainer}>
      
      {item.role.details.profile_pic && (
        <Image
          source={{ uri: item.role.details.profile_pic }} 
          style={styles.profileImage}
        />
      )}
      
      <Text style={styles.userTitle}>About Me</Text>
      <Text style={styles.userText}>
        Name: {item.first_name} {item.last_name}
      </Text>
      <Text style={styles.userText}>Phone: {item.phone}</Text>
      <Text style={styles.userText}>Email: {item.email}</Text>
      <Text style={styles.userText}>Birthday: {item.dob}</Text>

      <View style={styles.roleContainer}>
        <Text style={styles.userTitle}>Short Bio</Text>
        <Text style={styles.userText}>{item.role.details.bio}</Text>
      </View>
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
          data={users} // Using imported data
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.userList}
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
    margin: 10,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    paddingBottom: 25,
    elevation: 2,
  },
  userTitle: {
    fontSize: 25,
    fontFamily: 'Playfair-Bold',
    marginBottom: 10,
  },
  userText: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Playfair-Light',
  },
  roleContainer: {
    marginTop: 15,
    paddingTop: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15, 
    alignSelf: 'center', 
  },
});
