import React, { useContext } from 'react'
import AuthScreen from '../mobile/screen/AuthScreen';
import MainPage from '../mobile/screen/MainPage';
import { AuthContext } from '../mobile/screen/AuthProvider';
import { View } from 'react-native';
import Footer from '../mobile/screen/Tabs';
import { NavigationContainer } from '@react-navigation/native';



const Navigator = () => {

    const { token } = useContext(AuthContext);

    return (

        <NavigationContainer>
            {(token === null) ? <AuthScreen /> : <Footer />}
        </NavigationContainer>


    )
}

export default Navigator