import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import ConfirmEmail from '../pages/Auth/ConfirmEmail';

export default function AuthStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ConfirmEmail"
        component={ConfirmEmail}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
