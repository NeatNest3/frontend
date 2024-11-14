import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
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
  { id: "kitchen", name: "Kitchen", image: require("./../../assets/images/kitchen.gif") },
  { id: "bathroom", name: "Bathroom", image: require("./../../assets/images/bathroom.gif") },
  { id: "bedroom", name: "Bedroom", image: require("./../../assets/images/bed.gif") },
  { id: "living_room", name: "Living Room", image: require("./../../assets/images/livingroom.gif") },
  { id: "laundry", name: "Laundry", image: require("./../../assets/images/laundry.gif") },
  { id: "other", name: "Other", image: require("./../../assets/images/bed.gif") },
];

const NewCleanForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState([]);

  const router = useRouter();
  const { updateGlobalParams } = useGlobalParams();

  // Handle Date Change: Trigger Time Picker when a date is selected
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowTimePicker(true);  // Show time picker after selecting a date
  };

  // Handle Time Change: Update selected time and hide the picker
  const handleTimeChange = (event, date) => {
    if (event.type === 'set' && date) {
      setSelectedTime(date);
    }
    setShowTimePicker(false); // Hide the time picker after selection
  };

  // Handle Room Selection Toggle
  const handleRoomToggle = (roomId) => {
    setSelectedRooms((prevSelectedRooms) =>
      prevSelectedRooms.includes(roomId)
        ? prevSelectedRooms.filter((id) => id !== roomId)
        : [...prevSelectedRooms, roomId]
    );
  };

  const formatTime = (date) => {
    if (!date) return "";
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  useEffect(() => {
    // Automatically hide time picker after date/time are both selected
    if (selectedDate && selectedTime) {
      setShowTimePicker(false);
    }
  }, [selectedDate, selectedTime]);

  const handleBookAppointment = () => {
    console.log('Filtering Cleans by', selectedRooms);
    updateGlobalParams({
      date: selectedDate ? selectedDate.toISOString() : null,
      time: selectedTime ? formatTime(selectedTime) : null,
      rooms: selectedRooms,
    });

    router.push({
      pathname: "/filteredClean/filteredCleaners",
      query: {
        date: selectedDate ? selectedDate.toISOString() : null,
        time: selectedTime ? formatTime(selectedTime) : null,
        rooms: selectedRooms.join(","),
      },
    });
  };

  return (
    <View style={styles.container}>
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
        <View style={styles.selectedDateContainer}>
          <Text style={styles.selectedDate}>Selected Date: {selectedDate.toLocaleDateString()}</Text>
        </View>
      )}

      {showTimePicker && (
        <>
          <View>
            <Text style={styles.selectText}>Select a Time:</Text>
          </View>
          <DateTimePicker
            value={selectedTime || new Date()}
            mode="time"
            display="default"
            onChange={handleTimeChange}
            textColor="black"
          />
        </>
      )}

      {selectedTime && (
        <View style={styles.selectedTimeContainer}>
          <Text style={styles.selectedTime}>Selected Time: {formatTime(selectedTime)}</Text>
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
        keyExtractor={(item) => item.id}
      />

      {selectedDate && selectedTime && (
        <TouchableOpacity style={styles.button} onPress={handleBookAppointment}>
          <Text style={styles.buttonText}>Filter your Search</Text>
        </TouchableOpacity>
      )}
    </View>
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
  selectedDateContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    flex: 1,
    padding: 10,
  },
  selectedDate: {
    marginTop: 20,
    fontSize: 18,
    fontFamily: "Playfair-Bold",
    color: Colors.PRIM_DARKGREEN,
  },
  calendarText: {
    fontFamily: "Playfair",
    fontSize: 16,
  },
  selectedTimeContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    flex: 1,
    padding: 10,
  },
  selectedTime: {
    marginTop: 20,
    fontSize: 18,
    fontFamily: "Playfair-Bold",
    textAlign: "center",
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
