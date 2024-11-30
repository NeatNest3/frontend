import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGlobalParams } from "../../context/GlobalParamsContext";
import cleanersData from "../../assets/data/cleaners.json";
import { useRouter } from "expo-router";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function BookingClean() {
  const { cleanerId } = useLocalSearchParams();
  const { globalParams } = useGlobalParams();
  const { date, time, rooms } = globalParams;

  const [cleaner, setCleaner] = useState(null);
  const [section, setSection] = useState(1); // Section control for the ternary
  const [taskData, setTaskData] = useState({}); // State for room task data
  const [taskErrors, setTaskErrors] = useState({}); // Track errors for each room task

  const [modalVisible, setModalVisible] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const router = useRouter(); // Hook to navigate between screens
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: " ",
      headerShown: true,
      headerBackTitle: "Back to Filter",
      headerTintColor: Colors.PRIM_DARK,
      headerStyle: {
        backgroundColor: Colors.PRIM_DARKGREEN,
      },
    });
  }, [navigation]);

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

  // Validate the required fields
  const validateFields = () => {
    let errors = {};
    rooms.forEach((room) => {
      if (!taskData[room]?.taskName) {
        errors[room] = "Task is required";
      }
    });
    setTaskErrors(errors);
    return Object.keys(errors).length === 0;
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
          <TouchableOpacity style={styles.button} onPress={() => setSection(2)}>
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Image
            source={require("./../../assets/images/TransNoText.png")}
            style={{
              width: 200,
              height: 200,
              borderRadius: 99,
              marginTop: 100,
            }}
          />
        </View>
      </View>
    </View>
  );

  // Section 2: Room Tasks Form
  const renderRoomTasksForm = () => (
    <View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.title}>
              Sounds Good! Let's figure out what you need done!
            </Text>

            {/* Loop through rooms and create the task form for each */}
            {rooms.map((room, index) => {
              // Capitalize and replace underscores with spaces
              const formattedRoomName = room
                .replace(/_/g, " ") // Replace underscores with spaces
                .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word

              return (
                <View key={index} style={styles.roomTask}>
                  <Text style={styles.roomName}>{formattedRoomName}:</Text>

                  {/* Task Name Input */}
                  <TextInput
                    style={[
                      styles.input,
                      taskErrors[room] && {
                        borderColor: "red",
                        borderWidth: 1,
                      }, // Highlight with red border if error
                    ]}
                    placeholder="Task (Required)"
                    placeholderTextColor={Colors.PRIM_DARK}
                    onChangeText={(text) =>
                      handleTaskChange(room, "taskName", text)
                    }
                  />
                  {taskErrors[room] && (
                    <Text style={styles.errorText}>{taskErrors[room]}</Text>
                  )}
                  <Text style={styles.helperText}>
                    EX: "Do dishes, Clean cabinets, Scrub Shower, etc."
                  </Text>

                  {/* Task Description Input */}
                  <TextInput
                    style={styles.input}
                    placeholder="Task Specifics (Optional)"
                    placeholderTextColor={Colors.PRIM_DARK}
                    onChangeText={(text) =>
                      handleTaskChange(room, "taskDescription", text)
                    }
                  />
                  <Text style={styles.helperText}>
                    EX: "Hand dry Pots and Pans, Polish silverware, etc."
                  </Text>
                </View>
              );
            })}

            {/* Confirm Tasks Button */}
            <TouchableOpacity
              onPress={() => {
                if (validateFields()) {
                  setSection(3); // Only move to next section if validation passes
                }
              }}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmButtonText}>Confirm Tasks</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );

  // Section 3: Review Task Summary Before Confirming Booking
  const renderTaskSummary = () => (
    <ScrollView>
      <SafeAreaView style={styles.section}>
        <Text style={styles.title}>Full Clean Summary</Text>
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

        {/* Loop through rooms and show the task data */}
        {rooms.map((room, index) => {
          const formattedRoomName = room
            .replace(/_/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());

          const roomTask = taskData[room];

          return (
            <View key={index} style={styles.roomTask}>
              <Text style={styles.roomName}>{formattedRoomName}:</Text>
              <Text style={styles.inputConfirm}>
                Task: {roomTask?.taskName || "Not provided"}
              </Text>
              <Text style={styles.inputConfirm}>
                Description: {roomTask?.taskDescription || "Not provided"}
              </Text>
            </View>
          );
        })}

        {/* Confirm Booking Button */}
        <TouchableOpacity
          onPress={handleConfirmBooking}
          style={styles.confirmButton}
        >
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
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
          <View style={styles.buttonContainer}>
            <Button title="Book" onPress={handleBookingConfirmed} color={Colors.PRIM_GREEN} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} color={Colors.PRIM_DARKGREEN} />
          </View>
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        {section === 1
          ? renderConfirmation()
          : section === 2
          ? renderRoomTasksForm()
          : renderTaskSummary()}

        {renderModal()}
        {renderBookingConfirmed()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontFamily: "Playfair-Bold",
    textAlign: "center",
    marginVertical: 20,
  },
  scrollViewContent: {
    paddingBottom: 30, // Add some padding at the bottom for scrolling
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
    justifyContent: "space-around",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#fff",
    borderColor: Colors.PRIM_GOLD,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 150,
    shadowColor: Colors.PRIM_DARK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    color: Colors.PRIM_DARK,
    fontFamily: "Playfair-Bold",
    fontSize: 20,
    fontWeight: "bold",
  },
  roomTask: {
    marginVertical: 10,
    paddingHorizontal: 25,
  },
  roomName: {
    fontSize: 20,
    fontFamily: "Playfair-Bold",
    marginVertical: 10,
  },
  helperText: {
    fontSize: 12,
    color: "#777",
    marginBottom: 10,
    marginLeft: 15,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 5,
    borderRadius: 5,
  },
  inputConfirm: {
    padding: 8,
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  confirmButton: {
    backgroundColor: "#fff",
    borderColor: Colors.PRIM_GOLD,
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 100,
    shadowColor: Colors.PRIM_DARK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  confirmButtonText: {
    color: Colors.PRIM_DARK,
    fontSize: 18,
    fontFamily: "Playfair-Bold",
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
    textAlign:'center'
  },
  buttonContainer: {
    flexDirection: "row", // Align buttons side by side
    justifyContent: "space-around",
    width: "50%",
  },
});
