import { View, Text } from 'react-native'
import React from 'react'
import Header from './../../components/Account/Header'
import MainBody from '../../components/Account/MainBody'


const account = () => {
  return (
    <View>
      <Header />
      <MainBody/>
    </View>
  )
}

export default account