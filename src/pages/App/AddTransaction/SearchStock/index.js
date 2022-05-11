import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { MaskService } from 'react-native-masked-text';
import { showMessage } from 'react-native-flash-message';
import { StackActions } from '@react-navigation/native';

import { storeTransaction } from '../../../../services/requests/transaction';
import { useAuth } from '../../../../hooks/useAuth';

import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import { colors, metrics } from '../../../../constants';

export default function SearchStock({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();

  const onHandleSubmit = async (data) => {
    setIsLoading(true);
    const [day, month, year] = data.date.split('/');

    const request = {
      type: route.params.buyOrSell,
      category: route.params.transactionType,
      ticker: `${data.stock}.SAO`,
      financialInstitution: 'Any',
      date: new Date(year, month - 1, day),
      quantity: Number(data.quantity),
      price: Number(
        data.price.replace('R$', '').replace(/\./g, '').replace(',', '.')
      ),
      walletId: user.walletId,
    };

    try {
      await storeTransaction(request);
      showMessage({
        type: 'success',
        message: 'Transação registrada com sucesso!',
        icon: 'success',
        duration: 3000,
      });
      navigation.dispatch(StackActions.replace('BuyOrSell'));
      navigation.navigate('Home');
    } catch (err) {
      console.log(err.response);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        marginHorizontal: metrics.baseSpace,
        flex: 1,
        backgroundColor: colors.primaryDark,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <Controller
          name="stock"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Campo obrigatório',
            },
          }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Informe o ticker"
              ref={null}
              autoCapitalize="characters"
              value={value}
              onChangeText={(text) => onChange(text)}
              errorMessage={errors.stock?.message}
            />
          )}
        />
        <Controller
          name="date"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Campo obrigatório',
            },
          }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Informe a data"
              ref={null}
              autoCapitalize="characters"
              keyboardType="numeric"
              value={value}
              onChangeText={(text) => {
                const date = MaskService.toMask('datetime', text, {
                  format: 'DD/MM/YYYY',
                });
                onChange(date);
              }}
              errorMessage={errors.date?.message}
            />
          )}
        />
        <Controller
          name="quantity"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Campo obrigatório',
            },
          }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Informe a quantidade"
              ref={null}
              keyboardType="numeric"
              value={value}
              onChangeText={(text) => onChange(text)}
              errorMessage={errors.quantity?.message}
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Campo obrigatório',
            },
          }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Informe o preço de compra"
              ref={null}
              keyboardType="numeric"
              value={value}
              onChangeText={(text) => {
                const money = MaskService.toMask('money', text, {
                  unit: 'R$',
                  separator: ',',
                  delimiter: '.',
                });

                onChange(money);
              }}
              errorMessage={errors.price?.message}
            />
          )}
        />
        <View style={{ width: '100%' }}>
          <Button
            title="Adicionar transação"
            onPress={handleSubmit(onHandleSubmit)}
            loading={isLoading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
