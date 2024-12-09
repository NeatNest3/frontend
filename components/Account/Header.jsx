 import { View, Text, Image } from 'react-native';
import React from 'react';
import { Colors } from './../../constants/Colors';
import { useGlobalParams } from '../../context/GlobalParamsContext';

export default function Header() {
  const { globalParams } = useGlobalParams();

  const userFirstName = globalParams.user && globalParams.user.first_name ? globalParams.user.first_name : "User";
  const userLastName = globalParams.user && globalParams.user.last_name ? globalParams.user.last_name : "";

  return (
    <View style={{
      padding: 10,
      paddingTop: 40,
      backgroundColor: Colors.PRIM_DARKGREEN,
      borderBottomWidth: 1,
    }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}>
        <Image 
          source={require('./../../assets/images/TransNoText.png')} 
          style={{
            width: 70,
            height: 70,
            borderRadius: 99,
          }} 
        />
        <View>
          <Text style={{
            fontSize: 20,
            fontFamily: 'Playfair',
          }}>
            Account Name:
          </Text>
          <Text style={{
            fontSize: 35,
            fontFamily: 'Playfair-Bold',
          }}>
            {userFirstName} {userLastName}
          </Text>
        </View>
      </View>
    </View>
  );
}
