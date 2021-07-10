import api from '../api';

export function getFavorites() {
  return api.request({
    method: 'GET',
    url: '/favorite',
  });
}
