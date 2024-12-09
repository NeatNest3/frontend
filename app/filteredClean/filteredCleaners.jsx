import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useGlobalParams } from "../../context/GlobalParamsContext";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

const FilteredCleaners = () => {
  const { globalParams } = useGlobalParams();
  const { date, time, rooms } = globalParams;

  const [filteredCleaners, setFilteredCleaners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigation = useNavigation();
  const router = useRouter();

  const handleBookNow = (cleaner) => {
    router.push({
      pathname: `/filteredClean/${cleaner.id}`,
      query: { cleanerId: cleaner.id },
    });
  };

  useEffect(() => {
    const fetchCleaners = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://https-www-neatnest-tech.onrender.com/service_provider/"
        );
        const data = await response.json();
        const filtered = data.filter((cleaner) =>
          rooms.some((room) => cleaner.preferred_rooms.includes(room))
        );
        setFilteredCleaners(filtered);
      } catch (error) {
        setError("Failed to fetch cleaners.");
      } finally {
        setLoading(false);
      }
    };

    fetchCleaners();
  }, [rooms]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: " ",
      headerShown: true,
      headerBackTitle: "Reselect Date",
      headerTintColor: Colors.PRIM_DARK,
      headerStyle: {
        backgroundColor: Colors.PRIM_DARKGREEN,
      },
    });
  }, [navigation]);

  if (loading) {
    return <Text>Loading a specialist right for you....</Text>;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <View>
      <ScrollView style={styles.container}>
        <View style={{ borderBottomWidth: 0.5 }}>
          <Text style={styles.heading}>Filtered Cleaners</Text>
        </View>

        <View>
          <Text style={styles.details}>
            Date: {date ? new Date(date).toLocaleDateString() : "Not selected"}
          </Text>
          <Text style={styles.details}>Time: {time || "Not selected"}</Text>
          <Text style={styles.details}>
            Rooms:{" "}
            {rooms && rooms.length > 0 ? rooms.join(", ") : "No rooms selected"}
          </Text>
        </View>

        <FlatList
          data={filteredCleaners}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cleanerCard}>
              <View style={styles.imageWrapper}>
                <Image
                  source={{
                    uri: `https://picsum.photos/100?random=${item.id}`,
                  }}
                  style={styles.cleanerImage}
                />
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </View>

              <View style={styles.cleanerInfo}>
                <Text style={styles.cleanerName}>{item.name}</Text>

                <FlatList
                  horizontal
                  data={item.specialties}
                  keyExtractor={(specialty) => specialty.name}
                  renderItem={({ item: specialty }) => (
                    <View style={styles.specialtyContainer}>
                      <Text style={styles.specialtyText}>{specialty.name}</Text>
                    </View>
                  )}
                  showsHorizontalScrollIndicator={false}
                />

                <Text style={styles.cleanerText}>
                  {item.city}, {item.state}
                </Text>
                <Text style={styles.cleanerText}>
                  {item.pet_friendly === false
                    ? "Not pet-friendly"
                    : "Loves pets!"}
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.bookNowButton}
                  onPress={() => handleBookNow(item)}
                >
                  <Text style={styles.bookNowText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

const sharedTextStyle = {
  fontFamily: "Playfair",
  textAlign: "center",
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 20,
  },
  heading: {
    fontSize: 40,
    fontFamily: "Playfair-Bold",
    textAlign: "center",
    borderBottomWidth: 0.5,
  },
  details: {
    fontSize: 18,
    marginVertical: 10,
    ...sharedTextStyle,
  },
  cleanerCard: {
    flexDirection: "row",
    padding: 15,
    borderWidth: 0.3,
    borderRadius: 10,
    marginBottom: 40,
    backgroundColor: "#f9f9f9",
    shadowColor: Colors.PRIM_DARKGREEN,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    alignItems: "center",
    position: "relative",
  },
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  cleanerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
  },
  ratingContainer: {
    position: "absolute",
    bottom: -10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 99,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  ratingText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  cleanerInfo: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  cleanerName: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Playfair-Bold",
    marginBottom: 10,
    marginLeft: 10,
  },
  specialtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    padding: 5,
    paddingRight: 8,
    borderRadius: 20,
    backgroundColor: Colors.PRIM_GREEN,
  },
  iconImage: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 10,
  },
  specialtyText: {
    fontSize: 14,
    fontFamily: "Playfair",
  },
  cleanerText: {
    paddingTop: 10,
    fontSize: 16,
    fontFamily: "Playfair",
    paddingLeft: 15,
  },
  bookNowButton: {
    position: "absolute",
    top: 75,
    right: 10,
    backgroundColor: Colors.PRIM_GOLD,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  bookNowText: {
    fontSize: 20,
    fontFamily: "Playfair-Bold",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default FilteredCleaners;
