import React from 'react';
import { ScrollView, Text, SafeAreaView, View, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { LineChart } from 'react-native-chart-kit';

import { colors, metrics } from '../../../constants';
import { normalize } from '../../../helpers';
import styles from './styles';

export default function Home() {
  return (
    <ScrollView>
      <SafeAreaView>
        <View style={{ marginBottom: normalize(50) }}>
          <View style={styles.profitCircle}>
            <Text style={styles.profitLabel}>Rendimento</Text>
            <Text style={styles.profitValue}>-30%</Text>
          </View>
          <View style={{ marginTop: metrics.baseSpace * 2 }}>
            <View style={styles.containerRow}>
              <Text style={styles.baseText}>Patrimônio atual: </Text>
              <Text style={styles.baseText}>R$100.00</Text>
            </View>
            <View style={styles.containerRow}>
              <Text style={styles.baseText}>Patrimônio investido: </Text>
              <Text style={styles.baseText}>R$500.0</Text>
            </View>
            <View style={styles.containerRow}>
              <Text style={styles.baseText}>Saldo: </Text>
              <Text style={styles.baseText}>-R$400.00</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={{ flex: 1 }}>
            <Text style={styles.baseText}>Rentabilidade</Text>
            <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              style={styles.picker}
              items={[
                { label: '2020', value: '2020' },
                { label: '2021', value: '2021' },
                { label: '2022', value: '2022' },
              ]}
            />
          </View>
          <LineChart
            data={{
              labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
              datasets: [
                {
                  data: [16, 18, 3, 1, 27, 0],
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
            }}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
