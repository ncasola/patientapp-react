import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    error: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.data;
            localStorage.setItem('user', JSON.stringify(state.user));
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.error = null;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
