import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const unsignedState = {
  isAuthenticated: false,
  profile: null,
  jwtToken: null,
  userID: null,
  key: Math.random().toString(36).substring(1, 8),
};

const authSlice = createSlice({
  name: 'AuthSlice',
  initialState: unsignedState,
  reducers: {
    LogOut(state) {
      Cookies.remove("user");
      state.isAuthenticated = false;
      state.profile = null;
      state.jwtToken = null;
      state.userID = null;
    },
    SetToken(state, payload) {
      state.jwtToken = payload.payload.token;
      state.userID = payload.payload.userID;
    },
    SetBookings(state, payload) {
      if (!state.profile) {
        return;
      }
      state.profile.myBookings = payload.payload.bookings;
    },
    SetGuests(state, payload) {
      if (!state.profile) {
        return;
      }
      state.profile.myGuests = payload.payload.guests;
    },
    SetProfile(state, payload) {
      state.profile = payload.payload.profile;
      state.isAuthenticated = true;
    },
  },
});

export default authSlice;

export const authActions = authSlice.actions;
