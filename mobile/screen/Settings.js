import React from "react";
import { View } from "react-native";
import LogoutButton from "./LogOutButton";
import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';


const Settings = () => {
    return (
        <View style={styles.container}>
            <LogoutButton />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#C0C0C0",
        height: "100%",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#ffffff",
        padding: 10,
    }
})


export default Settings;





