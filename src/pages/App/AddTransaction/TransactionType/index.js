import React from 'react';
import { View, SafeAreaView } from 'react-native';
import Button from '../../../../components/Button';
import { colors, metrics } from '../../../../constants';

export default function TransactionType({ navigation, route }) {
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
        <View style={{ width: '100%' }}>
          <Button
            title="Ações, FIIs, ETFs"
            onPress={() =>
              navigation.navigate('SearchStock', {
                ...route.params,
                transactionType: 'STOCKS',
              })
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
