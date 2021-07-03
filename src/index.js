/* eslint-disable react/style-prop-object */
import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FlashMessage from 'react-native-flash-message';

import { colors } from './constants';

import Routes from './routes';
import AppProvider from './context';

export default function App() {
  if (__DEV__) {
    import('./ReactotronConfig').then(() =>
      console.log('Reactotron Configured')
    );
  }

  return (
    <AppProvider>
      <View style={{ backgroundColor: colors.primaryDark, flex: 1 }}>
        <StatusBar translucent style="light" backgroundColor="transparent" />
        <Routes />
        <FlashMessage position="top" />
      </View>
    </AppProvider>
  );
}
