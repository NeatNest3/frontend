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


export default function HomeCreationScreen() {
  const [homeName, setHomeName] = useState(""); 
  const [addressLineOne, setAddressLineOne] = useState(""); 
  const [city, setCity] = useState(""); 
  const [state, setState] = useState(""); 
  const [zipcode, setZipcode] = useState(""); 
  const [children, setChildren] = useState(false); 
  const [pets, setPets] = useState(false); 
  const [error, setError] = useState(""); 
  const { globalParams } = useGlobalParams(); 
  const userId = globalParams?.user?.id; 
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Create Home",
      headerShown: true,
      headerBackTitle: "Back",
    });
  }, [navigation]);

  const handleHomeCreation = async () => {
    if (!homeName || !addressLineOne || !city || !state || !zipcode) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const homeData = {
        home_name: homeName,
        address_line_one: addressLineOne,
        city,
        state,
        zipcode,
        kids: children, 
        pets, 
        customer: userId,
      };


      const response = await axios.post(
        "http://192.168.1.15:8000/home/",
        homeData
      );

      console.log(response.data, "Home creation response");

      if (response.status === 201) {
        router.push("/home"); 
      }
    } catch (err) {
      console.error(err);
      setError(
        "Error creating home: " + (err.response?.data?.error || err.message)
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.formContainer}>
        <Text style={styles.formTitle}>Create Home</Text>
        <Text
          style={{
            fontFamily: "Playfair",
            textAlign: "center",
            paddingVertical: 10,
          }}
        >
          Please fill out the form fully and hit Create Home to verify
          creation.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Home Name"
          value={homeName}
          onChangeText={setHomeName}
        />
        <TextInput
          style={styles.input}
          placeholder="Address Line 1"
          value={addressLineOne}
          onChangeText={setAddressLineOne}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={state}
          onChangeText={setState}
        />
        <TextInput
          style={styles.input}
          placeholder="Zipcode"
          value={zipcode}
          onChangeText={setZipcode}
          keyboardType="numeric" 
        />

        <View style={styles.checkboxContainer}>
          <CheckBox
            title="Have children?"
            checked={children}
            onPress={() => setChildren(!children)}
            containerStyle={styles.checkbox}
            checkedIcon={<Image source={require('../../assets/images/children.gif')} style={styles.icon} />}
            uncheckedIcon={<Image source={require('../../assets/images/children.gif')} style={[styles.icon, { opacity: 0.5 }]} />}
          />
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            title="Have pets?"
            checked={pets}
            onPress={() => setPets(!pets)}
            containerStyle={styles.checkbox}
            checkedIcon={<Image source={require('../../assets/images/pawprint.gif')} style={styles.icon} />}
            uncheckedIcon={<Image source={require('../../assets/images/pawprint.gif')} style={[styles.icon, { opacity: 0.5 }]} />}
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => handleHomeCreation()}
        >
          <Text style={styles.buttonText}>Create Home</Text>
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
  checkboxContainer: {
    marginBottom: 20, 
  },
  checkbox: {
    backgroundColor: "transparent", 
    marginBottom: 10, 
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
