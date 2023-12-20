import { View, Text } from 'react-native'
import React,{useEffect} from 'react'

import {getUserData} from '../helper'

export default function ProfiledisplayScreen() {


  const UserData = async ()=>{
    
    const user = await getUserData();
    console.log("user desplay",user);



  }

  useEffect(() => {
    UserData();
  }, [])
  


  return (
    <View>
      <Text>ProfiledisplayScreen</Text>
    </View>
  )
}