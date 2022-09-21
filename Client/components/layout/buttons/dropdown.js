import classes from './dropdown.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { dropdownActions } from '../../../store/dropdowns-slice';
import Link from 'next/link';

const DownImgSrc =
  'https://img.icons8.com/external-those-icons-fill-those-icons/24/000000/external-down-arrows-those-icons-fill-those-icons-1.png';
const UpImgSrc =
  'https://img.icons8.com/external-those-icons-fill-those-icons/24/000000/external-up-arrows-those-icons-fill-those-icons.png';

const Dropdown = () => {
  const dispatch = useDispatch();

  const userID = useSelector(state => state.auth.userID)

  const Dropdown = useSelector((state) => state.dropdown);

  const isCabinetClicked = Dropdown.cabinetClicked;

  const onCabinetClick = () => {
    dispatch(dropdownActions.toggle());
  };

  const dropdownClasses = isCabinetClicked
    ? classes.dropdown + ' ' + classes.dropdownActive
    : classes.dropdown;

  return (
    <button onClick={onCabinetClick} className={classes.navButton}>
      <div className={classes.heading}>
        <div className={classes.cabinet}>Cabinet</div>
        <div className={classes.downIconDiv}>
          <img
            className={classes.downIcon}
            src={
              (isCabinetClicked && UpImgSrc) ||
              (!isCabinetClicked && DownImgSrc)
            }
          />
        </div>
      </div>
      <div className={dropdownClasses}>
        <ul className={classes.list}>
          <li>
            <Link href={`/user/${userID}`}>
              <div className={classes.linkDiv}>Profile</div>
            </Link>
          </li>
          <li>
            <Link href={`/user/${userID}/myGuests`}>
              <div className={classes.linkDiv}>My guests</div>
            </Link>
          </li>
          <li>
            <Link href={`/user/${userID}/myBookings`}>
              <div className={classes.linkDiv}>My bookings</div>
            </Link>
          </li>
        </ul>
      </div>
    </button>
  );
};

export default Dropdown;
