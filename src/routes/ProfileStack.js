import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from '../pages/App/Profile';
import ChangePassword from '../pages/App/ChangePassword';

export default function ProfileStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
