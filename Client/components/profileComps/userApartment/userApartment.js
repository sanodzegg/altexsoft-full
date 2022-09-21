import { useState } from "react";
import ApartmentBody from "./Body/apartmentBody";
import ApartmentHeader from "./Header/apartmentHeader";
import classes from "./userApartment.module.css";
import dynamic from 'next/dynamic'
import { useMemo } from "react";

const UserApartment = ( props ) => {

    const [hidden, setHidden] = useState(false);

    
    const displayMap = () => {
        const CustomMap = dynamic(() => import("../../mapComp/CustomMap"), { ssr: false });
        
        return (
            <div className={props.display ? classes.leafletCustom : classes.leafletHidden}>
                <CustomMap displayMap={props.display} setDisplayMap={props.setDisplay} />
            </div>
        )
    }

    const mapMemo = useMemo(() => displayMap(), [props.display]);

    return (
        <div className={!hidden ? classes.wrapperActive : classes.wrapperInactive}>
            <ApartmentHeader hidden={hidden} controlHidden={setHidden} />
            <ApartmentBody displayMap={props.display} setDisplayMap={props.setDisplay} />
            {mapMemo}
        </div>
    )
}

export default UserApartment;