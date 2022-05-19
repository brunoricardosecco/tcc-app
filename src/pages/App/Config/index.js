import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

import SwitchButton from '../../../../assets/switchButton.json';

import { normalize } from '../../../helpers';
import styles from './styles';
import { useAuth } from '../../../hooks/useAuth';

export default function Config() {
  const animation = useRef(null);
  const { user, updateUserStatus } = useAuth();

  const onHandleToggleShowProfile = () => {
    updateUserStatus();
  };

  useEffect(() => {
    try {
      if (user.isDiscoverable) {
        animation.current?.play(11, 26);
      } else {
        animation.current?.play(26, 11);
      }
    } catch (error) {
      if (user.isDiscoverable) {
        animation.current?.play(11, 26);
      } else {
        animation.current?.play(26, 11);
      }
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={styles.label}>Mostrar perfil a outros usuários:</Text>
        <TouchableOpacity onPress={onHandleToggleShowProfile}>
          <LottieView
            style={{
              width: normalize(80),
              height: normalize(80),
            }}
            source={SwitchButton}
            ref={animation}
            autoPlay={false}
            loop={false}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
