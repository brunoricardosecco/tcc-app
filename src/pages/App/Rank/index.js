import React, { useState, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  Keyboard,
  FlatList,
  View,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { showMessage } from 'react-native-flash-message';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { getUsers } from '../../../services/requests/user';

import Input from '../../../components/Input';
import { colors, metrics } from '../../../constants';
import { normalize } from '../../../helpers';
import styles from './styles';
import { baseURL } from '../../../services/api';

export default function Rank({ navigation }) {
  const [input, setInput] = useState('');
  const [favoritesList, setFavoritesList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const getFavoritesAsync = async () => {
    setIsLoading(true);
    try {
      const { data } = await getUsers({ onlyFavorited: true });

      data.users?.sort((a, b) => {
        if (Number(a.rentability) > Number(b.rentability)) {
          return -1;
        }

        return 1;
      });

      setFavoritesList(data.users);
    } catch (error) {
      showMessage({
        icon: 'danger',
        type: 'danger',
        message: 'Erro ao recuperar favoritos',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onHandleSearchUser = async () => {
    try {
      if (input === '') {
        setSearchList([]);
        return;
      }
      setIsSearching(true);
      const { data } = await getUsers({ name: input });
      setSearchList(data.users);
    } catch (error) {
      showMessage({
        icon: 'danger',
        type: 'danger',
        message: 'Erro ao procurar usuários',
      });
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearchItems = () => {
    setSearchList([]);
    setInput('');
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFavoritesAsync();
    });

    return unsubscribe;
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Input
          value={input}
          onChangeText={(text) => setInput(text)}
          rightIcon={
            isSearching ? (
              <ActivityIndicator color={colors.primaryPurple} size="small" />
            ) : (
              {
                type: 'ionicons',
                name: 'search',
                color: colors.primaryPurple,
                size: normalize(24),
                onPress: onHandleSearchUser,
              }
            )
          }
          style={{ paddingHorizontal: metrics.baseSpace }}
          ListItem={(user) => (
            <InputList
              user={user}
              clearSearchItems={clearSearchItems}
              navigation={navigation}
            />
          )}
          data={searchList}
        />
        <Text style={styles.title}>
          {searchList.length > 0 ? 'Usuários' : 'Favoritos'}
        </Text>
        {searchList.length === 0 && (
          <FlatList
            data={favoritesList}
            refreshControl={
              <RefreshControl
                tintColor={colors.white}
                refreshing={isLoading}
                onRefresh={getFavoritesAsync}
              />
            }
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <ItemList
                favorite={item}
                index={index + 1}
                navigation={navigation}
              />
            )}
          />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

function ItemList({ favorite, index, navigation }) {
  const placeStyle = {
    1: styles.firstPlace,
    2: styles.secondPlace,
    3: styles.thirdPlace,
    default: null,
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('UserProfile', {
          userId: favorite.id,
        })
      }
    >
      <View
        style={[styles.itemContainer, placeStyle[index] || placeStyle.default]}
      >
        <Avatar
          rounded
          size="medium"
          source={{
            uri: `${baseURL}/user/photo/${favorite.photo}`,
          }}
          title={favorite.name
            ?.match(/\b(\w)/g)
            ?.join('')
            ?.substring(0, 2)}
          overlayContainerStyle={{ backgroundColor: 'white' }}
          containerStyle={{
            marginBottom: metrics.baseSpace,
            position: 'absolute',
            left: metrics.baseSpace / 2,
          }}
        />
        <Text style={styles.username}>{favorite.name}</Text>
        <View
          style={{
            position: 'absolute',
            right: metrics.baseSpace / 2,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              ...styles.username,
            }}
          >
            Rentab.
          </Text>
          <Text
            style={{
              ...styles.username,
              fontSize: normalize(16),
            }}
          >
            {favorite.rentability?.toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function InputList({ user, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('UserProfile', {
          userId: user.id,
        });
      }}
    >
      <View style={styles.itemContainer}>
        <Avatar
          rounded
          size="medium"
          source={{
            uri: `${baseURL}/user/photo/${user?.photo}`,
          }}
          title={user?.name
            ?.match(/\b(\w)/g)
            ?.join('')
            ?.substring(0, 2)}
          overlayContainerStyle={{ backgroundColor: 'white' }}
          containerStyle={{
            marginBottom: metrics.baseSpace,
            position: 'absolute',
            left: metrics.baseSpace / 2,
          }}
        />
        <Text style={styles.username}>{user.name}</Text>
      </View>
    </TouchableOpacity>
  );
}
