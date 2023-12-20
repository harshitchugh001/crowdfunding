import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './src/navigation/AuthStack';
import Drawer from './src/navigation/Drawer';
// import AppStack from './src/navigation/AppStack';



function App() {
  return (
    <NavigationContainer>
      {/* <Drawer></Drawer> */}
      <AuthStack />
    </NavigationContainer>
  );
}

export default App;
