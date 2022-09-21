import BookingsCard from './Bookings/BookingsCard';
import classes from './MyBookings.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getBookings } from '../../store/actions/auth-actions';

const MyBookings = () => {

  const dispatch = useDispatch();

  const bookings = useSelector((state) => {
    return state.auth.profile && state.auth.profile.myBookings;
  });

  const { jwtToken, userID } = useSelector(state => state.auth);

  useEffect(() => {
    if (userID && jwtToken) {
      dispatch(getBookings(userID, jwtToken));
    }
  }, []);

  return (
    <div className={classes.parent}>
      {bookings &&
        bookings.map((e, i) => {
          return <BookingsCard key={i} data={e} />;
        })}
    </div>
  );
};

export default MyBookings;
