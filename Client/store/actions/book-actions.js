import axios from 'axios';
import { uiActions } from '../ui-slice';
import { authActions } from '../auth-slice';

export const bookNow = (credentials, token) => {
  return async (dispatch) => {
    const fetchBookNow = async (credentials, token) => {
      const response = await axios.post(
        'https://localhost:7058/Search/Booking',
        credentials,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Unexpected error occured while booking");
      }

      if (response.status === 401) {
        dispatch(authActions.LogOut());
      }

      return response;
    };
    try {
      await fetchBookNow(credentials, token);
    } catch (error) {
      dispatch(uiActions.showNotification({ status: "error", title: "ERROR", message: error.message }));
    }
  };
};

export const bookAccept = (credentials, token) => {
  return async (dispatch) => {
    const bookAcceptReq = async (credentials, token) => {
      const resp = await axios.put('https://localhost:7058/Guest', credentials, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (resp.status !== 200) {
        throw new Error("Couldn't accept the booking request");
      }

      if (resp.status === 401) {
        dispatch(authActions.LogOut());
      }
      
      return resp;
    };

    try {
      const resp = await bookAcceptReq(credentials, token);

      return resp.status;
    } catch (err) {
      dispatch(uiActions.showNotification({ status: "error", title: "ERROR", message: err.message }));
    }
  };
};

export const bookReject = (credentials, token) => {
  return async (dispatch) => {
    const bookDeclineReq = async (credentials, token) => {
      const resp = await axios.put('https://localhost:7058/Guest', credentials, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (resp.status !== 200) {
        throw new Error("Couldn't decline the booking request");
      }

      if (resp.status === 401) {
        dispatch(authActions.LogOut());
      }

      return resp;
    };

    try {
      const resp = await bookDeclineReq(credentials, token);

      return resp.status;
    } catch (err) {
      dispatch(uiActions.showNotification({ status: "error", title: "ERROR", message: err.message }));
    }
  };
};
