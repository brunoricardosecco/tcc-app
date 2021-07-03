import React from 'react';
import { Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, Controller } from 'react-hook-form';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { colors, metrics } from '../../../constants';

import styles from './styles';
import { useAuth } from '../../../hooks/useAuth';

export default function Login({ navigation }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { authenticate, isLoading } = useAuth();

  const onHandleSubmit = async ({ email, password }) => {
    authenticate({ email, password });
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
        defaultValue="tesst@teste.com"
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
        defaultValue="test123"
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
      <Button
        title="Entrar"
        onPress={handleSubmit(onHandleSubmit)}
        loading={isLoading}
        disable={isLoading}
      />
      <Button
        title="Quero me cadastrar"
        type="clear"
        style={{ backgroundColor: 'transparent' }}
        containerStyle={{ marginTop: metrics.baseSpace }}
        titleStyle={{ color: colors.primaryPurple }}
        onPress={() => navigation.navigate('SignUp')}
      />
    </KeyboardAwareScrollView>
  );
}
