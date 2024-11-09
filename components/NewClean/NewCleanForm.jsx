import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CheckBox } from "react-native-elements";
import { Colors } from "../../constants/Colors";
import { useGlobalParams } from "../../context/GlobalParamsContext";
import { useRouter } from "expo-router";

const roomsList = [
  {
    id: "kitchen",
    name: "Kitchen",
    image: require("./../../assets/images/kitchen.gif"),
  },
  {
    id: "bathroom",
    name: "Bathroom",
    image: require("./../../assets/images/bathroom.gif"),
  },
  {
    id: "bedroom",
    name: "Bedroom",
    image: require("./../../assets/images/bed.gif"),
  },
  {
    id: "living_room",
    name: "Living Room",
    image: require("./../../assets/images/livingroom.gif"),
  },
  {
    id: "laundry",
    name: "Laundry",
    image: require("./../../assets/images/laundry.gif"),
  },
  {
    id: "other",
    name: "Other",
    image: require("./../../assets/images/bed.gif"),
  },
];

const NewCleanForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState([]);

  const router = useRouter()

  const { updateGlobalParams } = useGlobalParams(); 

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowTimePicker(true);
  };

  const handleTimeChange = (event, date) => {
    setShowTimePicker(false);
    if (date) {
      setSelectedTime(date);
    }
  };

  const handleRoomToggle = (roomId) => {
    setSelectedRooms((prevSelectedRooms) =>
      prevSelectedRooms.includes(roomId)
        ? prevSelectedRooms.filter((id) => id !== roomId)
        : [...prevSelectedRooms, roomId]
    );
  };

  const formatTime = (date) => {                // Change time to not be Military
    if (!date) return "";
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;                         // Convert to 12-hour format
    hours = hours ? hours : 12;                 // Adjust '0' to '12'
    return `${hours}:${minutes} ${ampm}`;
  };

  const handleBookAppointment = () => {
    console.log('Filtering Cleans by', selectedRooms)
    updateGlobalParams({
      date: selectedDate ? selectedDate.toISOString() : null,
      time: selectedTime ? formatTime(selectedTime) : null,
      rooms: selectedRooms,
    });

    router.push({
      pathname: "/filteredClean/filteredCleaners",  // Navigate to the filtered page
      query: {
        date: selectedDate ? selectedDate.toISOString() : null,
        time: selectedTime ? formatTime(selectedTime) : null,
        rooms: selectedRooms.join(","), // Convert rooms array to a comma-separated string
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ paddingBottom: 15, borderBottomWidth: 0.5 }}>
        <Text style={styles.headingText}>Book a Clean</Text>
      </View>

      <View style={{ marginBottom: 15 }}>
        <Text style={styles.selectText}>Select the Date:</Text>
      </View>
      <CalendarPicker
        onDateChange={handleDateChange}
        textStyle={styles.calendarText}
        selectedDayColor={Colors.PRIM_GOLD}
        todayBackgroundColor="transparent"
      />
      {selectedDate && (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 40,
            flex: 1,
            padding: 10,
          }}
        >
          <Text style={styles.selectedDate}>
            Selected Date: {selectedDate.toLocaleDateString()}
          </Text>
        </View>
      )}

      <View>
        <Text style={styles.selectText}>Select a Time:</Text>
      </View>
      <DateTimePicker
        value={selectedTime || new Date()}
        mode="time"
        display="spinner"
        onChange={handleTimeChange}
        textColor="black"
      />
      {selectedTime && (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 40,
            flex: 1,
            padding: 10,
          }}
        >
          <Text style={styles.selectedTime}>
            Selected Time: {formatTime(selectedTime)}
          </Text>
        </View>
      )}

      <Text style={styles.roomsTitle}>Select Rooms to Clean:</Text>
      <FlatList
        data={roomsList}
        numColumns={2}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.checkboxContainer}>
            <Image source={item.image} style={styles.roomImage} />
            <CheckBox
              title={item.name}
              checkedColor={Colors.PRIM_DARKGREEN}
              checked={selectedRooms.includes(item.id)}
              onPress={() => handleRoomToggle(item.id)}
              containerStyle={{ flex: 1, marginRight: 10 }}
              textStyle={styles.checkboxText}
            />
          </View>
        )}
        keyExtractor={(item) => item.id} // Added keyExtractor for better performance
      />

      {selectedDate && selectedTime && (
        <TouchableOpacity
          style={styles.button}
          onPress={handleBookAppointment}
        >
          <Text style={styles.buttonText}>Filter your Search</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headingText: {
    fontFamily: "Playfair-Bold",
    fontSize: 30,
    textAlign: "center",
  },
  selectText: {
    marginTop: 20,
    fontFamily: "Playfair-Bold",
    fontSize: 24,
  },
  selectedDate: {
    marginTop: 20,
    fontSize: 18,
    fontFamily: "Playfair-Bold",
    marginTop: 0,
    color: Colors.PRIM_DARKGREEN,
  },
  calendarText: {
    fontFamily: "Playfair",
    fontSize: 16,
  },
  selectedTime: {
    marginTop: 20,
    fontSize: 18,
    fontFamily: "Playfair-Bold",
    textAlign: "center",
    marginTop: 0,
    color: Colors.PRIM_DARKGREEN,
  },
  roomsTitle: {
    marginTop: 20,
    fontSize: 24,
    fontFamily: "Playfair-Bold",
    marginBottom: 10,
  },
  checkboxContainer: {
    alignItems: "center",
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 5,
  },
  checkboxText: {
    fontFamily: "Playfair",
    fontSize: 16,
  },
  roomImage: {
    width: 50,
    height: 50,
    alignItems: "center",
    marginRight: -5,
    borderRadius: 15,
  },
  button: {
    backgroundColor: Colors.PRIM_GOLD,
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Playfair-Bold",
  },
});

export default NewCleanForm;
