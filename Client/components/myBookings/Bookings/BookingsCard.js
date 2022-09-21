import classes from './BookingsCard.module.css';
import Image from 'next/image';

const BookingsCard = (props) => {
  const isAvailable = props.data.status;
  return (
    <div className={classes.card}>
      <Image src={props.data.apartment?.photo !== "" ? props.data.apartment?.photo : "/images/dummy.png"} width={685} height={400} objectFit="cover" />
      <div className={classes.bookingInfo}>
        <h4 className={classes.bookingTitle}>{props.data.apartment.address}</h4>
        <h4 className={classes.bookingTitle}>{props.data.apartment.city}</h4>
        <div className={classes.bookingDetails}>
          <span>{props.data.apartment.distanceToCenter}m to center</span>
          <span>{props.data.apartment.numbOfBeds} beds</span>
        </div>
        <p className={classes.bookingOverview}>
          {props.data.apartment.description}
        </p>
        <div className={classes.bookingFooter}>
          <div className={classes.bookingTimestamps}>
            <span className={classes.bookingFrom}>{props.data.from}</span>-
            <span className={classes.bookingTo}>{props.data.to}</span>
          </div>
          <div className={classes.bookingStatus}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill={
                isAvailable === 1
                  ? '#18A0FB'
                  : isAvailable === -1
                  ? '#FF9292'
                  : 'NONE'
              }
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 16C32 20.4183 30.2091 24.4183 27.3137 27.3137C24.4183 30.2091 20.4183 32 16 32C11.5817 32 7.58172 30.2091 4.68629 27.3137C1.79086 24.4183 0 20.4183 0 16C0 11.5817 1.79086 7.58172 4.68629 4.68629C7.58172 1.79086 11.5817 0 16 0C20.4183 0 24.4183 1.79086 27.3137 4.68629C30.2091 7.58172 32 11.5817 32 16Z"
                fill={
                  isAvailable === 1
                    ? '#FFFFFF'
                    : isAvailable === -1
                    ? '#0000004D'
                    : '#E5E5E5'
                }
              />
              <path
                d="M15.2929 16L4.69196 26.6009C2.09168 23.8284 0.5 20.1005 0.5 16C0.5 11.8995 2.09168 8.17161 4.69196 5.39906L15.2929 16ZM27.308 26.6009L16.7071 16L27.308 5.39907C29.9083 8.17161 31.5 11.8995 31.5 16C31.5 20.1005 29.9083 23.8284 27.308 26.6009ZM26.6009 4.69196L16 15.2929L5.39906 4.69196C8.17161 2.09168 11.8995 0.5 16 0.5C20.1005 0.5 23.8284 2.09168 26.6009 4.69196ZM16 16.7071L26.6009 27.308C23.8284 29.9083 20.1005 31.5 16 31.5C11.8995 31.5 8.17161 29.9083 5.39907 27.308L16 16.7071Z"
                stroke={isAvailable === 1 ? '#FFFFFF' : '#0000004D'}
                strokeOpacity={0.3}
              />
            </svg>
            <span
              className={
                isAvailable === 1
                  ? classes.accepted
                  : isAvailable === -1
                  ? classes.declined
                  : classes.pending
              }
            >
              {isAvailable === 1
                ? 'Accepted'
                : isAvailable === -1
                ? 'Declined'
                : 'Pending'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsCard;
