import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Modal } from "react-native";
import { Colors } from "./../../constants/Colors";
import { useNavigation } from "expo-router";
import { activeClean } from "./../../data"; // Assuming you have the activeClean data

export default function History() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Job History",
      headerBackTitle: "Back",
      headerStyle: {
        backgroundColor: Colors.PRIM_DARKGREEN,
      },
      headerTintColor: Colors.PRIM_DARK, 
      headerTitleStyle: {
        fontSize: 20, 
        fontFamily: "Playfair-Bold", 
      },
    });
  }, [navigation]);

  // State to manage the modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCleaner, setSelectedCleaner] = useState(null);

  const openContactModal = (cleaner) => {
    setSelectedCleaner(cleaner); // Set the selected cleaner's details
    setModalVisible(true); // Show the modal
  };

  const closeContactModal = () => {
    setModalVisible(false); // Hide the modal
    setSelectedCleaner(null); // Reset the selected cleaner
  };

  // Filter completed jobs
  const filteredCompletedJobs = activeClean.filter(
    (job) => job.status === "complete"
  );

  // Render Completed Job Item
  const renderCompletedJobItem = ({ item }) => (
    <View style={styles.jobContainer}>
      {/* Home Info with Circular House Image and Text Next to It */}
      <View style={styles.homeContainer}>
        <View style={styles.homeImageContainer}>
          <Image
            source={{ uri: item.home.outdoorPicture }}
            style={styles.homeImage}
          />
        </View>
        <View style={styles.homeInfo}>
          <Text style={styles.homeName}>{item.home.homeName}</Text>
          <Text style={styles.homeAddress}>
            {item.home.address}, {item.home.city}, {item.home.state} {item.home.zip}
          </Text>
        </View>
      </View>

      {/* Scheduled Date and Time */}
      <Text style={styles.jobText}>Completed on: {item.date} at {item.time}</Text>

      {/* Rooms and Tasks */}
      {item.rooms.map((room, index) => (
        <View key={index} style={styles.roomContainer}>
          <Text style={styles.roomTitle}>{room.roomName}</Text>
          {room.tasks.map((task, taskIndex) => (
            <Text key={taskIndex} style={styles.taskText}>
              {task.taskName} {task.specifications ? `- ${task.specifications}` : ""}
            </Text>
          ))}
        </View>
      ))}

      {/* Cleaner Info with Contact Button */}
      <View style={styles.cleanerContainer}>
        <Text style={styles.cleanerText}>
          Cleaner: {item.cleaner.first_name} {item.cleaner.last_name}
        </Text>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => openContactModal(item.cleaner)}
        >
          <Text style={styles.contactButtonText}>Review Clean</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Completed Jobs List */}
      <FlatList
        data={filteredCompletedJobs} // Using the filtered completed jobs
        renderItem={renderCompletedJobItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.jobList}
      />

      {/* Modal for Contacting Cleaner */}
      {selectedCleaner && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeContactModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Coming Soon!</Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeContactModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  jobContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: Colors.PRIM_DARKGREEN,
    shadowOpacity: 1, 
    shadowRadius: 10, 
    shadowOffset: { width: 1, height: 2 }, 
  },
  jobTitle: {
    fontSize: 20,
    fontFamily: "Playfair-Bold",
    marginBottom: 10,
  },
  jobText: {
    fontSize: 16,
    fontFamily: "Playfair-Light",
    marginBottom: 5,
  },
  homeContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 15,
  },
  homeImageContainer: {
    marginRight: 15, 
  },
  homeImage: {
    width: 80,
    height: 80,
    borderRadius: 40, 
  },
  homeInfo: {
    flex: 1, 
  },
  homeName: {
    fontSize: 18,
    fontFamily: "Playfair-Bold",
    marginBottom: 5,
  },
  homeAddress: {
    fontSize: 16,
    fontFamily: "Playfair-Light",
  },
  roomContainer: {
    marginTop: 10,
    paddingLeft: 10,
  },
  roomTitle: {
    fontSize: 18,
    fontFamily: "Playfair-Bold",
  },
  taskText: {
    fontSize: 16,
    fontFamily: "Playfair-Light",
    marginLeft: 10,
  },
  cleanerContainer: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd", 
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cleanerText: {
    fontSize: 16,
    fontFamily: "Playfair-Bold",
  },
  contactButton: {
    backgroundColor: Colors.PRIM_DARKGREEN,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  contactButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Playfair-Bold",
  },


  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, .5)", 
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: "Playfair-Bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    fontFamily: "Playfair-Light",
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: Colors.PRIM_DARKGREEN,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Playfair-Bold",
  },
});
