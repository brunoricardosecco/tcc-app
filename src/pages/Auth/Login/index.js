import React from 'react';
import { View, Text } from 'react-native';

import Button from '../../../components/Button';
import { colors, metrics } from '../../../contants';

import styles from './styles';

export default function Login() {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Entrar" />
      <Button
        title="Quero me cadastrar"
        type="clear"
        style={{ backgroundColor: 'transparent' }}
        containerStyle={{ marginTop: metrics.baseSpace }}
        titleStyle={{ color: colors.primaryPurple }}
      />
    </View>
  );
}
