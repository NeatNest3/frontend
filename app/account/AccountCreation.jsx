import React, { useState, useEffect } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "expo-router";
import axios from "axios"; 
import { CheckBox } from "react-native-elements";
import { useGlobalParams } from "../../context/GlobalParamsContext";


export default function AccountCreationScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(""); 
  const [error, setError] = useState(""); 
  const router = useRouter();
  const navigation = useNavigation();
  const { setUser } = useGlobalParams();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Return to Login",
      headerShown: true,
      headerBackTitle: "Return",
    });
  }, [navigation]);

  const handleAccountCreation = async () => {
    setError("");
    
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !dob ||
      !password ||
      !confirmPassword ||
      !role
    ) {
      setError("Please fill in all fields.");
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
  
    const dobPattern = /^\d{4}-\d{2}-\d{2}$/; 
    if (!dobPattern.test(dob)) {
      setError("Please enter a valid date of birth (YYYY-MM-DD).");
      return;
    }
  
    try {
      const userData = {
        username: email,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        date_of_birth: dob,
        password,
        role: role,
        allergies: [], 
      };
  

      const response = await axios.post(
        "https://https-www-neatnest-tech.onrender.com/user/",
        userData
      );

      setUser(response.data)
  
      console.log(response.data, "User Information");

      if (response.status === 201) {
        router.push("/home"); 
      }
    } catch (err) {
      console.error(err);
      setError(
        "Error creating user on Account side: " + err.response?.data?.error ||
          err.message
      );
    }
  };


  const handleDobChange = (text) => {

    const formattedText = text.replace(/[^0-9\-]/g, ""); 
    // Automatically format text to match YYYY-MM-DD as user types
    if (formattedText.length <= 10) {
      setDob(formattedText);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.formContainer}>
        <Text style={styles.formTitle}>Create Account</Text>
        <Text
          style={{
            fontFamily: "Playfair",
            textAlign: "center",
            paddingVertical: 10,
          }}
        >
          Please fill out the form fully and hit Create Account to verify
          account creation.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Preferred Name"
          value={preferredName}
          onChangeText={setPreferredName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
        />

        <TextInput
          style={styles.input}
          placeholder="Date of Birth (YYYY-MM-DD)"
          value={dob}
          onChangeText={handleDobChange}
          maxLength={10} 
        />

        <Text style={styles.passwordTitle}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <Text style={styles.roleTitle}>Account Role: </Text>
        <View style={styles.checkboxContainer}>
          <CheckBox
            title="Customer"
            checked={role === "customer"}
            onPress={() => setRole("customer")}
            containerStyle={styles.checkbox}
            checkedIcon={
              <Image
                source={require("../../assets/images/customer-care.gif")}
                style={styles.icon}
              />
            }
            uncheckedIcon={
              <Image
                source={require("../../assets/images/customer-care.gif")}
                style={[styles.icon, { opacity: 0.5 }]}
              />
            }
          />
          <CheckBox
            title="Cleaner"
            checked={role === "cleaner"}
            onPress={() => setRole("cleaner")}
            containerStyle={styles.checkbox}
            checkedIcon={
              <Image
                source={require("../../assets/images/cleaning-tools.gif")}
                style={styles.icon}
              />
            }
            uncheckedIcon={
              <Image
                source={require("../../assets/images/cleaning-tools.gif")}
                style={[styles.icon, { opacity: 0.5 }]}
              />
            }
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => handleAccountCreation()}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIM_DARKGREEN,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "85%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    marginTop: 20,
  },
  formTitle: {
    fontSize: 38,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Playfair-Bold",
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  passwordTitle: {
    fontSize: 20,
    fontFamily: "Playfair-Bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  roleTitle: {
    fontSize: 20,
    fontFamily: "Playfair-Bold",
    marginBottom: 10,
    marginTop: 20,
    textAlign: "center",
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  checkbox: {
    backgroundColor: "transparent",
  },
  icon: {
    width: 50,
    height: 50,
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: Colors.PRIM_DARKGREEN,
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 50,
    marginTop: 10,
    marginBottom: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Playfair-Bold",
  },
});
