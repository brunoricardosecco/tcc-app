import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Rank from '../pages/App/Rank';
import UserProfile from '../pages/App/UserProfile';

export default function RankStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Rank">
      <Stack.Screen
        name="Rank"
        component={Rank}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
