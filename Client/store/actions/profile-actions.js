import { apartmentActions, userActions } from '../forms-slice';
import axios from 'axios';
import { authActions } from '../auth-slice';
import { uiActions } from '../ui-slice';

export const editProfile = (credentials, token) => {
  return async (dispatch) => {
    const profileEditReq = async (credentials, token) => {
      const resp = await axios.post(
        'https://localhost:7058/Profile/UpdateUser',
        credentials,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (resp.status !== 200) {
        throw new Error("Couldn't save changes");
      } else {
        dispatch(uiActions.showNotification({ status: "success", title: "SUCCESS", message: "Profile changed successfully" }));
      }

      if (resp.status === 401) {
        dispatch(authActions.LogOut());
      }

      dispatch(userActions.nullify());
      return resp.status;
    };

    try {
      const status = await profileEditReq(credentials, token);
      dispatch(apartmentActions.setProfileEdited(false));
      if (status === 200) {
        dispatch(authActions.SetProfile({ profile: credentials }));
      }
      return status;
    } catch (err) {
      dispatch(uiActions.showNotification({ status: "error", title: "ERROR", message: err.message }));
    }
  };
};

export const addApartment = (credentials, token) => {
  return async (dispatch) => {
    const addApartmentReq = async (credentials, token) => {

      try {
        const response = await axios.post(
          `https://localhost:7058/Profile/AddApartment`,
          credentials,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          dispatch(uiActions.showNotification({ status: "success", title: "SUCCESS", message: "Apartment added successfully" }));
        }

        dispatch(apartmentActions.nullify());

        dispatch(apartmentActions.showApartmentErrors(false));
  
        return response.status;
      } catch (error) {
        if (error.response.status !== 200) {
          throw new Error("Couldn't add an apartment");
        }
        if (error.response.status === 401) {
          dispatch(authActions.LogOut());
        }
      }
    };
    try {
      await addApartmentReq(credentials, token);
    } catch (err) {
      dispatch(uiActions.showNotification({ status: "error", title: "ERROR", message: err.message }));
    }
  };
};
