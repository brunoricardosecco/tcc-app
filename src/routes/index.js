import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import BottomTab from './BottomTab';
import { useAuth } from '../hooks/useAuth';

export default function Routes() {
  const { isLogged } = useAuth();

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: 'transparent',
        },
      }}
    >
      {true ? <BottomTab /> : <AuthStack />}
    </NavigationContainer>
  );
}
