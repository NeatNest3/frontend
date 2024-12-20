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
import { CheckBox } from "react-native-elements";
import { signUp } from "../../firebase/firebaseAuth"; // Import the signUp function from firebaseAuth
import axios from "axios"; // Import axios to make HTTP requests

export default function AccountCreationScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState(""); // Date of Birth input
  const [password, setPassword] = useState(""); // Password input
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm Password
  const [role, setRole] = useState(""); // Role selection
  const [error, setError] = useState(""); // Error message state
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Return to Login",
      headerShown: true,
      headerBackTitle: "Return",
    });
  }, [navigation]);

  const handleAccountCreation = async () => {
    // Check if all fields are filled out
    if (
      !firstName ||
      !lastName ||
      !preferredName ||
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

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check if dob is in correct format (YYYY-MM-DD)
    const dobPattern = /^\d{4}-\d{2}-\d{2}$/; // Regex for YYYY-MM-DD format
    if (!dobPattern.test(dob)) {
      setError("Please enter a valid date of birth (YYYY-MM-DD).");
      return;
    }

    try {
      // Sign up with Firebase and get the user credentials (firebase_uid, idToken)
      const userCredentials = await signUp(email, password);

      const idToken = await userCredentials.getIdToken();
      // Prepare user data for the backend, include firebase_uid

      console.log("User Id token", idToken);

      const userData = {
        first_name: firstName,
        last_name: lastName,
        preferred_name: preferredName,
        email,
        phone,
        date_of_birth: dob,
        password,
        role: role,
        firebase_uid: userCredentials.uid, // Firebase UID
        allergies: [], // Can be expanded later based on user input
      };

      // Send user data to the Django backend to create the user
      const response = await axios.post(
        "http://192.168.1.15:8000/create-user/",

        userData,
        {
          headers: {
            Authorization: `Bearer ${idToken}`, // Send Firebase ID token for authentication
          },
        }
      );

      console.log(response.data, "Authorization information");

      // Check the response from the backend
      if (response.status === 201) {
        router.push("/home"); // Redirect to home after successful account creation
      }
    } catch (err) {
      console.error(err);
      setError(
        "Error creating user on Account side: " + err.response?.data?.error ||
          err.message
      );
    }
  };

  // Handle input changes for Date of Birth (dob)
  const handleDobChange = (text) => {
    // Allow only numbers and dash for the format YYYY-MM-DD
    const formattedText = text.replace(/[^0-9\-]/g, ""); // Replace any non-numeric or non-dash character
    // Automatically format text to match YYYY-MM-DD as user types
    if (formattedText.length <= 10) {
      // Only update state if the text doesn't exceed the required length (10 characters)
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

        {/* Form Fields */}
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

        {/* Date of Birth with format enforcement */}
        <TextInput
          style={styles.input}
          placeholder="Date of Birth (YYYY-MM-DD)"
          value={dob}
          onChangeText={handleDobChange}
          maxLength={10} // Limit the input to 10 characters (YYYY-MM-DD format)
        />

        {/* Password Section */}
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
                source={require("./../../assets/images/customer-care.gif")}
                style={styles.icon}
              />
            }
            uncheckedIcon={
              <Image
                source={require("./../../assets/images/customer-care.gif")}
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
                source={require("./../../assets/images/cleaning-tools.gif")}
                style={styles.icon}
              />
            }
            uncheckedIcon={
              <Image
                source={require("./../../assets/images/cleaning-tools.gif")}
                style={[styles.icon, { opacity: 0.5 }]}
              />
            }
          />
        </View>

        {/* Error Message */}
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
