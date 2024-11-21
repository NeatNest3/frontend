import { View, Image } from 'react-native'
import React from 'react'
import {Colors} from './../../constants/Colors'

export default function Header() {

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
        justifyContent:'center',
      }}>
          <Image source={require('./../../assets/images/TransNoText.png')} style={{
            width:100,
            height:100,
            borderRadius:99,
            marginBottom:6,
            marginTop:16

          }} />
        </View>
    </View>
  )
}