import axios from 'axios'
import { store } from '../_store'
import { authActions } from '_store';

axios.interceptors.response.use(
    res => res,
    err => {
      // Any HTTP Code which is not 2xx will be considered as error
      const statusCode = err.response.status;
      if (statusCode === 401 || statusCode === 403) {
        store.dispatch(authActions.logout()); 
      }
  
      throw err;
    }
  );

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params })
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }