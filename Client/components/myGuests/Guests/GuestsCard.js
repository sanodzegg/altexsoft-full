import classes from './GuestsCard.module.css';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { bookAccept, bookReject } from '../../../store/actions/book-actions';
import { useState, useEffect } from 'react';

const GuestsCard = (props) => {
  const dispatch = useDispatch();

  const [acceptClicked, setAcceptClicked] = useState(0);
  const [declineClicked, setDeclineClicked] = useState(0);
  
  const [disabled, setDisabled] = useState(false);

  const hostUser = useSelector((state) => state.auth);
  const jwt = useSelector(state => state.auth.jwtToken);

  const reqInfo = {
    id: props.data.id,
    firstName: props.data.firstName,
    lastName: props.data.lastName,
    from: props.data.from,
    to: props.data.to,
    token: hostUser.jwtToken,
  };

  const handleBookAccept = async () => {
    reqInfo.status = 1;
    setDisabled(true);

    const responseCode = dispatch(bookAccept(reqInfo, jwt));
    responseCode.then((res) => {
      if (res === 200) {
        setAcceptClicked(-1);
      }
    });
  };

  useEffect(() => {
    if (props.data.status !== null) {
      setDisabled(true);
    }
  }, []);

  const handleBookDecline = async () => {
    reqInfo.status = -1;
    setDisabled(true);

    const result = dispatch(bookReject(reqInfo, jwt));
    result.then((res) => {
      if (res === 200) {
        setDeclineClicked(-1);
      }
    });
  };

  const acceptText =
    acceptClicked === 1
      ? 'Pending...'
      : acceptClicked === -1 || props.data.status === 1
      ? 'Accepted'
      : 'Accept';

  const acceptClass =
    acceptClicked === 1
      ? classes.btnAccept + ' ' + classes.accepting
      : acceptClicked === -1 || props.data.status === 1
      ? classes.btnAccept + ' ' + classes.accepted
      : classes.btnAccept;

  const declineText =
    declineClicked === 1
      ? 'Pending...'
      : declineClicked === -1 || props.data.status === -1
      ? 'Declined'
      : 'Decline';

  const declineClass =
    declineClicked === 1
      ? classes.btnDecline + ' ' + classes.rejecting
      : declineClicked === -1 || props.data.status === -1
      ? classes.btnDecline + ' ' + classes.rejected
      : classes.btnDecline;

  return (
    <div className={classes.card}>
      <Image src={props.data?.photo !== "" ? props.data?.photo : "/images/dummy.png"} width={400} height={320} objectFit="cover" />
      <div className={classes.guestInfo}>
        <h4
          className={classes.guestName}
        >{`${props.data.firstName} ${props.data.lastName}`}</h4>
        <p className={classes.guestParagraph}>
          Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Amet, consectetur adipiscing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className={classes.guestControls}>
        <div className={classes.guestTimeStamps}>
          <span className={classes.bookingFrom}>{props.data.from}</span>-
          <span className={classes.bookingTo}>{props.data.to}</span>
        </div>
        <div className={classes.guestButtons}>
          <button
            className={acceptClass}
            disabled={disabled}
            onClick={handleBookAccept}
          >
            {acceptText}
          </button>
          <button
            className={declineClass}
            disabled={disabled}
            onClick={handleBookDecline}
          >
            {declineText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestsCard;
