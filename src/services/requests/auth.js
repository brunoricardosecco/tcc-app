import api from '../api';

export function authenticate({ email, password }) {
  return api.request({
    method: 'POST',
    url: '/authenticate',
    data: {
      email,
      password,
    },
  });
}
