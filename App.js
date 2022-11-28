
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { AuthProvider } from './mobile/screen/AuthProvider';
import Navigator from './components/navigator';
// import Video from 'react-native-video';

const App = () => {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  )
};




export default App;

// import {NavigationContainer} from '@react-navigation/native';
// import React from 'react';
// import {Text, View} from 'react-native';
// import Main from './src/screen/Main';
// import Footer from './src/screen/Tabs';

// <NavigationContainer>
//   <Footer />
// </NavigationContainer>
