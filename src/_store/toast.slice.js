import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toasts: [],
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action) => {
      const { title, message, type } = action.payload;
      // get crypto secure random id for toast
      const id = Math.floor(Math.random() * 100000000);
      const toast = {
        id: id,
        text: message,
        title: title,
        type: type,
      };
      state.toasts.push(toast);
    },
    removeToast: (state, action) => {
      const id = action.payload;
      state.toasts = state.toasts.filter((toast) => toast.id !== id);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;