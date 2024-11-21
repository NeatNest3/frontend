import { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Colors } from '../../constants/Colors';
import axios from 'axios';

export default function Heading() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);


  // const fetchUserData = async () => {
  //   try {
  //     // Update the URL with your local network IP address
  //     const response = await axios.get('http://192.168.1.15:8000/users/');
  //     setUser(response.data);
  //   } catch (err) {
  //     setError('Error fetching user data');
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchUserData();
  // }, []); // Empty dependency array to call this once when the component mounts

  return (
    <View>
      <View style={{
        padding: 10,
        paddingTop: 40,
        backgroundColor: Colors.PRIM_DARKGREEN,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }}>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}>
          <Image source={require('./../../assets/images/TransNoText.png')} style={{
            width: 70,
            height: 70,
            borderRadius: 99,
          }} />
          <View>
            {user ? (
              <>
                <Text style={{
                  fontSize: 20,
                  fontFamily: 'Playfair'
                }}>
                  Welcome Back,
                </Text>
                <Text style={{
                  fontSize: 35,
                  fontFamily: 'Playfair-Bold'
                }}>
                  {user.first_name} {user.last_name} {/* Assuming full name is first + last name */}
                </Text>
              </>
            ) : (
              <Text style={{ color: 'white' }}>Loading...</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
