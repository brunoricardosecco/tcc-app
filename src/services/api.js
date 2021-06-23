import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response);
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
  }
);

export default api;
