import Navigation from './navbar/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { dropdownActions } from '../../store/dropdowns-slice';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import Notification from "../UI/Notification";

let userID;

const Layout = (props) => {

  const profileID = useSelector(state => state.auth.userID);

  const isError = useSelector(state => state.ui.notification);

  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (userID !== undefined && profileID !== undefined) {
      if (userID !== profileID) {
        Cookies.remove("user");
        window.location.reload(true);
      }
    }
  });

  useEffect(() => {
    if (profileID !== null && profileID !== undefined) {
      userID = profileID;
    }
  }, [profileID]);

  const dispatch = useDispatch();

  const Dropdown = useSelector((state) => state.dropdown);

  const isDropdownActive = Dropdown.cabinetClicked;

  const onGlobalClick = () => {
    if (isDropdownActive) {
      dispatch(dropdownActions.changeCabinetClicked(false));
    }
  };

  return (
    <div onClick={onGlobalClick}>
      {isError && <Notification status={notification?.status} message={notification?.message} title={notification?.title} />}
      <Navigation />
      <main className="mt-5">{props.children}</main>
    </div>
  );
};

export default Layout;
