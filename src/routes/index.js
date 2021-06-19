import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import BottomTab from './BottomTab';
import { useIsLogged } from '../hooks/useIsLogged';

export default function Routes() {
  const { isLogged } = useIsLogged();

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
