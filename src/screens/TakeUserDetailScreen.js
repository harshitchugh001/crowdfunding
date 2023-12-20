import React, { useState } from 'react';
import {
    View,
    Text,
    Dimensions,
    Image,
    TextInput,
    ToastAndroid,
    Button,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getItem, saveUserData } from '../helper';
import { login } from "../declarations/login";
import CustomButton from '../components/CustomButton';


const { width } = Dimensions.get('screen');

export default function TakeUserDetailScreen() {
    const navigation = useNavigation();
    const [isSubmit, setisSubmit] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        firstname: '',
        lastname: '',
        description: '',
        phonenumber: '',
        nationality: '',
        userImage: '',
        qualification: '',
        linkedInid: '',
    });

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async () => {
        if (
            formData.username === '' ||
            formData.firstname === '' ||
            formData.lastname === '' ||
            formData.nationality === '' ||
            formData.qualification === '' ||
            formData.linkedInid === ''
        ) {
            Alert.alert('Please fill in all the required fields.');
        } else if (!/^\d+$/.test(formData.phonenumber)) {
            Alert.alert('Please enter a valid phone number.');
        } else {
            setisSubmit(true);
            let email = await getItem('userEmail');
            let userid = await getItem("userId");
            const userData = {
                userId: userid,
                username: formData.username,
                firstname: formData.firstname,
                lastname: formData.lastname,
                description: formData.description,
                phonenumber: formData.phonenumber,
                userEmail: email,
                nationality: formData.nationality,
                projectsId: [],
                investedId: [],
                userImage: "Image of user",
                qualification: formData.qualification,
                linkedInid: formData.linkedInid,
            }
            try {
                const userDetail = await login.userdetail(userid, userData);

                console.log(userDetail);
                console.log(userData);
                if (userDetail === "user details saved") {
                    await saveUserData(userData);
                    ToastAndroid.show('user details saved', ToastAndroid.SHORT);
                    console.log("hello");
                    setisSubmit(false);
                    navigation.navigate('Drawer');
                    
                }
                else{
                    setisSubmit(false);
                }
            }catch(error){
                setisSubmit(false);
                console.log(error);
                
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container} style={{ flex: 1, backgroundColor: '#fff' }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20,
                }}>
                <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium' }}>
                    Hello User Enter Your Details Here:-
                </Text>
                {/* <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <ImageBackgroundTouchableOpacity,
    ImageBackground,
                        source={require('../assets/images/user-profile.jpg')}
                        style={{ width: 35, height: 35 }}
                        imageStyle={{ borderRadius: 25 }}
                    />
                </TouchableOpacity> */}
            </View>

            <View style={styles.userImageContainer}>
                <Image source={require('../assets/images/user.jpg')} style={styles.userImg} />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Username:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.username}
                    onChangeText={(text) => handleInputChange('username', text)}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>First Name:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.firstname}
                    onChangeText={(text) => handleInputChange('firstname', text)}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Last Name:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.lastname}
                    onChangeText={(text) => handleInputChange('lastname', text)}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Description:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.description}
                    onChangeText={(text) => handleInputChange('description', text)}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Phone Number:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.phonenumber}
                    onChangeText={(text) => handleInputChange('phonenumber', text)}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Nationality:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.nationality}
                    onChangeText={(text) => handleInputChange('nationality', text)}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Qualification:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.qualification}
                    onChangeText={(text) => handleInputChange('qualification', text)}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>LinkedIn ID:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.linkedInid}
                    onChangeText={(text) => handleInputChange('linkedInid', text)}
                />
            </View>
            <CustomButton label={"Submit"} onPress={handleSubmit} disabled={isSubmit} />

            <Button title="Submit" onPress={handleSubmit} disabled={isSubmit} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 8,
    },
    userImageContainer: {
        alignItems: 'center', 
    },
    userImg: {
        width: 110,
        height: 110,
        borderRadius: 110 / 2,
        borderWidth: 4,
        borderColor: '#FFFFFF',
    },
});