import { createSlice } from '@reduxjs/toolkit';

const initialState = { cabinetClicked: false };

const dropdownSlice = createSlice({
  name: 'dropdownSlice',
  initialState,
  reducers: {
    changeCabinetClicked(state, payload) {
      state.cabinetClicked = payload.payload;
    },
    toggle(state) {
      state.cabinetClicked = !state.cabinetClicked;
    },
  },
});

export default dropdownSlice;
export const dropdownActions = dropdownSlice.actions;
