import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { Colors } from "./../../constants/Colors";
import { useNavigation, useRouter } from "expo-router";
import { users } from "./../../data";
import axios from "axios";
import { useGlobalParams } from "../../context/GlobalParamsContext";

export default function HousesList() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: " ",
      headerShown: true,
      headerBackTitle: "Return",
    });
  }, [navigation]);

  const { globalParams } = useGlobalParams();
  const userId = globalParams?.user?.id; // Access the userId from globalParams

  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setError("No user ID found, please log in.");
      setLoading(false);
      return;
    }

    const fetchHomes = async () => {
      try {
        // Fetch homes by userId from the backend
        const response = await axios.get(
          `http://127.0.0.1:8000/home/?customer=${userId}`
        );
        setHomes(response.data); // Update the state with the fetched homes data
      } catch (error) {
        setError("Error fetching homes");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomes();
  }, [userId, navigation]); // Re-run this effect if userId or navigation changes

  const handleNewHome = () => {
    router.push("./addhome");
  };

  const renderHomeItem = ({ item }) => (
    <View style={styles.homeContainer}>
      {item.outdoorPicture && (
        <Image source={{ uri: item.outdoorPicture }} style={styles.homeImage} />
      )}

      <Text style={styles.homeTitle}>{item.home_name}</Text>
      <Text style={styles.homeText}>
        Address: {item.address_line_one} {item.address_line_two}
      </Text>
      <Text style={styles.homeText}>City: {item.city}</Text>
      <Text style={styles.homeText}>State: {item.state}</Text>
      <Text style={styles.homeText}>Zip: {item.zipcode}</Text>
      <Text style={styles.homeText}>Type: {item.home_type}</Text>

      {item.pets && item.pets.length > 0 && (
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

  if (loading) {
    return <Text>Loading homes...</Text>; // Loading state
  }

  if (error) {
    return <Text>{error}</Text>; // Display error if fetch fails
  }

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: Colors.PRIM_DARKGREEN }}>
        <View style={styles.headerContainer}>
          <Image
            source={require("./../../assets/images/TransNoText.png")}
            style={styles.headerImage}
          />
        </View>
      </View>

      {homes.length === 0 ? (
        <View style={styles.noHomesCard}>
          <Text style={styles.noHomesText}>No homes submitted yet!</Text>
          <TouchableOpacity
            style={styles.addHomeButton}
            onPress={handleNewHome}
          >
            <Text style={styles.addHomeButtonText}>Add Home</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={homes}
          renderItem={renderHomeItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.homeList}
        />
      )}
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
    fontFamily: "Playfair-Bold",
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
    fontFamily: "Playfair-Light",
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
    fontFamily: "Playfair-Bold",
    marginBottom: 10,
  },
  petsText: {
    fontSize: 16,
    fontFamily: "Playfair-Light",
    marginBottom: 5,
  },
  noHomesCard: {
    marginTop: 150,
    margin: 15,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 25,
  },
  noHomesText: {
    fontSize: 24,
    fontFamily: "Playfair-Bold",
    textAlign: "center",
    marginBottom: 10,
  },
  addHomeButton: {
    backgroundColor: Colors.PRIM_DARKGREEN,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  addHomeButtonText: {
    fontSize: 18,
    fontFamily: "Playfair-Bold",
    color: "#fff",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerImage: {
    width: 35,
    height: 35,
    borderRadius: 99,
    marginBottom: 10,
  },
});
