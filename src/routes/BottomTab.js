import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../pages/App/Home';
import Rank from '../pages/App/Rank';
import Config from '../pages/App/Config';
import Profile from '../pages/App/Profile';
import AddTransaction from '../pages/App/AddTransaction';
import { colors } from '../contants';

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.primaryPurple,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 12,
  },
});

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: Platform.OS === 'ios' ? -15 : -45,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.primaryPurple,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 20,
      elevation: 12,
    }}
    activeOpacity={1}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: colors.primaryPurple,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

export default function BottomTab() {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: {
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: colors.primaryDark,
            borderWidth: 1,
            borderTopWidth: 1,
            borderColor: colors.primaryPurple,
            borderRadius: 15,
            height: 90,
            ...styles.shadow,
          },
        }}
        initialRouteName="Home"
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 15,
                }}
              >
                <Ionicons
                  name="wallet"
                  size={size * 1.3}
                  color={focused ? colors.primaryPurple : colors.grey}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Rank"
          component={Rank}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 15,
                }}
              >
                <Ionicons
                  name="trophy"
                  size={size * 1.3}
                  color={focused ? colors.primaryPurple : colors.grey}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="AddTransaction"
          component={AddTransaction}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons
                  name="add"
                  size={size * 2}
                  color={focused ? colors.white : colors.grey}
                />
              </View>
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <Tab.Screen
          name="Config"
          component={Config}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 15,
                }}
              >
                <Ionicons
                  name="settings-sharp"
                  size={size * 1.3}
                  color={focused ? colors.primaryPurple : colors.grey}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 15,
                }}
              >
                <Ionicons
                  name="person"
                  size={size * 1.3}
                  color={focused ? colors.primaryPurple : colors.grey}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
