import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  ToastAndroid,
  Text,
  TouchableOpacity,
} from 'react-native';

import { crowdfunding } from "../declarations/crowdfunding";
import { login } from "../declarations/login";
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const register = async () => {
    try {
      // console.log({ name, email, password, confirmPassword });
      // Add registration logic here
      setIsRegistering(true);
      const userInfo={
        userName:name,
        userEmail:email,
        userPassword:password,
        userConfirmPassword:confirmPassword,
      }

      console.log(userInfo);
      console.log(crowdfunding);
      // const registeruser1 =await crowdfunding.createLoginCanisterByGroup("lllll");
      // console.log(registeruser1);
      console.log(login);

      
      const registeruser =await login.signUp(userInfo);

      console.log(registeruser);

      if (registeruser === 'User successfully registered') {
        ToastAndroid.show('Registration successful. You can now login.', ToastAndroid.SHORT);
        navigation.goBack();
        setIsRegistering(false);
      }else if (registeruser === 'user is already registered') {
        ToastAndroid.show('User is already registered.', ToastAndroid.SHORT);
        setIsRegistering(false);
        } else if (registeruser === 'Password and confirm password are not the same') {
          ToastAndroid.show('Password and confirm password are not the same.', ToastAndroid.SHORT);
          setIsRegistering(false);
        } else {
         
          ToastAndroid.show('Registration failed. Please try again.', ToastAndroid.SHORT);
          setIsRegistering(false);
        }

      
    } catch (error) {
      console.error(error);
      setIsRegistering(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center',marginTop:80 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: 25,
          paddingVertical: 30,
          marginTop:80
        }}>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Register
        </Text>

        <InputField
          label={'Full Name'}
          placeholder={"Enter your name here"}
          onChangeText={setName}
        />

        <InputField
          label={'Email ID'}
          keyboardType="email-address"
          onChangeText={setEmail}
        />

        <InputField
          label={'Password'}
          secureTextEntry={true}
          onChangeText={setPassword}
        />

        <InputField
          label={'Confirm Password'}
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
        />
        
        <CustomButton label={'Register'} onPress={register} disabled={isRegistering} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
