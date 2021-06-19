import React from 'react';
import { Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, Controller } from 'react-hook-form';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { colors, metrics } from '../../../contants';

import styles from './styles';

export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onHandleSubmit = (data) => {
    console.log(data);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text>Login</Text>
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Preencha este campo',
          },
          pattern: {
            value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
            message: 'Preencha o email corretamente',
          },
        }}
        name="email"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="E-mail"
            ref={null}
            autoCapitalize="none"
            keyboardType="email-address"
            value={value}
            onChangeText={(text) => onChange(text)}
            errorMessage={errors.email?.message}
          />
        )}
      />
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Preencha este campo',
          },
        }}
        name="password"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Senha"
            ref={null}
            autoCapitalize="none"
            value={value}
            onChangeText={(text) => onChange(text)}
            errorMessage={errors.password?.message}
          />
        )}
      />
      <Button title="Entrar" onPress={handleSubmit(onHandleSubmit)} />
      <Button
        title="Quero me cadastrar"
        type="clear"
        style={{ backgroundColor: 'transparent' }}
        containerStyle={{ marginTop: metrics.baseSpace }}
        titleStyle={{ color: colors.primaryPurple }}
      />
    </KeyboardAwareScrollView>
  );
}
