import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import classes from './Notification.module.css';

const Notification = (props) => {
  let specialClasses = '';
  const dispatch = useDispatch();

  const notif = useSelector(state => state.ui.notification);

  useEffect(() => {
    setTimeout(() => {
      if (notif) {
        dispatch(uiActions.removeNotification());
      }
    }, 3000);
  }, []);

  if (props.status === 'error') {
    specialClasses = classes.error;
  }
  if (props.status === 'success') {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
    </section>
  );
};

export default Notification;
