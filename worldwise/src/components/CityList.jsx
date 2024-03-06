import CityItem from "./CityItem";
import Spinner from "./Spinner";
import styles from "./CityList.module.css";

// Referencing an external object disable the rule for the component
function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => {
        return <CityItem key={city.id} city={city} />;
      })}
    </ul>
  );
}

export default CityList;
