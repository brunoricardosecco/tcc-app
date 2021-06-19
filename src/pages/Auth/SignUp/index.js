import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Avatar } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';

import { showMessage } from 'react-native-flash-message';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { colors, metrics } from '../../../contants';

import styles from './styles';
import { normalize } from '../../../helpers';

export default function SignUp({ navigation }) {
  const [image, setImage] = useState(null);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const onHandleSubmit = (data) => {
    console.log(data);
  };

  const onHandlePickImage = async () => {
    try {
      const { granted } = await ImagePicker.getMediaLibraryPermissionsAsync();

      if (!granted) {
        const { granted: requestGranted } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!requestGranted) {
          showMessage({
            type: 'warning',
            icon: 'warning',
            message: 'Precisamos da sua permissão para abrir suas fotos :)',
          });
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.cancelled) {
        return;
      }

      setImage(result.uri);
    } catch (err) {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'Erro ao abrir suas fotos',
      });
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Avatar
        rounded
        size="xlarge"
        source={image && { uri: image }}
        icon={!image && { name: 'person', color: colors.grey, type: 'ioicons' }}
        overlayContainerStyle={{ backgroundColor: 'white' }}
        containerStyle={{ marginBottom: metrics.baseSpace }}
        onPress={onHandlePickImage}
      >
        <Avatar.Accessory size={normalize(32)} />
      </Avatar>
      <Controller
        name="name"
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
            placeholder="Nome completo"
            ref={null}
            autoCapitalize="words"
            value={value}
            onChangeText={(text) => onChange(text)}
            errorMessage={errors.name?.message}
          />
        )}
      />
      <Controller
        name="email"
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
        name="password"
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
            placeholder="Senha"
            ref={null}
            autoCapitalize="none"
            value={value}
            onChangeText={(text) => onChange(text)}
            errorMessage={errors.password?.message}
          />
        )}
      />
      <Controller
        name="passwordConfirmation"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Preencha este campo',
          },
          validate: (value) =>
            value === watch('password') || 'As senhas devem ser iguais',
        }}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Confirmação de senha"
            ref={null}
            autoCapitalize="none"
            value={value}
            onChangeText={(text) => onChange(text)}
            errorMessage={errors.passwordConfirmation?.message}
          />
        )}
      />
      <Button title="Cadastrar" onPress={handleSubmit(onHandleSubmit)} />
      <Button
        title="Voltar"
        type="clear"
        style={{ backgroundColor: 'transparent' }}
        containerStyle={{ marginTop: metrics.baseSpace }}
        titleStyle={{ color: colors.primaryPurple }}
        onPress={() => navigation.goBack()}
      />
    </KeyboardAwareScrollView>
  );
}
