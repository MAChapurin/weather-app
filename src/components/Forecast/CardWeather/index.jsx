import React from "react";
import { CityContext } from "../../../context";

import { Loader } from "../../../UI/Loader";
import { formatDate } from "../../../utils/formarDate";

export function CardWeather({ type, dt_txt, main, weather }) {
  const { loading } = React.useContext(CityContext);

  const {temp_max, temp_min} = main;
  const {icon} = weather[0];

  return loading ? (
    <li width="100px" className="forecast__card">
      <Loader />
    </li>
  ) : (
    <li width="100px" className="forecast__card" >
       <h3 className="forecast__h3 date-title">{type === 'day' ? formatDate(new Date(dt_txt)) : formatDate(new Date(dt_txt), true)}</h3>
       <img className="forecast__img" src={`https://openweathermap.org/img/wn/${weather !== undefined && icon}@2x.png`} alt={'Иконка погоды'} />
       {type === 'day' ?
         <div className="forecast__temp-wrapper">
                <span className="temp">{Math.floor(temp_max)}°C</span>
                  <span className="temp">{Math.floor(temp_min)}°C</span>
         </div>
       : <span className="temp">{Math.floor(temp_max)}°C</span>}
    </li>
  );
}
