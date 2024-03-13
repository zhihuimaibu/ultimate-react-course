import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import { useCities } from "../context/CitiesProvider";

function CountyList() {
  const { isLoading, cities } = useCities();
  if (isLoading) return <Spinner />;

  const countries = cities.reduce((acc, cur) => {
    const find = acc.find((country) => country.country === cur.country);
    if (find) {
      return acc;
    }
    return [
      ...acc,
      {
        country: cur.country,
        emoji: cur.emoji,
      },
    ];
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => {
        return <CountryItem key={country.country} country={country} />;
      })}
    </ul>
  );
}

export default CountyList;
