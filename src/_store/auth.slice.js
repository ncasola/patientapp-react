import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.data;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
