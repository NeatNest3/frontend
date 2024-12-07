import { View, Text, Image } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import { useGlobalParams } from '../../context/GlobalParamsContext'; // Import context

export default function Heading() {
  const { globalParams } = useGlobalParams(); // Access globalParams from context

  // Extract user data from globalParams
  const { user } = globalParams;

  // If the user data is available, use first_name and last_name
  const first_name = user?.first_name || ''; // Fallback to empty string if user is not available
  const last_name = user?.last_name || ''; // Fallback to empty string if user is not available

  return (
    <View>
      <View
        style={{
          padding: 10,
          paddingTop: 40,
          backgroundColor: Colors.PRIM_DARKGREEN,
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Image
            source={require('./../../assets/images/TransNoText.png')}
            style={{
              width: 70,
              height: 70,
              borderRadius: 99,
            }}
          />
          <View>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Playfair',
              }}
            >
              Welcome Back,
            </Text>
            <Text
              style={{
                fontSize: 35,
                fontFamily: 'Playfair-Bold',
              }}
            >
              {first_name} {last_name}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
