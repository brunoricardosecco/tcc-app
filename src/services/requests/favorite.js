import api from '../api';

export function favoriteUser({ userId }) {
  return api.request({
    method: 'GET',
    url: `/user/${userId}/follow`,
  });
}

export function unfavoriteUser({ userId }) {
  return api.request({
    method: 'GET',
    url: `/user/${userId}/unfollow`,
  });
}
