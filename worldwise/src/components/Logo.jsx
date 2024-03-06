import { NavLink } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <NavLink to="/">
      <img src="/logo.png" alt="worldwise logo" className={styles.logo}></img>
    </NavLink>
  );
}

export default Logo;
