import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  Text
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {removeItem,removeUserData } from '../helper';
import { useNavigation } from '@react-navigation/native';




const {width} = Dimensions.get('screen');


const CustomDrawer = props => {
    const navigation = useNavigation();

    const handleLogout = async  () => {
        console.log("logout");
        await removeItem('userId');
        await removeUserData();
    
        navigation.navigate('Login');
        
      };
    
  return (
    <DrawerContentScrollView {...props}>
    <ImageBackground source={require('../assets/images/drawer-cover.jpeg')} style={{height: 140}}>
      <Image source={require('../assets/images/user.jpg')} style={styles.userImg} />
    </ImageBackground>
    <View style={styles.drawerListWrapper}>
      <DrawerItemList {...props} />
    </View>

    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <FontAwesome5Icon name="sign-out-alt" size={20} color="#000" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
  </DrawerContentScrollView>
);
};

export default CustomDrawer;

const styles = StyleSheet.create({
  userImg: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    position: 'absolute',
    left: width / 2 - 110,
    bottom: -110 / 2,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  drawerListWrapper: {
    marginTop: 65,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginLeft: 16,
  },

  logoutText: {
    marginLeft: 16,
    fontSize: 16,
  },
});