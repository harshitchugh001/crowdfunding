// import { View, Text } from 'react-native'
import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../screens/HomeScreen';
import CustomDrawer from '../components/CustomDrawer';
import Icon from 'react-native-vector-icons/AntDesign';
import Investment from '../screens/InvestmentsScreen';
import ProfileDisplay from '../screens/ProfiledisplayScreen';
import Projects from '../screens/ProjectsScreen'; 
// import TakeUserDetailScreen from '../screens/TakeUserDetailScreen';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  
  
  return (

    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#7d5fff',
        drawerActiveTintColor: '#FFFFFF',
        drawerLabelStyle: {
        marginLeft: -20,
        },
      }}>
      <Drawer.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerShown: false,
          title: 'Home',
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="home" size={18} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Projects"
        component={Projects}
        options={{
          title: 'Your Projects',
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="paperclip" size={18} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name='main'
        component={Investment}
        options={{
          title: 'Investments',
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="wallet" size={18} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name='main1'
        component={ProfileDisplay}
        options={{
          title: 'Profile',
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="user" size={18} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name='Demo'
        component={TakeUserDetailScreen}
        options={{
          title: 'Testing',
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="user" size={18} color={color} />
          ),
        }}
      /> */}

     


    </Drawer.Navigator>


  )
}

export default DrawerNavigator;