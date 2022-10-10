import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { store } from '../_store'
import { authActions } from '_store';

const baseQuery = fetchBaseQuery({ baseUrl: '/api' })
export const baseQueryWithauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.originalStatus === 401) {
        store.dispatch(authActions.logout());
    } else {
        return result;
    }
}