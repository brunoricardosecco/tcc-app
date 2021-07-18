import api from '../api';

export function getUsers({ onlyFavorited = false, name = '' }) {
  return api.request({
    method: 'GET',
    url: `/user?onlyFavorited=${onlyFavorited}&name=${name}`,
  });
}

export function getUserDetails({ userId }) {
  return api.request({
    method: 'GET',
    url: `/user/${userId}`,
  });
}
