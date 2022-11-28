import React, { useContext } from 'react'
import { Text, TouchableOpacity } from "react-native";
import { AuthContext } from "./AuthProvider";


const LogoutButton = () => {
    const { logout } = useContext(AuthContext);

    return (
        <TouchableOpacity

            onPress={() => {
                logout();
            }}
            style={{ width: "100%", backgroundColor: "#008dc1", padding: 10 }}
        >

            <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
                Log out
            </Text>
        </TouchableOpacity>
    )
};


export default LogoutButton;