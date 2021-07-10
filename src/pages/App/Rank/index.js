import React, { useState, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  Keyboard,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { showMessage } from 'react-native-flash-message';
import { getFavorites } from '../../../services/requests/favorite';

import Input from '../../../components/Input';
import { colors, metrics } from '../../../constants';
import { normalize } from '../../../helpers';
import styles from './styles';

export default function Rank({ navigation }) {
  const [input, setInput] = useState('');
  const [favoritesList, setFavoritesList] = useState([]);

  const getFavoritesAsync = async () => {
    try {
      const { data } = await getFavorites();
      setFavoritesList(data.favorites);
    } catch (error) {
      showMessage({
        icon: 'danger',
        type: 'danger',
        message: 'Erro ao recuperar favoritos',
      });
    }
  };

  useEffect(() => {
    getFavoritesAsync();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Input
          value={input}
          onChangeText={(text) => setInput(text)}
          rightIcon={{
            type: 'ionicons',
            name: 'search',
            color: colors.primaryPurple,
            size: normalize(24),
            onPress: () => console.log('ts'),
          }}
          style={{ paddingHorizontal: metrics.baseSpace }}
        />
        <Text style={styles.title}>Favoritos</Text>
        <FlatList
          data={favoritesList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <ItemList user={item} index={index + 1} navigation={navigation} />
          )}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

function ItemList({ user, index, navigation }) {
  const placeStyle = {
    1: styles.firstPlace,
    2: styles.secondPlace,
    3: styles.thirdPlace,
    default: null,
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('UserProfile', { user })}
    >
      <View
        style={[styles.itemContainer, placeStyle[index] || placeStyle.default]}
      >
        <Text style={styles.username}>{user.favoriteUser?.name}</Text>
      </View>
    </TouchableOpacity>
  );
}
