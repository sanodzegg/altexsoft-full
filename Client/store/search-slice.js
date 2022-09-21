import { createSlice } from '@reduxjs/toolkit';

const initialState = { city: null, from: null, to: null, results: [] };

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    changeFrom(state, payload) {
      const date = new Date(payload.payload);
      state.from = date.toISOString();
    },
    changeTo(state, payload) {
      const date = new Date(payload.payload);
      state.to = date.toISOString();
    },
    changeCity(state, payload) {
      state.city = payload.payload;
    },
    setResults(state, payload) {
      state.results = payload.payload.results;
    },
  },
});

export default searchSlice;
export const searchActions = searchSlice.actions;
