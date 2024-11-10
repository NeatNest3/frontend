import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGlobalParams } from "../../context/GlobalParamsContext";
import cleanersData from "../../assets/data/cleaners.json";
import { useRouter } from "expo-router"; 

export default function BookingClean() {
  const { cleanerId } = useLocalSearchParams();
  const { globalParams } = useGlobalParams();
  const { date, time, rooms } = globalParams;

  const [cleaner, setCleaner] = useState(null);
  const [section, setSection] = useState(1); // Section control for the ternary
  const [taskData, setTaskData] = useState({}); // State for room task data

  const [modalVisible, setModalVisible] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const router = useRouter(); // Hook to navigate between screens

  useEffect(() => {
    const foundCleaner = cleanersData.find(
      (cleaner) => cleaner.id.toString() === cleanerId.toString()
    );
    setCleaner(foundCleaner);
  }, [cleanerId]);

  if (!cleaner) {
    return <Text>Cleaner not found!</Text>;
  }

  // Handle the task input change
  const handleTaskChange = (room, field, value) => {
    setTaskData((prevData) => ({
      ...prevData,
      [room]: {
        ...prevData[room],
        [field]: value,
      },
    }));
  };

  // Handle the confirm booking action
  const handleConfirmBooking = () => {
    setModalVisible(true); // Show verification modal
  };

  // Handle booking confirmation and set timer to close modal and navigate
  const handleBookingConfirmed = () => {
    setBookingConfirmed(true);
    setModalVisible(false); // Close the verification modal
    setTimeout(() => {
      setBookingConfirmed(false); // Reset the confirmed state
      router.push("/home"); // Navigate to the home screen (or any other screen you prefer)
    }, 2000); // Wait for 2 seconds before navigating
  };

  // Section 1: Confirmation Information
  const renderConfirmation = () => (
    <View>
      <View style={styles.section}>
        <Text style={styles.title}>Is this looking correct?</Text>
        <View style={styles.cleanerDetails}>
          <Image source={{ uri: cleaner.image }} style={styles.cleanerImage} />
          <View style={styles.nameLocation}>
            <Text style={styles.cleanerName}>{cleaner.name}</Text>
            <Text style={styles.cleanerLocation}>
              Location: {cleaner.city}, {cleaner.state}
            </Text>
          </View>
        </View>
        <Text style={styles.detailText}>
          Date: {date ? new Date(date).toLocaleDateString() : "Not selected"}
        </Text>
        <Text style={styles.detailText}>Time: {time || "Not selected"}</Text>

        <View style={styles.buttonsContainer}>
          <Button title="Yes" onPress={() => setSection(2)} />
          <Button title="Edit" onPress={() => setSection(1)} />
        </View>
      </View>
    </View>
  );

  // Section 2: Room Tasks Form
  const renderRoomTasksForm = () => (
    <View style={styles.section}>
      <Text style={styles.title}>What tasks need to be done?</Text>

      {rooms.map((room, index) => (
        <View key={index} style={styles.roomTask}>
          <Text style={styles.roomName}>{room}</Text>
          <TextInput
            style={styles.input}
            placeholder="Task Name"
            onChangeText={(text) => handleTaskChange(room, "taskName", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Task Description"
            onChangeText={(text) =>
              handleTaskChange(room, "taskDescription", text)
            }
          />
          {/* Add picture upload feature later */}
        </View>
      ))}

      <TouchableOpacity
        onPress={handleConfirmBooking}
        style={styles.confirmButton}
      >
        <Text style={styles.confirmButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );

  // Final confirmation modal
  const renderModal = () => (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Are you sure you want to confirm the booking?
          </Text>
          <Button title="Yes" onPress={handleBookingConfirmed} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </View>
    </Modal>
  );

  // Final confirmation message
  const renderBookingConfirmed = () => (
    <Modal
      visible={bookingConfirmed}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setBookingConfirmed(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Booking Confirmed!</Text>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {section === 1 ? renderConfirmation() : renderRoomTasksForm()}

      {renderModal()}
      {renderBookingConfirmed()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontFamily: "Playfair-Bold",
    textAlign: "center",
    marginVertical: 20,
  },
  section: {
    marginBottom: 20,
  },
  cleanerDetails: {
    marginBottom: 20,
    alignItems: "center",
  },
  cleanerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  nameLocation: {
    alignItems: "center",
  },
  cleanerName: {
    fontSize: 24,
    fontFamily: "Playfair-Bold",
    marginBottom: 5,
  },
  cleanerLocation: {
    fontSize: 16,
    fontFamily: "Playfair",
    color: "#555",
  },
  detailText: {
    fontSize: 18,
    fontFamily: "Playfair",
    textAlign: "center",
    marginVertical: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  roomTask: {
    marginVertical: 10,
  },
  roomName: {
    fontSize: 20,
    fontFamily: "Playfair-Bold",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 5,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: "#28a745",
    padding: 15,
    marginTop: 20,
    alignItems: "center",
    borderRadius: 5,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Playfair-Bold",
    marginBottom: 20,
  },
});
