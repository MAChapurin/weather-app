import { YMaps, Map } from "@pbe/react-yandex-maps";

import styles from "./Map.module.css";

export const YandexMap = ({ coords }) => {
  const { lat, lon } = coords;
  console.log("YANDEXMAP:", lat, lon);

  return (
    <YMaps>
      <div className={styles.map}>
        <Map
          width="100%"
          height="100%"
          state={{ center: [lat, lon], zoom: 9 }}
          defaultState={{ center: [lat, lon], zoom: 9}}
        />
      </div>
    </YMaps>
  );
};


