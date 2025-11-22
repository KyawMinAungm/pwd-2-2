import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'


export default function Post() {
    const {id} = useLocalSearchParams()
  return (
    <View style={{flex: 1, justifyContent :"center",alignItems: "center"}}>
      <Text style={{fontSize : 24,fontWeight :"bold"}}>Post {id}</Text>
    </View>
  )
}