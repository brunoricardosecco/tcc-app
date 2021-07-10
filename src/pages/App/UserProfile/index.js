import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCountUp } from 'react-countup';

import { metrics } from '../../../constants';
import { baseURL } from '../../../services/api';
import styles from './styles';

export default function UserProfile({ route }) {
  const { favorite } = route.params;
  const { countUp: profit } = useCountUp({
    end: 200.12,
    decimals: 2,
    decimal: ',',
  });
  return (
    <SafeAreaView style={styles.container}>
      <Avatar
        rounded
        size="xlarge"
        source={{
          uri: `${baseURL}/user/photo/${favorite.favoriteUser?.photo}`,
        }}
        title={favorite.favoriteUser?.name
          ?.match(/\b(\w)/g)
          ?.join('')
          ?.substring(0, 2)}
        overlayContainerStyle={{ backgroundColor: 'white' }}
        containerStyle={{ marginBottom: metrics.baseSpace }}
      />
      <Text style={styles.username}>{favorite.favoriteUser?.name}</Text>
      <Text style={styles.profit}>Rentabilidade: {profit}%</Text>
    </SafeAreaView>
  );
}
