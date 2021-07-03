import api from '../api';

export function getStates() {
  return api.request({
    method: 'GET',
    url: '/state',
  });
}

export function getCities({ stateId }) {
  return api.request({
    method: 'GET',
    url: `/state/${stateId}/cities`,
  });
}
