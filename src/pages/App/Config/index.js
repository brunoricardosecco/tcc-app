import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

import SwitchButton from '../../../../assets/switchButton.json';

import { colors, metrics } from '../../../constants';
import { normalize } from '../../../helpers';

export default function Config() {
  const animation = useRef(null);
  const [as, setAs] = useState(false);

  const onHandleToggleShowProfile = async () => {
    try {
      if (as) {
        animation.current?.play(11, 26);
      } else {
        animation.current?.play(26, 11);
      }
      setAs(!as);
    } catch (error) {
      if (true) {
        setTimeout(() => {
          animation.current?.play(0, 12);
        }, 1000);
      } else {
        setTimeout(() => {
          animation.current?.play(12, 0);
        }, 1000);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryDark }}>
      <Text>Configuraçoes</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: metrics.baseSpace,
        }}
      >
        <Text>Mostrar perfil a outros usuários:</Text>
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
