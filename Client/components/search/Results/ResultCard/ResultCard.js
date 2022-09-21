import classes from './ResultCard.module.css';
import { bookNow } from '../../../../store/actions/book-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const ResultCard = (props) => {
  const dispatch = useDispatch();

  const [isPressed, setIsPressed] = useState(false);
  const [booked, setBooked] = useState(false);

  const { userID, jwtToken, profile } = useSelector((state) => {
    return state.auth;
  });

  const { from, to, city } = useSelector((state) => {
    return state.search;
  });

  const bookings = useSelector((state) => state.auth.profile?.myBookings);

  const userBooked = bookings?.filter(
    (e) => e.apartment.hostId === props.apartment.hostId
  );

  useEffect(() => {
    if (userBooked?.length >= 1) {
      setBooked(true);
    }
  }, [userBooked]);

  const onBookNowClick = async () => {
    if (props.hostID == profile.userId || userBooked.includes(userID)) {
      return;
    }
    if (props.isAvailable) {
      const hostID = props.hostID;
      const credentials = {
        hostID,
        customerID: userID,
        firstName: profile.firstName,
        lastName: profile.lastName,
        from,
        to,
        city,
      };

      dispatch(bookNow(credentials, jwtToken));

      setIsPressed(true);
    }
  };

  const buttonText = !isPressed ? 'Book now' : 'Request sent!';

  const isDisabled = booked
    ? true
    : props.isAvailable && !isPressed
    ? false
    : true;

  const isActive = isPressed
    ? classes.bookNowButton + ' ' + classes.buttonActive
    : classes.bookNowButton;

  const buttonClasses =
    booked || !props.isAvailable
      ? classes.unavailable + ' ' + classes.bookNowButton
      : isActive;

  return (
    <div className="col-md-6">
      <div className={classes.card}>
          <Image src={props.apartment?.photo !== "" ? props.apartment?.photo : "/images/dummy.png"} width={685} height={400} objectFit="cover" />
        <div className={classes.detailsDiv}>
          <div className={classes.description}>
            <div className={classes.address}>
              <h5>
                {props.apartment.address},{' '}
                <span className={classes.city}>{props.apartment.city}</span>
              </h5>
            </div>
            <div className={classes.subDescription}>
              <p>{props.apartment.distanceToCenter}m to center</p>
              <p>{props.apartment.numbOfBeds} beds</p>
            </div>
            <p className={classes.descriptionParagraph}>{props.apartment.description}</p>
          </div>
        </div>
        <button
          className={buttonClasses}
          onClick={onBookNowClick}
          disabled={isDisabled}
        >
          {booked
            ? 'Already booked'
            : props.isAvailable
            ? buttonText
            : 'Unavailable'}
        </button>
      </div>
    </div>
  );
};

export default ResultCard;