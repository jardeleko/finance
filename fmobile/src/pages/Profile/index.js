import { View, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import User from '../../components/User'

export default function Profile() {
  return (
    <View style={styles.container}>
      <Header />
      <User />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor:'#232323',
  },
})