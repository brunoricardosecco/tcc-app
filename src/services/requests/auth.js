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

export function signUp(userData) {
  return api.request({
    headers: {
      'Content-type': 'multipart/form-data',
    },
    method: 'POST',
    url: '/user',
    data: userData,
  });
}
