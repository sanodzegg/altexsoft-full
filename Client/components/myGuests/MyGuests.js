import GuestsCard from './Guests/GuestsCard';
import classes from './MyGuests.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getGuests } from '../../store/actions/auth-actions';

const MyGuests = () => {

  const dispatch = useDispatch();
  
  const guests = useSelector((state) => {
    return state.auth.profile ? state.auth.profile.myGuests : null;
  });

  const { jwtToken, userID } = useSelector(state => state.auth);

  useEffect(() => {
    if (userID && jwtToken) {
      dispatch(getGuests(userID, jwtToken));
    }
  }, []);

  return (
    <div className={classes.parent}>
      {guests &&
        guests.map((e, i) => {
          return <GuestsCard key={i} data={e} />;
        })}
    </div>
  );
};

export default MyGuests;
