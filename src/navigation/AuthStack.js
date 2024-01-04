import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
// import HomeScreen from '../screens/HomeScreen';
import DrawerNavigator from './Drawer';
import TakeDetail from '../screens/TakeUserDetailScreen';
import AddProjectScreen from '../screens/AddProjectScreen';
// import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Drawer" component={DrawerNavigator}/>
      <Stack.Screen name="TakeDetails" component={TakeDetail}/>
      <Stack.Screen name="AddProject" component={AddProjectScreen}/>
    </Stack.Navigator>
  );
};

export default AuthStack;




