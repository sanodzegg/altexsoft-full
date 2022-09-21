import { authActions } from '../auth-slice';
import { uiActions } from '../ui-slice';
import Cookies from 'js-cookie';
import axios from 'axios';

export const fetchToken = (credentials, key) => {
  return async (dispatch) => {
    const getToken = async (credentials) => {
      const body = JSON.stringify(credentials);
      const response = await fetch('https://localhost:7058/Account/Login', {
        body,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error("False credentials");
      }

      const data = await response.json();

      const cookieData = {
        JWT: data.token,
        ID: data.userId,
      };

      const timeStamp = 1 / 144; // 10 minutes

      Cookies.set('user', JSON.stringify(cookieData), {
        secure: true,
        sameSite: 'strict',
        expires: timeStamp,
      });

      return data;
    };

    try {
      const response = await getToken(credentials);
      dispatch(
        authActions.SetToken({ token: response.token, userID: response.userId })
      );

      dispatch(fetchProfile(response.userId, response.token));
    } catch (error) {
      dispatch(uiActions.showNotification({ status: "error", title: "ERROR", message: error.message }));
    }
  };
};

export const fetchProfile = (id, token) => {
  return async (dispatch) => {
    const getProfile = async (id, token) => {
      if (id && token) {
        const response = await fetch('https://localhost:7058/Profile/' + id, {
          headers: {
            Authorization: 'bearer' + ' ' + token,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('User not found');
        }

        if (response.status === 401) {
          dispatch(authActions.LogOut());
        }

        const data = await response.json();

        return {
          status: response.status,
          data: data
        };
      }
    };

    try {
      const response = await getProfile(id, token);
      if (response !== undefined) {
        dispatch(authActions.SetProfile({ profile: response.data }));

        dispatch(getGuests(id, token));
        dispatch(getBookings(id, token));

        return response.status
      }
    } catch (error) {
      dispatch(uiActions.showNotification({ status: "error", title: "ERROR", message: error.message }));
    }
  };
};

export const register = (credentials) => {
  return async (dispatch) => {
    const fetchRegistration = async (credentials) => {
      const data = JSON.stringify(credentials);
      const response = await fetch('https://localhost:7058/Account/Register', {
        body: data,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        dispatch(uiActions.showNotification({ status: "success", title: "SUCCESS", message: "Account registered successfully" }));
      } else {
        throw new Error("Error while registering");
      }

      if (response.status === 401) {
        dispatch(authActions.LogOut());
      }

      return response.status;
    };

    try {
      await fetchRegistration(credentials);
    } catch (error) {
      dispatch(uiActions.showNotification({ status: "error", title: "ERROR", message: error.message }));
    }
  };
};

export const authenticateUser = (userID, token) => {
  return async (dispatch) => {
    const fetchValidation = async (userID, token) => {
      const response = await dispatch(fetchProfile(userID, token));

      if (response !== undefined && response !== 200) {
        throw new Error("Couldn't authenticate user");
      }
      
      if (response === 401) {
        dispatch(authActions.LogOut());
      }

      return response;
    };

    try {
      const res = await fetchValidation(userID, token);
      dispatch(authActions.SetToken({ token, userID }));

      return res;
    } catch (error) {
      dispatch(uiActions.showNotification({ status: "error", title: "ERROR", message: error.message }));
    }
  };
};

export const getBookings = (userID, token) => {
  return async (dispatch) => {
    const fetchBookings = async (userID, token) => {
      const response = await fetch('https://localhost:7058/Booking/' + userID, {
        headers: {
          Authorization: 'bearer' + ' ' + token,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error("Couldn't get requested data");
      }

      if (response.status === 401) {
        dispatch(authActions.LogOut());
      }

      const data = await response.json();

      return data;
    };

    try {
      const bookings = await fetchBookings(userID, token);

      dispatch(authActions.SetBookings({ bookings }));
    } catch (error) {
      dispatch(uiActions.showNotification({ status: "error", title: "ERROR", message: error.message }));
    }
  };
};

export const getGuests = (userID, token) => {
  return async (dispatch) => {
    const fetchGuests = async (userID, token) => {
      const response = await axios.get(
        `https://localhost:7058/Guest/${userID}`,
        {
          headers: {
            Authorization: 'bearer' + ' ' + token,
            'Content-Type': 'application/json; charset=utf-8',
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Couldn't get requested data");
      }

      if (response.status === 401) {
        dispatch(authActions.LogOut());
      }

      const data = response.data;

      return data;
    };

    try {
      const guests = await fetchGuests(userID, token);
      dispatch(authActions.SetGuests({ guests }));
    } catch (error) {
      dispatch(uiActions.showNotification({ status: "error", title: "ERROR", message: error.message }));
    }
  };
};
