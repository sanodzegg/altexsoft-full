import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../../../store/actions/profile-actions";
import { apartmentActions, userActions } from "../../../store/forms-slice";
import classes from "./userForm.module.css";

const UserForm = () => {

    const userToken = useSelector(state => state.auth.jwtToken);
    const selectorParent = useSelector(state => state.userChanges);

    const selectors = {
        showErrors: selectorParent.displayUserErrors,
        userData: selectorParent.profileDataObject,
        userErrors: selectorParent.userErrors,
    }

    const [profileSaved, setProfileSaved] = useState(false);

    const user = useSelector(state => state.auth.profile);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.setUserID(user?.userId));
    }, [selectors.userData]);

    useEffect(() => {
        dispatch(userActions.setDefaultData(user));
    }, [user]);

    const handleSave = async (e) => {
        e.preventDefault();

        const isData = false;

        const sum = Object.values(selectors.userData).filter(e => e !== "");

        if (sum.length > 1) {
            isData = true;
        }

        if (!selectors.userErrors.email.valid) {
            dispatch(userActions.showUserErrors());
        }

        if (isData && selectors.userErrors.email.valid === true) {
            dispatch(editProfile(selectors.userData, userToken));
            setProfileSaved(true);
        }
    }

    const handleBlur = () => {
        const sum = Object.values(selectors.userData).filter(e => e !== "");
        if (sum.length > 1 && !profileSaved) {
            dispatch(apartmentActions.setProfileEdited(true));
        } else {
            dispatch(apartmentActions.setProfileEdited(false));
        }
    }

    return (
        <form onSubmit={(e) => handleSave(e)} onBlur={handleBlur} className={classes.formWrapper}>
            <div className={classes.row}>
                <input type="text" className={classes.inputField} id={classes.userFN} onChange={(e) => dispatch(userActions.setFirstName(e.target.value))} placeholder="First name" value={selectors.userData.firstName ? selectors.userData.firstName : ""} />
                <input type="text" className={classes.inputField} id={classes.userLN} onChange={(e) => dispatch(userActions.setLastName(e.target.value))} placeholder="Last name" value={selectors.userData.lastName ? selectors.userData.lastName : ""} />
            </div>
            <input type="text" className={classes.inputField} id={classes.userEmail} onChange={(e) => dispatch(userActions.setEmail(e.target.value))} placeholder="Email address" value={selectors.userData.email ? selectors.userData.email : ""} />
                {!selectors.userErrors.email.valid && selectors.showErrors ? <span className={classes.errorLine}>{selectors.userErrors.email.message}</span> : null}
            <textarea className={classes.inputField} id={classes.userAbout} onChange={(e) => dispatch(userActions.setAbout(e.target.value))} placeholder="Something about yourself" value={selectors.userData.description ? selectors.userData.description : ""} />
            <button className={classes.submitBtn} type="submit">Save changes</button>
        </form>
    )
}

export default UserForm;