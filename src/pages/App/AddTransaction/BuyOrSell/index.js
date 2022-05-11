import React from 'react';
import { View, SafeAreaView } from 'react-native';
import Button from '../../../../components/Button';
import { colors, metrics } from '../../../../constants';

export default function BuyOrSell({ navigation }) {
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
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        <View style={{ width: '45%' }}>
          <Button
            title="Compra"
            onPress={() =>
              navigation.navigate('TransactionType', { buyOrSell: 'BUY' })
            }
          />
        </View>
        <View style={{ width: '45%' }}>
          <Button
            title="Venda"
            onPress={() =>
              navigation.navigate('TransactionType', {
                buyOrSell: 'SELL',
              })
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
