import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { history } from '_helpers';
import axios from 'axios';

// create slice

const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        error: null
    }
}

function createReducers() {
    return {
        logout
    };

    function logout(state) {
        state.user = null;
        localStorage.removeItem('user');
        history.navigate('/login');
    }
}

function createExtraActions() {
    const baseUrl = `/api/users`;

    return {
        login: login()
    };    

    function login() {
        return createAsyncThunk(
            `${name}/login`,
            async ({ username, password }) => await axios.post(`${baseUrl}/login`, { username, password })
        );
    }
}

function createExtraReducers() {
    return {
        ...login()
    };

    function login() {
        var { pending, fulfilled, rejected } = extraActions.login;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                state.user = action.payload.data.data
                localStorage.setItem('user', JSON.stringify(state.user));
                history.navigate('/');
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        };
    }
}
