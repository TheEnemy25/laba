import { Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { createContext } from "react";


const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [token, setToken] = useState();



    const signup = (email, name, password) => {
        const payload =
        {
            email,
            name,
            password,
        }
        fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })

            .then(async res => {
                const jsonRes = await res.json();
                try {
                    if (res.status == 200) {
                        setIsError(false);
                        setMessage(jsonRes.message);
                    }
                    else {
                        setIsError(true);
                        setMessage(jsonRes.message);
                    }
                }
                catch (err) {
                    console.log(err);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };



    const login = (email, password) => {

        const payload = {
            email,
            password,
        };
        fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(async res => {
                try {
                    const jsonRes = await res.json();
                    if (res.status == 200) {


                        AsyncStorage.setItem('Token', jsonRes.token);
                        AsyncStorage.setItem('User', JSON.stringify(jsonRes.user.id));


                        setToken(jsonRes.token);
                    }
                    else {
                        setIsError(true);
                        setMessage(jsonRes.message);
                    }
                }
                catch (err) {
                    console.log(err);
                }

            })
            .catch(err => {
                console.log(err)
            })
    }


    const isLoggedIn = async () => {
        const storedToken = await AsyncStorage.getItem('Token');



        setToken(storedToken);
    }

    const logout = () => {
        AsyncStorage.removeItem('Token');
        AsyncStorage.removeItem('User')
        setToken(null);
    }



    useEffect(() => {
        isLoggedIn();
    }, [])

    return (
        <AuthContext.Provider value={{ token, login, logout, signup, isError, setIsError, message, setMessage }}>
            {children}
        </AuthContext.Provider>
    );


}