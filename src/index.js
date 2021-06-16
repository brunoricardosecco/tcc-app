import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from './contants';

import Routes from './routes';

export default function App() {
  return (
    <View style={{ backgroundColor: colors.primaryDark, flex: 1 }}>
      <StatusBar translucent style="light" backgroundColor="transparent" />
      <Routes />
    </View>
  );
}
