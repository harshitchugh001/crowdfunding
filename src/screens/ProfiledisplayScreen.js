import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { getUserData } from '../helper';

export default function ProfiledisplayScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        setUser(userData[0]);
        console.log('user display', userData[0]);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
            Hello {user? user.firstname : 'user'}
          </Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <ImageBackground
              source={require('../assets/images/user-profile.jpg')}
              style={{width: 35, height: 35}}
              imageStyle={{borderRadius: 25}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.userImageContainer}>
          <Image
            source={require('../assets/images/user.jpg')}
            style={styles.userImg}
          />
          <Text style={styles.username}>{user ? user.username : 'Username'}</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>User Detail</Text>
          <View style={styles.boxContent}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>First Name</Text>
              <Text style={styles.detailValue}>{user ? user.firstname : '-'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Last Name</Text>
              <Text style={styles.detailValue}>{user ? user.lastname : '-'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Qualification</Text>
              <Text style={styles.detailValue}>{user ? user.qualification : '-'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Nationality</Text>
              <Text style={styles.detailValue}>{user ? user.nationality : '-'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>Description</Text>
          <View style={styles.descriptionContent}>
            <Text style={styles.description}>{user ? user.description : ''}</Text>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>Contact Detail</Text>
          <View style={styles.contactContent}>
            <Text style={styles.contactItem}>Email: {user ? user.userEmail : ''}</Text>
            <Text style={styles.contactItem}>Phone Number: {user ? user.phonenumber : ''}</Text>
            <Text style={styles.contactItem}>LinkedIn: {user ? user.linkedInid : ''}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    padding: 20,
  },
  userImageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  userImg: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  username: {
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
    marginBottom: 20,
  },
  box: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  boxTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
    backgroundColor: '#000',
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    padding: 10,
  },
  boxContent: {
    padding: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  detailValue: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
  },
  descriptionContent: {
    padding: 15,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'justify',
  },
  contactContent: {
    padding: 15,
  },
  contactItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
});
