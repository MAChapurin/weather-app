import React from "react";

import { CityContext } from "../../context";

import "./SideBar.css";

import { LocationSvg } from "./Location";
import { SidePanel } from "./SidePanel";
import { SwitchThemeBtn } from "./SwitchThemeBtn";
import { formatDate } from "../../utils/formarDate";

export function SideBar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [temp, setTemp] = React.useState(0);
  const [feels, setFeels] = React.useState(' ');

  const [icon, setIcon] = React.useState('04d')
  const { city, status, setStatus } = React.useContext(CityContext);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    localStorage.setItem("city", city);
  }, [city]);

  return (
    <section className="side-bar">
      <nav className="side-bar__nav">
        <button
          onClick={() => {
            setIsOpen(true);
            inputRef.current.focus();
          }}
          className="btn btn-search"
          aria-label="Поиск города"
        >
          Поиск города
        </button>
        <SwitchThemeBtn />
      </nav>

      <img width="200px" height="200px" src={`https://openweathermap.org/img/wn/${icon}@4x.png`} alt="snow" className="hero__img" />
      <div className="temp">
        <span className="number">{temp}</span>°C
      </div>
      <div className="weather-status">{status}</div>
      <div className="weather-desc">
        Ощущается как <span className="weather-count">{feels}</span> °C
      </div>
      <div className="side-bar__date-wrapper">
        <span className="side-bar__desc">Сегодня</span>
        <span className="side-bar__date">{formatDate()}</span>
      </div>
      <div className="location">
        <LocationSvg />
        <span className="location__desc">{city}</span>
      </div>
      <SidePanel {...{ isOpen, setIsOpen, inputRef, setTemp, setFeels, setStatus, setIcon}} />
    </section>
  );
}
