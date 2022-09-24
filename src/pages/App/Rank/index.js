import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import { FAB } from 'react-native-elements';
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
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import { showMessage } from 'react-native-flash-message';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { getUsers } from '../../../services/requests/user';
import { useAuth } from '../../../hooks/useAuth';
import { useWallet } from '../../../hooks/useWallet';
import Picker from '../../../components/Picker';
import Button from '../../../components/Button';

import Input from '../../../components/Input';
import { colors, metrics } from '../../../constants';
import { normalize } from '../../../helpers';
import styles from './styles';
import { baseURL } from '../../../services/api';
import {
  getStates as getStatesRequest,
  getCities as getCitiesRequest,
} from '../../../services/requests/address';

export default function Rank({ navigation }) {
  const [input, setInput] = useState('');
  const [favoritesList, setFavoritesList] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [location, setLocation] = useState({
    stateId: null,
    cityId: null,
  });
  const [searchList, setSearchList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { user } = useAuth();
  const { totalAssetPercent } = useWallet(); // variables
  const snapPoints = useMemo(() => ['1%', '92%'], []);
  const sheetRef = useRef(null);

  const getFavoritesAsync = async ({
    onlyFavorited = true,
    shouldAddCurrentUser = true,
    cityId = '',
    stateId = '',
  } = {}) => {
    setIsLoading(true);
    let users = [];
    try {
      const { data } = await getUsers({ onlyFavorited, cityId, stateId });

      if (shouldAddCurrentUser) {
        data.users.push({
          ...user,
          name: 'Você',
          rentability: totalAssetPercent,
        });
        users = data.users;
      } else {
        const found = data.users?.find((u) => u.id === user.id);

        if (found) {
          users = data.users.map((u) => {
            if (u.id === user.id) {
              return {
                ...u,
                name: 'Você',
                rentability: totalAssetPercent,
              };
            }
            return u;
          });
        }
      }

      users?.sort((a, b) => {
        if (Number(a.rentability) > Number(b.rentability)) {
          return -1;
        }

        return 1;
      });

      setFavoritesList(users);
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

  const getStates = async () => {
    try {
      const {
        data: { states: receivedStates },
      } = await getStatesRequest();
      const formattedStates = receivedStates.map((state) => ({
        label: `${state.name}`,
        value: state.id,
      }));

      setStates(formattedStates);
    } catch (error) {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'Erro ao recuperar os estados',
      });
    }
  };

  const getCities = async () => {
    try {
      const {
        data: { cities: receivedCities },
      } = await getCitiesRequest({ stateId: location.stateId });
      const formattedCities = receivedCities.map((state) => ({
        label: `${state.name}`,
        value: state.id,
      }));
      setCities(formattedCities);
    } catch (error) {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'Erro ao recuperar as cidades',
      });
    }
  };

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log('handleSheetChange', index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFavoritesAsync();
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    handleClosePress();
  }, [sheetRef]);

  useEffect(() => {
    getStates();
  }, []);

  useEffect(() => {
    if (location.stateId) {
      getCities();
    }
  }, [location.stateId]);

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
          {searchList.length > 0 ? 'Usuários' : 'Ranking'}
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
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          enablePanDownToClose
          style={{ backgroundColor: colors.primaryDark }}
          backgroundStyle={{
            backgroundColor: colors.primaryDark,
          }}
        >
          <BottomSheetView
            style={{
              backgroundColor: colors.primaryDark,
              flex: 1,
              borderTopWidth: 1,
              borderTopColor: colors.primaryPurple,
              padding: metrics.baseSpace,
            }}
          >
            <Picker
              onValueChange={(v) => setLocation({ ...location, stateId: v })}
              value={location.stateId}
              items={states}
            />
            <Picker
              onValueChange={(v) => setLocation({ ...location, cityId: v })}
              value={location.cityId}
              items={cities}
            />
            <Button
              title="Aplicar filtros"
              onPress={() => {
                getFavoritesAsync({
                  stateId: location.stateId,
                  cityId: location.cityId,
                  onlyFavorited: false,
                  shouldAddCurrentUser: false,
                });
                handleClosePress();
              }}
            />
            {console.log({ location })}
            {(location.stateId || location.cityId) && (
              <Button
                title="Limpar filtros"
                onPress={() => {
                  getFavoritesAsync({
                    stateId: null,
                    cityId: null,
                    onlyFavorited: true,
                  });
                  setLocation({ stateId: null, cityId: null });
                  handleClosePress();
                }}
                containerStyle={{ paddingTop: metrics.baseSpace }}
              />
            )}
          </BottomSheetView>
        </BottomSheet>
        <FAB
          visible
          placement="right"
          style={{ marginBottom: '25%' }}
          icon={{
            name: 'filter-alt',
          }}
          color={colors.primaryPurple}
          onPress={() => handleSnapPress(1)}
        />
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
