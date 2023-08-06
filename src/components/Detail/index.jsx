import React from "react";

import { CityContext, DetailContext } from "../../context";
import { calсulateDirection } from "../../utils/calculateDirection";

import "./Detail.css";

import { Loader } from "../../UI/Loader";

export function Detail() {
  const { loading } = React.useContext(CityContext);
  const { windSpeed,windDeg, humidity, pressure, visibility } =
    React.useContext(DetailContext);

  return (
    <section className="detail">
      <div className="detail__container">
        <h2 className="detail__h2">Подробно на сегодня</h2>
        <ul className="detail__list">
          <li className="detail__card">
            {loading ? (
              <Loader />
            ) : (
              <>
                <h3 className="detail__h3">Скорость ветра</h3>
                <p className="detail__desc">
                  {windSpeed} <span>м/с</span>
                </p>
                <div className="detail__wrap">
                  <svg
                    style={{transform: `rotate(${+windDeg + 45}deg)`}}
                    id="compass"
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    fill="none"
                  >
                    <circle  cx="19" cy="19" r="19" fill="#48484A" />
                    <path
                      d="M18.1951 31.0029L10.0872 10.8978C9.76221 10.092 10.5487 9.28365 11.3631 9.58643L31.9073 17.2246C32.7267 17.5293 32.7906 18.6717 32.0237 19.0912C26.1915 22.2822 23.1612 25.3608 20.0501 31.0907C19.6388 31.8482 18.5175 31.8023 18.1951 31.0029Z"
                      fill="#E6E6E6"
                    />
                  </svg>
                  <span>{calсulateDirection(windDeg)}</span>
                </div>
              </>
            )}
          </li>
          <li className="detail__card">
            {loading ? (
              <Loader />
            ) : (
              <>
                {" "}
                <h3 className="detail__h3">Влажность</h3>
                <p className="detail__desc">
                  {humidity} <span>%</span>
                </p>
                <div className="detail__progress-bar">
                  <div className="detail__numbers">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                  <div className="detail__percent">
                    <div style={{width: `${humidity}%`}} className="detail__scale"></div>
                  </div>
                  <span className="detail__percent-span">%</span>
                </div>
              </>
            )}
          </li>
          <li className="detail__card">
            {loading ? (
              <Loader />
            ) : (
              <>
                <h3 className="detail__h3">Видимость</h3>
                <p className="detail__desc" id="visibility">
                  {visibility / 1000} <span>км</span>
                </p>
              </>
            )}
          </li>
          <li className="detail__card">
            {loading ? (
              <Loader />
            ) : (
              <>
                <h3 className="detail__h3">Давление</h3>
                <p className="detail__desc" id="pressure">
                  {pressure} <span className="small-span">мм рт. ст.</span>
                </p>
              </>
            )}
          </li>
        </ul>
      </div>
    </section>
  );
}
