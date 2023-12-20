// import React ,{useEffect}from 'react'
import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity,Image,StyleSheet} from 'react-native';
import SplashScreen from '../assets/images/splashscreen.png';

import {getItem} from '../helper';



const OnboardingScreen = ({navigation}) => {
  const checkUserId = async () => {
    const userId = await getItem('userId');
    console.log("helo");
    if (userId) {
      navigation.navigate('Drawer');
      return true;
    }else{
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <View style={{marginTop: 20}}>
        <Text
          style={{
            fontFamily: 'Inter-Bold',
            fontWeight: 'bold',
            fontSize: 30,
            color: '#20315f',
          }}>
        Crowd Funding
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image source={SplashScreen} style={styles.image} />
        
      </View>


      <TouchableOpacity
        style={{
          backgroundColor: '#AD40AF',
          padding: 20,
          width: '90%',
          borderRadius: 10,
          marginBottom: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => checkUserId()}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
            fontFamily: 'Roboto-MediumItalic',
          }}>
          Let's Begin
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200, 
    height: 200, 
    resizeMode: 'contain', 
  },
});

export default OnboardingScreen;
