import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, Text, SafeAreaView, View, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { LineChart } from 'react-native-chart-kit';
import { MaskService } from 'react-native-masked-text';

import { useWallet } from '../../../hooks/useWallet';
import { useAuth } from '../../../hooks/useAuth';
import {
  getWalletYears as getWalletYearsService,
  getWalletYearsProfit as getWalletYearsProfitService,
} from '../../../services/requests/transaction';

import { colors, metrics } from '../../../constants';
import { normalize } from '../../../helpers';
import styles, { pickerStyle } from './styles';

export default function Home({ navigation }) {
  const { investedAmount, getWallet, totalAssetPercent, totalAsset } =
    useWallet();
  const { user } = useAuth();
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [chartValues, setChartValues] = useState({
    months: [],
    walletPercents: [],
  });

  const getWalletYears = useCallback(async () => {
    try {
      const { data } = await getWalletYearsService(user.walletId);
      const formattedYears = data?.map((year) => ({
        label: year,
        value: year,
      }));

      formattedYears.length > 0 && setSelectedYear(formattedYears[0].value);

      setYears(formattedYears);
    } catch (err) {
      console.log(err);
    }
  }, [user.walletId]);

  const getWalletYearsProfit = useCallback(async () => {
    try {
      const { data } = await getWalletYearsProfitService(
        user.walletId,
        selectedYear
      );
      setChartValues({
        months: data.months,
        walletPercents: data.walletPercent,
      });
    } catch (err) {
      console.log(err);
    }
  }, [user.walletId, selectedYear]);

  useEffect(() => {
    if (selectedYear !== '' && user.walletId !== '') {
      getWalletYearsProfit(user.walletId, selectedYear);
    }
  }, [selectedYear, user.walletId, getWalletYearsProfit]);

  useEffect(() => {
    if (user.walletId !== '') {
      getWallet(user.walletId);
      getWalletYears();
    }
  }, [getWalletYears, user.walletId, getWallet]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (selectedYear !== '' && user.walletId !== '') {
        getWalletYearsProfit(user.walletId, selectedYear);
      }
      if (user.walletId !== '') {
        getWallet(user.walletId);
        getWalletYears();
      }
    });

    return unsubscribe;
  }, [
    getWallet,
    getWalletYears,
    getWalletYearsProfit,
    navigation,
    selectedYear,
    user.walletId,
  ]);

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={{ marginBottom: normalize(50) }}>
          <View style={styles.profitCircle(totalAssetPercent > 0)}>
            <Text style={styles.profitLabel}>{`Rendimento\nPatrimônial`}</Text>
            <Text style={styles.profitValue}>{`${totalAssetPercent.toFixed(
              2
            )}%`}</Text>
          </View>
          <View style={{ marginTop: metrics.baseSpace * 2 }}>
            <View style={styles.containerRow}>
              <Text style={styles.baseText}>Patrimônio atual: </Text>
              <Text style={styles.baseText}>{`${MaskService.toMask(
                'money',
                totalAsset,
                {
                  unit: 'R$',
                  separator: ',',
                  delimiter: '.',
                }
              )}`}</Text>
            </View>
            <View style={styles.containerRow}>
              <Text style={styles.baseText}>Patrimônio investido: </Text>
              <Text style={styles.baseText}>
                {MaskService.toMask('money', investedAmount, {
                  unit: 'R$',
                  separator: ',',
                  delimiter: '.',
                })}
              </Text>
            </View>
            <View style={styles.containerRow}>
              <Text style={styles.baseText}>Saldo: </Text>
              <Text style={styles.baseText}>
                {MaskService.toMask('money', totalAsset - investedAmount, {
                  unit: totalAsset - investedAmount > 0 ? 'R$' : '-R$',
                  separator: ',',
                  delimiter: '.',
                })}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <View style={{ flex: 1 }}>
            <Text style={styles.baseText}>Rentabilidade da carteira</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedYear(value)}
              style={pickerStyle}
              items={years}
              value={selectedYear}
            />
          </View>
          {console.log(chartValues)}
          {chartValues.months.length > 0 && (
            <LineChart
              data={{
                labels: chartValues.months,
                datasets: [
                  {
                    data: chartValues.walletPercents,
                  },
                ],
              }}
              width={Dimensions.get('window').width - metrics.baseSpace} // from react-native
              height={normalize(250)}
              yAxisSuffix="%"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: colors.primaryDark,
                backgroundGradientFrom: colors.primaryDark,
                backgroundGradientTo: colors.primaryDark,
                decimalPlaces: 2, // optional, defaults to 2dp
                color: () => `rgba(114, 50, 242, 1)`,
                labelColor: () => `rgba(255, 255, 255, 1)`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: colors.primaryPurple,
                },
              }}
              style={{
                marginVertical: metrics.baseSpace,
                alignSelf: 'center',
              }}
            />
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
