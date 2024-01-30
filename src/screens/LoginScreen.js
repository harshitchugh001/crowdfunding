import React, { useState,useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import { login } from "../declarations/login";

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { setItem,getItem } from '../helper';
import { saveUserData } from '../helper';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setisLogin] = useState(false);

  
  const checkUserId = async () => {
    const userId = await getItem('userId');
    
    if (userId) {
      navigation.navigate('Drawer');
      return true;
    }
  };

  const loginfunc = async () => {
    setisLogin(true);

    const userInfo = {
      userEmail: email,
      userPassword: password,
    }
    try {
      const loginuser = await login.login(userInfo);

      console.log(loginuser);
      const [status, userId] = loginuser.split(' ');
      console.log(status);
      console.log(userId);

      if (status === 'Loginsuccess') {
        setItem('userId', userId);
        setItem('userEmail', email);
        ToastAndroid.show('login success',ToastAndroid.SHORT);
        navigation.navigate("Drawer");
        const userDetail= await login.getuserdetail(userId);
        if(userDetail && userDetail.length>0){
          saveUserData(userDetail[0]);
        }
        
       
        
        setisLogin(false);
        // if(userDetail===" "){
        //   await saveUserData(userDetail);
        //   navigation.navigate("Drawer");
        //   setisLogin(false);
        // }else{
        //   navigation.navigate("TakeDetails");
        //   setisLogin(false);
        // }   
      }
    } catch (error) {
      setisLogin(false);
      console.log(error);
    }
  }
  useEffect(() => {
    
    checkUserId();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
        </View>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
        </Text>

        <InputField

          label={'Email ID'}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <InputField
          label={'Password'}
          inputType="password"
          onChangeText={setPassword}
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => { }}
        />
        <CustomButton label={"Login"} onPress={loginfunc} disabled={isLogin} />
        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
          Or, login with ...
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
