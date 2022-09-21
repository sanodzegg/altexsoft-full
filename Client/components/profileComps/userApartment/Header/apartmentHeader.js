import classes from "./apartmentHeader.module.css";
import Image from "next/image";

const ApartmentHeader = (props) => {

    const handleWrapper = () => {
        props.controlHidden(!props.hidden);
    }

    return (
        <div className={!props.hidden ? classes.wrapperActive : classes.wrapperInactive} onClick={handleWrapper}>
            <h3 className={classes.header}>Add an appartment</h3>
            <div className={classes.arrowWrapper}>
                <Image src="/arrow.svg" width={25} height={20}/>
            </div>
            <hr className={classes.hr}/>
        </div>
    )
}

export default ApartmentHeader;