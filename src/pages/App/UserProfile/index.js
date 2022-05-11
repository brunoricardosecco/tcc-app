import React, { useEffect, useState, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCountUp } from 'react-countup';
import LottieView from 'lottie-react-native';

import { showMessage } from 'react-native-flash-message';
import { getUserDetails } from '../../../services/requests/user';
import {
  favoriteUser,
  unfavoriteUser,
} from '../../../services/requests/favorite';

import { metrics } from '../../../constants';
import { baseURL } from '../../../services/api';
import styles from './styles';
import { normalize } from '../../../helpers';
import LikeButton from '../../../../assets/likeButton.json';

export default function UserProfile({ route, navigation }) {
  // hooks
  const { userId } = route.params;
  const [user, setUser] = useState(null);
  const { countUp: profit, update } = useCountUp({
    end: 0,
    decimals: 2,
    decimal: ',',
  });
  const animation = useRef(null);

  // functions
  const onHandleToggleFavorite = async () => {
    const oldUser = { ...user };
    try {
      if (user.isFavorited) {
        animation.current?.play(12, 0);
        await unfavoriteUser({ userId: user.id });
      } else {
        animation.current?.play(0, 12);
        await favoriteUser({ userId: user.id });
      }
      setUser((prevState) => ({
        ...prevState,
        isFavorited: !oldUser.isFavorited,
      }));
    } catch (error) {
      if (oldUser.isFavorited) {
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

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getUserDetails({ userId });

        setUser({ ...data.user, rentability: data.rentability });
        if (data?.user?.isFavorited) {
          animation.current?.play(12, 12);
        }
        update(data.rentability);
      } catch (error) {
        showMessage({
          icon: 'danger',
          type: 'danger',
          message: 'Erro ao ler usuário',
        });
        navigation.goBack();
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
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
        <Text style={styles.profit}>Rentabilidade: {profit}%</Text>
        <TouchableOpacity
          onPress={onHandleToggleFavorite}
          style={{ position: 'absolute', right: 0, top: 0 }}
        >
          <LottieView
            style={{
              width: normalize(90),
              height: normalize(90),
            }}
            source={LikeButton}
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
