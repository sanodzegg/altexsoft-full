import classes from "./apartmentForms.module.css";
import { useDispatch, useSelector } from "react-redux";
import { apartmentActions } from "../../../../../store/forms-slice";
import { useRef } from "react";

const ApartmentForms = (props) => {

    const inputFrom = useRef(null);
    const inputTo = useRef(null);

    const handleInputFrom = () => {
        if (inputFrom.current) {
            inputFrom.current.type = "datetime-local";
        }
    }

    const handleInputTo = () => {
        if (inputTo.current) {
            inputTo.current.type = "datetime-local";
        }
    }

    const showErrors = useSelector(state => state.apartmentChanges.displayApartmentErrors);
    const errors = useSelector(state => state.apartmentChanges.errObj);
    const values = useSelector(state => state.apartmentChanges.dataObject);

    const dispatch = useDispatch();

    return (
        <>
            <form className={classes.wrapper}>
                <input type="text" className={classes.apartmentForm} onChange={(e) => dispatch(apartmentActions.setCity(e.target.value))} placeholder="City" value={values.city} />
                    {!errors.city.valid && showErrors ? <span className={classes.errorLine}>{errors.city.message}</span> : null}
                <div className={classes.addressWrapper}>
                    <input type="text" className={classes.apartmentFormAddress} onChange={(e) => dispatch(apartmentActions.setAddress(e.target.value))} placeholder="Address" value={values.address} />
                    {!errors.address.valid && showErrors ? <span className={classes.errorLine}>{errors.address.message}</span> : null}
                    <div className={classes.mapIcon} onClick={() => props.setDisplayMap(!props.displayMap)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-3.148 0-6 2.553-6 5.702 0 4.682 4.783 5.177 6 12.298 1.217-7.121 6-7.616 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm12 16l-6.707-2.427-5.293 2.427-5.581-2.427-6.419 2.427 4-9 3.96-1.584c.38.516.741 1.08 1.061 1.729l-3.523 1.41-1.725 3.88 2.672-1.01 1.506-2.687-.635 3.044 4.189 1.789.495-2.021.465 2.024 4.15-1.89-.618-3.033 1.572 2.896 2.732.989-1.739-3.978-3.581-1.415c.319-.65.681-1.215 1.062-1.731l4.021 1.588 3.936 9z"/></svg>
                    </div>
                </div>
                <input type="number" className={classes.apartmentForm} onChange={(e) => dispatch(apartmentActions.setDistance(e.target.value))} placeholder="Distance to center" value={values.distanceToCenter} />
                    {!errors.distanceToCenter.valid && showErrors ? <span className={classes.errorLine}>{errors.distanceToCenter.message}</span> : null}
                <input type="number" className={classes.apartmentForm} onChange={(e) => dispatch(apartmentActions.setGuestNum(e.target.value))} placeholder="Max number of guests" value={values.numbOfBeds} />
                    {!errors.numberOfBeds.valid && showErrors ? <span className={classes.errorLine}>{errors.numberOfBeds.message}</span> : null}
                <div className={classes.dateWrapper}>
                    <>
                        <input type="text" placeholder="From..." ref={inputFrom} className={!errors.from.valid && showErrors ? classes.apartmentFormError : classes.apartmentForm} onClick={handleInputFrom} onChange={(e) => dispatch(apartmentActions.setFrom(e.target.value))} value={values.fromDefault} />
                    </>
                    <>
                        <input type="text" placeholder="To..." ref={inputTo} className={!errors.to.valid && showErrors ? classes.apartmentFormError : classes.apartmentForm} onClick={handleInputTo} onChange={(e) => dispatch(apartmentActions.setTo(e.target.value))} value={values.toDefault} />
                    </>
                </div>
                <textarea maxLength={240} className={classes.apartmentForm} onChange={(e) => dispatch(apartmentActions.setDescription(e.target.value))} placeholder="Description" value={values.description} />
                    {!errors.description.valid && showErrors ? <span className={classes.errorLine}>{errors.description.message}</span> : null}
            </form>
        </>
    )
}

export default ApartmentForms;