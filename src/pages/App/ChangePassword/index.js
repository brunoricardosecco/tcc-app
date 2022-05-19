import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, SafeAreaView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import Button from '../../../components/Button';
import Input from '../../../components/Input';

import { colors, metrics } from '../../../constants';
import styles from './styles';
import { useAuth } from '../../../hooks/useAuth';

export default function ChangePassword({ navigation }) {
  const { changePassword, isLoading } = useAuth();
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  const goBack = () => navigation.goBack();

  const onHandleSubmit = (data) => {
    changePassword(
      {
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      goBack
    );
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <SafeAreaView />
      <Text style={styles.title}>Alterar senha</Text>
      <Controller
        name="currentPassword"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Preencha este campo',
          },
        }}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Insira sua senha atual"
            ref={null}
            autoCapitalize="none"
            value={value}
            onChangeText={(text) => onChange(text)}
            errorMessage={errors.currentPassword?.message}
          />
        )}
      />
      <Controller
        name="newPassword"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Preencha este campo',
          },
        }}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Insira sua nova senha"
            ref={null}
            autoCapitalize="none"
            value={value}
            onChangeText={(text) => onChange(text)}
            errorMessage={errors.newPassword?.message}
          />
        )}
      />
      <Controller
        name="newPasswordConfirmation"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Preencha este campo',
          },
          validate: (value) => {
            const { newPassword } = getValues();
            return value === newPassword || 'As senhas não conferem';
          },
        }}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Confirme sua nova senha"
            ref={null}
            autoCapitalize="none"
            value={value}
            onChangeText={(text) => onChange(text)}
            errorMessage={errors.newPasswordConfirmation?.message}
          />
        )}
      />
      <Button
        title="Alterar senha"
        onPress={handleSubmit(onHandleSubmit)}
        loading={isLoading}
      />
      <Button
        title="Voltar"
        type="clear"
        style={{ backgroundColor: 'transparent' }}
        containerStyle={{ marginTop: metrics.baseSpace }}
        titleStyle={{ color: colors.primaryPurple }}
        onPress={goBack}
      />
    </KeyboardAwareScrollView>
  );
}
