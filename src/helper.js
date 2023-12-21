import AsyncStorage from '@react-native-async-storage/async-storage';

// Set data in AsyncStorage
export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting ${key} in AsyncStorage:`, error);
  }
};

// Remove data from AsyncStorage
export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from AsyncStorage:`, error);
  }
};

// Get data from AsyncStorage
export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    console.error(`Error getting ${key} from AsyncStorage:`, error);
    return null;
  }
};


// Save user data to AsyncStorage
export const saveUserData = async (userData) => {
  try {
    await setItem('userData', userData);
  } catch (error) {
    console.error('Error saving user data to AsyncStorage:', error);
  }
};

// Retrieve user data from AsyncStorage
export const getUserData = async () => {
  try {
    const userData = await getItem('userData');
    return userData;
  } catch (error) {
    console.error('Error retrieving user data from AsyncStorage:', error);
    return null;
  }
};

export const removeUserData = async () => {
  try {
    await removeItem('userData');
  } catch (error) {
    console.error('Error removing user data from AsyncStorage:', error);
    return null;
  }
};




///how to use get and save userdata object

// const userData = {
//   username: 'example_user',
//   firstName: 'John',
//   lastName: 'Doe',
//   // Add other user data fields as needed
// };

// saveUserData(userData);

// // Retrieve user data
// const retrievedUserData = await getUserData();

// if (retrievedUserData) {
//   // Use the retrievedUserData as needed
//   console.log('Retrieved user data:', retrievedUserData);
// } else {
//   console.log('User data not found in AsyncStorage.');
// }


// Authenticate user by storing data in AsyncStorage during sign-in
// export const authenticate = async (response, next) => {
//   await setItem('token', response.data.token);
//   console.log(response.data.user);
//   await setItem('user', response.data.user);
//   next();
// };

// // Check if the user is authenticated and get user info from AsyncStorage
// export const isAuth = async () => {
//   const token = await getItem('token');
//   if (token) {
//     const user = await getItem('user');
//     if (user) {
//       return user;
//     }
//   }
//   return false;
// };

// // Sign out the user by removing data from AsyncStorage
// export const signout = async (callback) => {
//   await removeItem('token');
//   await removeItem('user');
//   if (typeof callback === 'function') {
//     callback();
//   }
// };

// // Update user info in AsyncStorage
// export const updateUser = async (response, next) => {
//   console.log('UPDATE USER IN AsyncStorage HELPERS', response);
//   const user = response.data;
//   await setItem('user', user);
//   next();
// };


