import React, { useState, useContext } from 'react';
import { ImageBackground, View, Text, TouchableOpacity, TextInput, Alert, Button, StyleSheet } from 'react-native';
import { AuthContext } from './AuthProvider';



const AuthScreen = () => {


    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValidError] = useState('');
    const [emailValid, setEmailValidError] = useState('')
    const [emailValBool, setEmailValBool] = useState(false);


    const [isLogin, setIsLogin] = useState(true);

    const { login, signup, message, setMessage, isError, setIsError } = useContext(AuthContext);

    const handlePassvord = (vl) => {

        if (vl.length === 0) {
            setPasswordValidError('password must be entered');
            setEmailValBool(true);


        } else if (vl.length < 8) {
            setPasswordValidError('Password must be bigger than 8 symbols');
            setEmailValBool(true);
        }
        else {
            setPasswordValidError('')
            setEmailValBool(false);


        }
    }

    const handleValidEmail = val => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (val.length === 0) {
            setEmailValidError('email address must be enter');
            setEmailValBool(true)

        } else if (reg.test(val) === false) {
            setEmailValidError('enter valid email address');
            setEmailValBool(true);
        } else if (reg.test(val) === true) {
            setEmailValidError('');
            setEmailValBool(false)
        }
    };


    const onChangeHandler = () => {
        setIsLogin(!isLogin);
        setMessage('');
    };

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }



    return (

        <ImageBackground source={require('../public/images/back.png')} style={styles.image}>
            <View style={styles.card}>
                <Text style={styles.heading}>{isLogin ? 'Login' : 'Signup'}</Text>
                <View style={styles.form}>
                    <View style={styles.inputs}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(value) => { setEmail(value); handleValidEmail(value) }}>
                        </TextInput>
                        {emailValid ? <Text style={{ color: 'red' }}>{emailValid}</Text> : null}

                        {!isLogin && <TextInput style={styles.input} placeholder="Name" onChangeText={setName}></TextInput>}

                        <TextInput
                            secureTextEntry={true}
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={(vl) => { setPassword(vl); handlePassvord(vl) }}>
                        </TextInput>
                        {passwordValid ? <Text style={{ color: 'red' }}>{passwordValid}</Text> : null}

                        <Text style={[styles.message, { color: isError ? 'red' : 'green' }]}>{message ? getMessage() : null}</Text>
                        <TouchableOpacity disabled={emailValBool} style={styles.button} onPress={() => {
                            if (isLogin) {
                                login(email, password)
                            }
                            else {
                                signup(email, name, password)
                                setIsLogin(true);
                            }
                        }}>
                            <Text style={styles.buttonText}>Done</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonAlt} onPress={onChangeHandler}>
                            <Text style={styles.buttonAltText}>{isLogin ? 'Sign Up' : 'Log In'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        width: '80%',
        marginTop: '40%',
        borderRadius: 20,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '10%',
        marginTop: '5%',
        marginBottom: '30%',
        color: 'black',
    },
    form: {
        justifyContent: 'space-between',
        paddingBottom: '5%',
    },
    inputs: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10%',
    },
    input: {
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: '#939393',
        paddingTop: 10,
        fontSize: 15,
        minHeight: 40,
    },
    button: {
        width: '80%',
        backgroundColor: '#008dc1',
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500'
    },
    buttonAlt: {
        width: '80%',
        borderWidth: 1,
        height: 40,
        borderRadius: 50,
        borderColor: '#939393',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonAltText: {
        color: '#939393',
        fontSize: 16,
        fontWeight: '500',
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },
    valEml:
    {
        color: 'red'
    },
    valPass:
    {
        color: 'red',
        marginTop: 10
    },
});

export default AuthScreen;