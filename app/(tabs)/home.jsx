import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import Heading from './../../components/Home/Heading'
import HomeCalendar from './../../components/Home/Calendar'

export default function home() {
  return (
    <View>
      <StatusBar style="dark"/>
      <Heading />
      <HomeCalendar />
    </View>
  )
}