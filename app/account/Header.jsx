import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import {Colors} from './../../constants/Colors'
import { useNavigation } from 'expo-router'

export default function Header() {

  
  const navigation = useNavigation();

  useEffect(()=>{
    navigation.setOptions({
      headerTitle:' ',
      headerShown:true,
      headerBackTitle:'Return',
    })
  }, [navigation])

  return (
    <View style={{
      backgroundColor:Colors.PRIM_DARKGREEN,
      borderBottomLeftRadius:10,
      borderBottomRightRadius:10,
      }}>
      <View style={{
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
      }}>
          <Image source={require('./../../assets/images/TransNoText.png')} style={{
            width:35,
            height:35,
            borderRadius:99,
            marginBottom:10

          }} />
        </View>
    </View>
  )
}