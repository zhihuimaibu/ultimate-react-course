import CityItem from "./CityItem";
import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import { useCities } from "../context/CitiesProvider";

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  9;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => {
        return <CityItem key={city.id} city={city} />;
      })}
    </ul>
  );
}

export default CityList;
