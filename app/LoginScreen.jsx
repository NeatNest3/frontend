import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../constants/Colors"; 
import { useGlobalParams } from "../context/GlobalParamsContext";
import axios from "axios";
import {useAuth0} from 'react-native-auth0'

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useGlobalParams();

  const {authorize} = useAuth0()

  const handleLogin = async () => {
    setLoading(true);
    setError("");
  
    try {
      // Use the custom redirect URI
      const redirectUri = "neatnest://callback"; 
      const credentials = await authorize({ redirectUri });
      const userEmail = credentials.email;
      console.log("User Email:", userEmail);
  
      const response = await axios.get(`https://https-www-neatnest-tech.onrender.com/user/${userEmail}`);
      setUser(response.data);
      setLoading(false);
  
      router.push("/home"); 
  
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("Email not found, redirecting to account creation.");
        router.push("./account/AccountCreation");
      } else {

        setError("Login failed. Please try again.");
        setLoading(false);
        console.log("Auth0 login error:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require("./../assets/images/TransNoText.png")}
          style={styles.image}
        />
        <Text style={styles.welcomeText}>Welcome to Neat Nest</Text>
        <Text style={styles.subtitle}>We do the dirty work</Text>
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.loginText}>Let's Login</Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            <Text style={styles.buttonText}>Log in now</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 3,
    backgroundColor: Colors.PRIM_DARKGREEN,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 40,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 80,
  },
  image: {
    height: 200,
    width: 200,
    marginBottom: 20,
    marginTop: 25,
  },
  welcomeText: {
    fontSize: 36,
    color: "#fff",
    marginBottom: 5,
    fontFamily: "Playfair-Bold",
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Playfair-Light",
    color: "#fff",
  },
  loginText: {
    fontSize: 30,
    margin: 15,
    textAlign: "center",
    fontFamily: "Playfair-Bold",
  },
  buttonsContainer: {
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    backgroundColor: Colors.PRIM_DARKGREEN,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 0.45,
    marginHorizontal: 10,
  },
  joinButton: {
    borderColor: Colors.PRIM_GOLD,
    borderWidth: 0.5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 0.45,
    marginHorizontal: 10,
  },
  buttonText: {
    color: Colors.PRIM_DARK,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Playfair-Bold",
  },
});
