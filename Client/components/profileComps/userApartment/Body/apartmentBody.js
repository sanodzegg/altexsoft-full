import classes from "./apartmentBody.module.css";
import ApartmentForms from "./Forms/apartmentForms";
import ApartmentImage from "./Image/apartmentImage";

const ApartmentBody = (props) => {
    return (
        <div className={classes.apartmentWrapper}>
            <ApartmentForms displayMap={props.displayMap} setDisplayMap={props.setDisplayMap} />
            <ApartmentImage />
        </div>
    )
}

export default ApartmentBody;