import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useGlobalParams } from '../../context/GlobalParamsContext'; // Import the global context
import axios from 'axios';
import { Colors } from '../../constants/Colors'; // Assuming you have some colors defined

export default function AccountInfo() {
  const { globalParams } = useGlobalParams(); // Get the global params
  const [customerData, setCustomerData] = useState(null); // To hold customer data
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`https://https-www-neatnest-tech.onrender.com/customer/${globalParams.user.id}`);
        setCustomerData(response.data); // Update the state with the fetched customer data
      } catch (error) {
        setError('Error fetching customer data');
        console.error(error);
      } finally {
        setLoading(false); // Stop loading once data is fetched or error occurs
      }
    };

    if (globalParams.user) {
      fetchCustomerData(); // Only fetch customer data if user exists
    }
  }, [globalParams.user]); // This useEffect will re-run if globalParams.user changes

  if (loading) {
    return <Text>Loading...</Text>; // Display loading message until data is fetched
  }

  if (error) {
    return <Text>{error}</Text>; // Display error message if there is any
  }

  // Destructure the customer data from the state
  const { first_name, last_name, bio, profile_pic } = customerData || {};

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        {/* Display the profile image */}
        <Image
          source={{ uri: profile_pic || 'https://picsum.photos/200' }} // Use placeholder if no profile pic
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>Welcome Back,</Text>
          <Text style={styles.userName}>{first_name} {last_name}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>About Me</Text>
        <TextInput
          style={styles.bioText}
          value={bio}
          multiline
          editable={false}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  userInfo: {
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 18,
    fontFamily: 'Playfair',
    color: Colors.PRIMARY,
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Playfair-Bold',
    color: Colors.DARK,
  },
  infoContainer: {
    marginVertical: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontFamily: 'Playfair-Bold',
    color: Colors.PRIMARY,
  },
  bioText: {
    fontSize: 16,
    fontFamily: 'Playfair-Light',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    backgroundColor: Colors.WHITE,
    height: 100,
  },
  editButton: {
    backgroundColor: Colors.BUTTON,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  editButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: 'Playfair-Bold',
  },
});
