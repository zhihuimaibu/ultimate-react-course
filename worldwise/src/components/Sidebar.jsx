import { Outlet } from "react-router-dom";
import styles from "./SideBar.module.css";
import Logo from "./Logo.jsx";
import AppNav from "./AppNav.jsx";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}

export default SideBar;
