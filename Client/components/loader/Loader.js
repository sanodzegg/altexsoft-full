import { useEffect, useState } from "react";
import classes from "./Loader.module.css";

const Loader = () => {

  const [display, setDisplay] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 10000);
  }, []);

  if (display) {
    return (
      <div className={classes.loaderWrapper}>
          <div className={classes.loader}></div>
      </div>
    );
  }
};

export default Loader;
