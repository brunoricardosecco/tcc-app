import api from '../api';

export function getUsers({
  onlyFavorited = false,
  name = '',
  stateId = '',
  cityId = '',
}) {
  console.log({ onlyFavorited, name, stateId, cityId });
  return api.request({
    method: 'GET',
    url: `/user?onlyFavorited=${onlyFavorited}&name=${
      name === null ? '' : name
    }&cityId=${cityId === null ? '' : cityId}&stateId=${
      stateId === null ? '' : stateId
    }`,
  });
}

export function getUserDetails({ userId }) {
  return api.request({
    method: 'GET',
    url: `/user/${userId}`,
  });
}

export function updateUser({ data }) {
  return api.request({
    method: 'PUT',
    url: '/user',
    data,
  });
}
