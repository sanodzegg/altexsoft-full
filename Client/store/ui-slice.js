import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { notification: null },
  reducers: {
    showNotification(state, payload) {
      state.notification = {
        status: payload.payload.status,
        title: payload.payload.title,
        message: payload.payload.message,
      };
    },
    removeNotification(state) {
      state.notification = null
    }
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;