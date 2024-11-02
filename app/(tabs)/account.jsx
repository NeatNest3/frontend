import { View, Text } from 'react-native'
import React from 'react'
import Header from './../../components/Account/Header'
import AccountInfo from '../../components/Account/AccountInfo'
import Homes from '../../components/Account/Homes'
import Payment from '../../components/Account/Payment'
import CustomerSupport from '../../components/Account/CustomerSupport'


const account = () => {
  return (
    <View>
      <Header />
      <AccountInfo/>
      <Homes/>
      <Payment/>
      <CustomerSupport/>
    </View>
  )
}

export default account