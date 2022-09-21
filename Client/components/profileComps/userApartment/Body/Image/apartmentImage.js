import { useEffect, useRef, useState } from "react";
import classes from "./apartmentImage.module.css";

import { useDispatch, useSelector } from "react-redux";
import { apartmentActions } from "../../../../../store/forms-slice";

const ApartmentImage = () => {

    const dispatch = useDispatch();
    const customImg = useSelector(state => state.apartmentChanges.dataObject?.photo);

    const uploadImgRef = useRef(null);

    const [base64, setBase64] = useState("");

    const handleImgClick = () => {
      if (uploadImgRef.current) {
        uploadImgRef.current.click();
      }
    }
    
    const handleImgUpload = async () => {
      if(uploadImgRef.current.files[0]) {
          const base64 = await toBase64(uploadImgRef.current.files[0]);
          setBase64(base64);
      }
    }

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
    }
    
    useEffect(() => {
      dispatch(apartmentActions.setPhoto(base64));
    }, [base64]);

    return (
        <>  
            <input type="image" src={customImg !== "" ? base64 : "/images/dummy.png"} className={classes.img} onClick={handleImgClick} />
            <input type="file" accept="image" ref={uploadImgRef} className={classes.fileInput} onChange={handleImgUpload} />
        </>
    )
}

export default ApartmentImage;