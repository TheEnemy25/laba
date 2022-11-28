import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './Main';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainPage from './MainPage';
import Settings from './Settings';

const Tabs = createBottomTabNavigator();

const Footer = () => {
  return (
    <Tabs.Navigator

      screenOptions={() => ({
        tabBarActiveTintColor: "#fff",
        tabBarActiveBackgroundColor: "#008dc1",
        tabBarInactiveTintColor: "#C0C0C0",
        tabBarInactiveBackgroundColor: "#fff",
        tabBarLabelStyle: {
          textAlign: "center",
          fontSize: 15,
          fontWeight: "bold",
        },
      })}>
      <Tabs.Screen
        name="Gallery"
        component={MainPage}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="images" color={color} size={size} />;
          },
        }}
      />

      <Tabs.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="settings" color={color} size={size} />;
          },
        }}
      />
    </Tabs.Navigator>
  );
};

export default Footer;
