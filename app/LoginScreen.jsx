import React, { useState } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { signUp, logIn } from "../firebase/firebaseAuth"; // Import auth functions
import { Colors } from "../constants/Colors";
import { useRouter } from "expo-router";


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      setEmail("");
      setPassword("");
      setError("");
      router.push("/home"); 
    } catch (err) { 
      setError("Error signing up: " + err.message);
    }
  };

  const handleLogIn = async () => {
    try {
      await logIn(email, password);
      setEmail("");
      setPassword("");
      setError("");
      router.replace("/home"); 
    } catch (err) {
      setError("Error logging in: " + err.message);
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
        <ScrollView style={styles.loginContainer}>
          <Text style={styles.loginText}>Let's Login</Text>

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor={'#ccc'}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={'#ccc'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Text style={styles.newAccountText}>Don't have an account? Enter Credentials above and hit "Sign up" to join today!</Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={handleLogIn}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.joinButton} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    backgroundColor: '#F4F4F4', 
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 80, 
  },
  loginContainer: {
    width: "85%", 
    padding: 20,
    paddingLeft:30,
    paddingRight:30,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: -240, 
    zIndex: 10, 
  },
  image: {
    height: 200,
    width: 200,
    marginBottom: 20,
    marginTop:25
  },
  welcomeText: {
    fontSize: 36,
    color: "#fff",
    marginBottom: 5,
    fontFamily:"Playfair-Bold"
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
  input: {
    height: 50,
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
  newAccountText:{
    fontFamily: "Playfair-Light",
    paddingTop:5,
    paddingHorizontal:10,
    textAlign:'center'
  },
  buttonsContainer: {
    paddingTop:50,
    flexDirection: "row",
    justifyContent: "space-around",
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
    borderColor:Colors.PRIM_GOLD,
    borderWidth:.5,
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
    fontFamily: "Playfair-Bold"
  },
});

