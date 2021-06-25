import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.166:3333',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (!error.response?.data?.message) {
      const newError = {
        response: {
          data: {
            message: 'Ocorreu um erro, tente novamente mais tarde',
          },
        },
      };
      return Promise.reject(newError);
    }
    return Promise.reject(error);
  }
);

export default api;
