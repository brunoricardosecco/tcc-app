import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import BottomTab from './BottomTab';

export default function Routes() {
  const isLogged = false;

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: 'transparent',
        },
      }}
    >
      {isLogged ? <BottomTab /> : <AuthStack />}
    </NavigationContainer>
  );
}
