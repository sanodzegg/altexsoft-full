import { configureStore } from '@reduxjs/toolkit';

import dropdownSlice from './dropdowns-slice';
import authSlice from './auth-slice';
import searchSlice from './search-slice';
import uiSlice from './ui-slice';

import { rootReducer } from './forms-slice';

const store = configureStore({
  reducer: {
    dropdown: dropdownSlice.reducer,
    apartmentChanges: rootReducer.apartmentChanges.reducer,
    userChanges: rootReducer.userChanges.reducer,
    auth: authSlice.reducer,
    search: searchSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
