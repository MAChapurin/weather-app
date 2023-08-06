/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { CityContext, DetailContext } from "../../../context";

import { CloseBtn } from "../CloseBtn";
import { SearchHistory } from "../SearchHistory";

export function SidePanel({
  isOpen,
  setIsOpen,
  inputRef,
  setTemp,
  setFeels,
  setStatus,
  setIcon,
}) {
  const { setWindSpeed, setWindDeg, setHumidity, setPressure, setVisibility } =
    React.useContext(DetailContext);
  const { loading, setLoading, city, setCity } = React.useContext(CityContext);

  const [error, setError] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [searchHistoryStore, setSearchHistoryStore] = React.useState(
    JSON.parse(localStorage.getItem("history") || "[]")
  );

  const regexp = /[a-z]/gi;

  const API_KEY = process.env.REACT_APP_API_KEY;

  const getData = (query) => {
    fetch(
      `https://nominatim.openstreetmap.org/search.php?q=${query}&format=json&addressdetails=1&limit=1`
    )
      .then((res) => res.json())
      .then((data) => {
        if (typeof data[0] !== "undefined") {
          setLoading(true);
          setSearchHistoryStore((prev) => {
            return prev.length < 5
              ? [
                  ...prev.filter((city) => city.place_id !== data[0].place_id),
                  data[0],
                ]
              : [
                  ...prev
                    .slice(-4)
                    .filter((city) => city.place_id !== data[0].place_id),
                  data[0],
                ];
          });
          const { display_name, lat, lon } = data[0];
          const cityName = display_name.split(",")[0];
          setQuery("");
          setCity(cityName);
          return fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`
          );
        } else {
          throw new Error("Такого города нет");
        }
      })
      .then((res) => res.json())
      .then((data) => {
        const { visibility, main, wind, weather } = data;
        //Detail
        setVisibility(visibility);
        setHumidity(main.humidity);
        setWindSpeed(wind.speed);
        setWindDeg(wind.deg);
        setPressure(Math.floor(main.pressure * 0.750064)); // перевод в в мм рт. ст.
        //SidePanel
        setTemp(Math.floor(main.temp));
        setFeels(Math.floor(main.feels_like));
        setStatus(weather[0].description);
        setIcon(weather[0].icon);
      })
      .catch((e) => {
        setError("Упс! Город не найден, попробуйте другой");
        inputRef.current.focus();
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
          setIsOpen(false);
        }, 2000); //Скорей всего у вас быстрый интернет, setTimeout чтобы увидеть индикатор загрузки
      });
  };

  React.useEffect(() => {
    getData(city);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("history", JSON.stringify(searchHistoryStore));
  }, [searchHistoryStore]);

  return (
    <div className={`side-bar__search-menu ${isOpen && "active"}`}>
      <CloseBtn handlerClose={setIsOpen} />

      <form
        className="side-bar__search-wrapper"
        onSubmit={(e) => {
          e.preventDefault();
          if (query.match(regexp)) {
            setError("Запрос должен быть на русском языке");
            return;
          }
          getData(query);
        }}
      >
        <label htmlFor="inputId" className="side-bar__label">
          <input
            id="inputId"
            ref={inputRef}
            onChange={(e) => {
              setError("");
              setQuery(e.target.value);
            }}
            type="search"
            className="side-bar__input"
            placeholder="я ищу..."
            value={query}
            disabled={loading}
            aria-label="поле ввода города"
          />
          <p className="warning">{error}</p>
        </label>
        <button
          onClick={(e) => {}}
          className="btn side-bar__btn-search"
          disabled={loading || !query.length}
          aria-label="Найти"
        >
          Найти
        </button>
      </form>

      <SearchHistory
        {...{
          searchHistoryStore,
          setSearchHistoryStore,
          error,
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
        }}
      />
    </div>
  );
}
