import Map from "../components/Map.jsx";
import styles from "./AppLayout.module.css";
import SideBar from "../components/SideBar.jsx";

function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
    </div>
  );
}

export default AppLayout;
