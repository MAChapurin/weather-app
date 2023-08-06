import React from "react";

import { CityContext, DetailContext } from "../../../context";

import styles from "./SearchHistory.module.css";

export function SearchHistory({
  searchHistoryStore,
  setError,
  setQuery,
  inputRef,
  setIsOpen,
  API_KEY,
  city,
  setTemp,
  setFeels,
  setStatus,
  setIcon,
}) {
  const { setLoading, setCity } = React.useContext(CityContext);
  const { setWindSpeed, setWindDeg, setHumidity, setPressure, setVisibility } =
    React.useContext(DetailContext);

  React.useEffect(() => {
    localStorage.setItem("history", JSON.stringify(searchHistoryStore));
  }, [searchHistoryStore]);

  return (
    <div className={styles.container}>
      {searchHistoryStore.map(({ place_id, display_name, lat, lon }) => {
        const cityName = display_name.split(",")[0];
        return (
          <a href="/"
            key={place_id}
            className={`${styles.item} ${
              city === display_name.split(",")[0] ? styles.current : null
            }`}
            onClick={(e) => {
              e.preventDefault();
              setLoading(true);
              setQuery("");
              setCity(cityName);
              fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`
              )
                .then((res) => res.json())
                .then((data) => {
                  const { visibility, main, wind, weather } = data;
                  //Detail
                  setVisibility(visibility);
                  setHumidity(main.humidity);
                  setWindSpeed(wind.speed);
                  setWindDeg(+wind.deg);
                  setPressure(Math.floor(main.pressure * 0.750064)); // перевод в в мм рт. ст.
                  //SidePanel
                  setTemp(Math.floor(main.temp));
                  setFeels(Math.floor(main.feels_like));
                  setStatus(weather[0].description);
                  setIcon(weather[0].icon);
                })
                .catch((e) => {
                  console.log(e.message);
                  setError(true);
                  inputRef.current.focus();
                })
                .finally(() => {
                  setTimeout(() => {
                    setLoading(false);
                    setIsOpen(false);
                  }, 2000);
                });
            }}
          >
            <span>{cityName}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="15"
              viewBox="0 0 11 15"
              fill="none"
            >
              <path
                d="M2.09312 0L0 1.7625L6.79892 7.5L0 13.2375L2.09312 15L11 7.5L2.09312 0Z"
                fill="#ACACAC"
              />
            </svg>
          </a>
        );
      })}
    </div>
  );
}
