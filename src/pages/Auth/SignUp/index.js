import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Avatar } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { showMessage } from 'react-native-flash-message';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Picker from '../../../components/Picker';

import {
  getStates as getStatesRequest,
  getCities as getCitiesRequest,
} from '../../../services/requests/address';
import { colors, metrics } from '../../../contants';
import styles from './styles';
import { normalize } from '../../../helpers';
import { useAuth } from '../../../hooks/useAuth';

export default function SignUp({ navigation }) {
  const [image, setImage] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const { signUp, isLoading } = useAuth();
  const {
    handleSubmit,
    control,
    watch,
    getValues,
    formState: { errors },
  } = useForm();
  const stateId = watch('state');

  const goBack = () => navigation.goBack();

  const onHandleSubmit = (data) => {
    signUp({
      ...data,
      image,
      goBack,
    });
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
        quality: 0.2,
      });

      if (!result.cancelled) {
        // ImagePicker saves the taken photo to disk and returns a local URI to it
        const localUri = result.uri;
        const filename = localUri.split('/').pop();

        // Infer the type of the image
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;
        console.log({ uri: localUri, filename, type });
        setImage({
          uri:
            Platform.OS === 'android'
              ? localUri
              : localUri.replace('file://', ''),
          filename,
          type,
          name: filename,
        });
      }
    } catch (err) {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'Erro ao abrir suas fotos',
      });
    }
  };

  const getStates = async () => {
    try {
      const {
        data: { states: receivedStates },
      } = await getStatesRequest();
      const formattedStates = receivedStates.map((state) => ({
        label: `${state.name}`,
        value: state.id,
      }));

      setStates(formattedStates);
    } catch (error) {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'Erro ao recuperar os estados',
      });
    }
  };

  const getCities = async () => {
    try {
      const {
        data: { cities: receivedCities },
      } = await getCitiesRequest({ stateId });
      const formattedCities = receivedCities.map((state) => ({
        label: `${state.name}`,
        value: state.id,
      }));
      setCities(formattedCities);
    } catch (error) {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'Erro ao recuperar as cidades',
      });
    }
  };

  useEffect(() => {
    getStates();
  }, []);

  useEffect(() => {
    if (stateId) {
      getCities();
    }
  }, [stateId]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Avatar
        rounded
        size="xlarge"
        source={image && { uri: image.uri }}
        icon={!image && { name: 'person', color: colors.grey, type: 'ioicons' }}
        overlayContainerStyle={{ backgroundColor: 'white' }}
        containerStyle={{ marginBottom: metrics.baseSpace }}
        onPress={onHandlePickImage}
      >
        <Avatar.Accessory size={normalize(32)} onPress={onHandlePickImage} />
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
        name="state"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Preencha este campo',
          },
        }}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <Picker
            onValueChange={(v) => onChange(v)}
            value={value}
            items={states}
            errorMessage={errors.state?.message}
          />
        )}
      />
      <Controller
        name="city"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Preencha este campo',
          },
        }}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <Picker
            onValueChange={(v) => onChange(v)}
            value={value}
            items={cities}
            errorMessage={errors.city?.message}
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
      <Button
        title="Cadastrar"
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
