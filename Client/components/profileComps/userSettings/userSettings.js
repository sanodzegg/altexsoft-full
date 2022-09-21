import classes from './userSettings.module.css';
import UserForm from './userForm';
import { useDispatch, useSelector } from 'react-redux';
import { apartmentActions, userActions } from '../../../store/forms-slice';
import { useRef, useState, useEffect } from 'react';

const UserSettings = () => {
  const dispatch = useDispatch();

  const uploadImgRef = useRef(null);

  const [base64, setBase64] = useState('');

  const profileImg = useSelector((state) => state.auth.profile);

  const handleImgClick = () => {
    if (uploadImgRef.current) {
      uploadImgRef.current.click();
    }
  };

  const handleImgUpload = async () => {
    if (uploadImgRef.current.files[0]) {
      const base64 = await toBase64(uploadImgRef.current.files[0]);
      setBase64(base64);
    }
  };

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  useEffect(() => {
    dispatch(userActions.setUserPhoto(base64));
    if (base64 !== "") {
      dispatch(apartmentActions.setProfileEdited(true));
    }
  }, [base64]);

  useEffect(() => {
    dispatch(userActions.setUserPhoto(profileImg.photo));
  }, []);

  return (
    <div className={classes.userWrapper}>
      <input
        type="image"
        src={base64 ? base64 : profileImg?.photo ? profileImg?.photo : "/images/dummy.png"}
        className={classes.img}
        onClick={handleImgClick}
      />
      <input
        type="file"
        accept="image"
        ref={uploadImgRef}
        className={classes.fileInput}
        onChange={handleImgUpload}
      />
      <div>
        <UserForm />
      </div>
    </div>
  );
};

export default UserSettings;
