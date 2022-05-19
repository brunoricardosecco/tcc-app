import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';

import { metrics } from '../../../constants';
import { useAuth } from '../../../hooks/useAuth';
import { baseURL } from '../../../services/api';
import styles from './styles';

export default function Profile({ navigation }) {
  const { user, logout } = useAuth();
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text style={styles.title}>Profile</Text>

      <Avatar
        rounded
        size="xlarge"
        source={{
          uri: `${baseURL}/user/photo/${user?.photo}`,
        }}
        title={user?.name
          ?.match(/\b(\w)/g)
          ?.join('')
          ?.substring(0, 2)}
        overlayContainerStyle={{ backgroundColor: 'white' }}
        containerStyle={{ marginBottom: metrics.baseSpace }}
      />
      <Text style={styles.username}>{user?.name}</Text>

      <TouchableOpacity
        style={styles.menuButtonContainer}
        onPress={() => navigation.navigate('ChangePassword')}
      >
        <Text style={styles.menuButtonLabel}>Trocar de senha</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButtonContainer}>
        <Text style={styles.menuButtonLabel} onPress={logout}>
          Sair
        </Text>
      </TouchableOpacity>
    </View>
  );
}
