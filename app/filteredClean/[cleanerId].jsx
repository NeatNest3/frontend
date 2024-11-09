import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useLocalSearchParams } from "expo-router"; 
import { useGlobalParams } from "../../context/GlobalParamsContext"; 
import cleanersData from "../../assets/data/cleaners.json"; 

export default function BookingClean() {
  const { cleanerId } = useLocalSearchParams(); 
  const { globalParams } = useGlobalParams(); 
  const { date, time, rooms } = globalParams; 

  const [cleaner, setCleaner] = useState(null);

  useEffect(() => {

    console.log("Cleaner ID from route:", cleanerId);


    const foundCleaner = cleanersData.find(
      (cleaner) => cleaner.id.toString() === cleanerId.toString() 
    );
    setCleaner(foundCleaner);

    if (!foundCleaner) {
      console.log("Cleaner not found for ID:", cleanerId); 
    }
  }, [cleanerId]);

  if (!cleaner) {
    return <Text>Cleaner not found!</Text>; 
  }

  return (
    <View>
      <Text>Booking for {cleaner.name}</Text>
      <Text>Location: {cleaner.city}, {cleaner.state}</Text>
      <Text>Date: {date ? new Date(date).toLocaleDateString() : "Not selected"}</Text>
      <Text>Time: {time || "Not selected"}</Text>
      <Text>Rooms: {rooms ? rooms.join(", ") : "No rooms selected"}</Text>

      {/* Confirm Booking Button */}
      <Button title="Confirm Booking" onPress={() => alert("Booking Confirmed!")} />
    </View>
  );
}

const styles = StyleSheet.create({
  // Your styles here...
});
