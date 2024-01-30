import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { getItem, saveUserData } from '../helper';
import { login } from "../declarations/login";
import { FAB } from 'react-native-elements';

export default function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState(null);



  const getData = async () => {
    // const usertest=await getUserData();
    // console.log("test",usertest);
    const userId = await getItem('userId');
    const userDetail = await login.getuserdetail(userId);
    await saveUserData(userDetail);
    
    if (userDetail && userDetail.length > 0) {
      setUserData(userDetail[0]);

    } else {
      console.log("details not present");
      navigation.navigate("TakeDetails");
    }
  };
  const onFabPress = () => {
    console.log('FAB Pressed');
    // Add your navigation or action here
    navigation.navigate("AddProject");
  };


  useEffect(() => {
    getData();
  }, []);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={{ padding: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium' }}>
            Hello {userData ? userData.firstname : 'user'}
          </Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <ImageBackground
              source={require('../assets/images/user-profile.jpg')}
              style={{ width: 35, height: 35 }}
              imageStyle={{ borderRadius: 25 }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <FAB
        title="+"
        placement="right"
        onPress={onFabPress}
        color="#03A9F4"
        size="large"
        containerStyle={{
          width: 68, 
          height: 70, 
          borderRadius: 35, 
          position: 'absolute',
          bottom: 55,
          right: 55,
          shadowOpacity:10,
        }}
        titleStyle={{
          fontSize: 30, 
          fontWeight: 'bold',
        }}
      />














    </SafeAreaView>
  );
}


