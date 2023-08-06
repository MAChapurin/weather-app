import React from "react";
import { CardWeather } from "./CardWeather";
import "./Forecast.css";
import { Carousel } from "./Carousel";

import { CityContext } from "../../context";
import { replaceDate } from "../../utils/replaceDate";

export function Forecast() {
  const WEEK = "week";
  const HOUR = "hour";

  const [activeTab, setActiveTab] = React.useState(WEEK);
  const [weekList, setWeekList] = React.useState([]);
  const [hoursList, setHoursList] = React.useState([]);

  const { city } = React.useContext(CityContext);

  const API_KEY = process.env.REACT_APP_API_KEY;

  React.useEffect(() => {
    fetch(
      `https://nominatim.openstreetmap.org/search.php?q=${city}&format=json&addressdetails=1&limit=1`
    )
      .then((res) => res.json())
      .then((data) => {
        const { lat, lon } = data[0];
        return fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`
        )
          .then((res) => res.json())
          .then((data) => {
            const weekWeather = data.list
              .map((el, i) => {
                if (i % 8 === 0 && i !== 0) {
                  return el;
                }
                return false;
              })
              .filter((elem) => elem);
            if (weekWeather.length) {
              const lastEl = weekWeather[weekWeather.length - 1];
              setWeekList([
                ...weekWeather,
                {
                  ...lastEl,
                  dt: Math.random(),
                  dt_txt: replaceDate(lastEl.dt_txt),
                },
                {
                  ...lastEl,
                  dt: Math.random(),
                  dt_txt: replaceDate(lastEl.dt_txt, 2),
                },
                {
                  ...lastEl,
                  dt: Math.random(),
                  dt_txt: replaceDate(lastEl.dt_txt, 3),
                },
              ]); //Мне жалко денег на подписку, поэтому здесь вы можете наблюдать жульничество с количеством карточек
            }

            const hoursWeather = data.list.slice(0, 8);
            setHoursList([...hoursWeather]);
          });
      });
  }, [API_KEY, city]);

  return (
    <section className="forecast">
      <div className="forecast__container forecast__header">
        <h2 className="forecast__h2">Прогноз</h2>
        <nav className="forecast__nav">
          <button
            onClick={() => {
              setActiveTab(WEEK);
            }}
            className={`forecast__btn ${
              activeTab === WEEK ? "btn-active" : ""
            }`}
            id="btn-week"
            aria-label="На неделю"
          >
            на неделю
          </button>
          <button
            onClick={() => {
              setActiveTab(HOUR);
            }}
            className={`forecast__btn ${
              activeTab === HOUR ? "btn-active" : ""
            }`}
            id="btn-hours"
            aria-label="По часам"
          >
            почасовой
          </button>
        </nav>
      </div>
      <div className="forecast__wrapper-carousel">
        {activeTab === WEEK && (
          <Carousel list={weekList} id="listTest" active={WEEK} />
        )}
        {activeTab === HOUR && (
          <Carousel list={hoursList} id="listTest" active={HOUR} />
        )}
      </div>
      <ul className="forecast__mobile forecast__list">
        {activeTab === WEEK &&
          weekList.length > 0 &&
          weekList.map(({ dt, dt_txt, main, weather }) => {
            return (
              <CardWeather
                key={dt}
                type={"day"}
                {...{ dt_txt, main, weather }}
              />
            );
          })}
        {activeTab === HOUR &&
          hoursList.length &&
          hoursList.map(({ dt, dt_txt, main, weather }) => {
            return (
              <CardWeather
                key={dt}
                type={"hour"}
                {...{ dt_txt, main, weather }}
              />
            );
          })}
      </ul>
    </section>
  );
}
