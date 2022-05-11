import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BuyOrShell from '../pages/App/AddTransaction/BuyOrSell';
import TransactionType from '../pages/App/AddTransaction/TransactionType';
import SearchStock from '../pages/App/AddTransaction/SearchStock';

export default function AddTransactionStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="BuyOrSell">
      <Stack.Screen
        name="BuyOrSell"
        component={BuyOrShell}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TransactionType"
        component={TransactionType}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchStock"
        component={SearchStock}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
