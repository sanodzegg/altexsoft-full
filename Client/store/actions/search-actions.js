import axios from 'axios';
import { authActions } from '../auth-slice';
import { searchActions } from '../search-slice';
import { uiActions } from '../ui-slice';

export const searchApartments = (credentials, token) => {
  return async (dispatch) => {
    const fetchResults = async (credentials, token) => {
      const response = await axios.post(
        'https://localhost:7058/Search',
        credentials,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Fetching results went wrong");
      }

      if (response.status === 401) {
        dispatch(authActions.LogOut());
      }

      const data = response.data;

      if (data.length === 0) {
        throw new Error("No results found");
      }

      return data;
    };
    try {
      const response = await fetchResults(credentials, token);
      dispatch(searchActions.setResults({ results: response }));
    } catch (err) {
      dispatch(uiActions.showNotification({ status: "error", title: "ERROR", message: err.message }));
    }
  };
};
