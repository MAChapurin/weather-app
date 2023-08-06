import React from "react";

import { CityContext } from "../../../context";

import { CardWeather } from "../CardWeather";
import { NextBtn } from "../NextBtn";
import { PrevBtn } from "../PrevBtn";

export function Carousel({ list, id, active }) {
  const [showCardsNumber, setShowCardsNumber] = React.useState(0);
  const [curentIndex, setCurrentIndex] = React.useState(0);
  const listRef = React.useRef(null);

  const { loading } = React.useContext(CityContext);

  React.useEffect(() => {
    listRef.current = document.querySelector(`#listTest`);
    const resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      setShowCardsNumber(width > 400 ? width / 120 : width / 100);
    });
    resizeObserver.observe(listRef.current);

    return () => {
      resizeObserver.unobserve(listRef.current);
    };
  }, [curentIndex, showCardsNumber]);
  return (
    <>
      <nav className="forecast__nav-slider">
        <div id="prev">
          <PrevBtn
            disabled={curentIndex <= 0}
            cb={() => {
              if (curentIndex <= 0) {
                return;
              }
              setCurrentIndex((prev) => prev - 1);
            }}
          />
        </div>
        <div id="next">
          <NextBtn
            disabled={curentIndex >= list.length - showCardsNumber}
            cb={() => {
              if (curentIndex >= list.length - showCardsNumber) {
                return;
              }
              setCurrentIndex((prev) => prev + 1);
            }}
          />
        </div>
      </nav>
      <ul
        id={id}
        className="forecast__list forecast__hours forecast__container forecast__list--active"
      >
        {list.map(({ dt, dt_txt,main, weather }, index) => {
          return index >= curentIndex &&
            index < curentIndex + Math.floor(showCardsNumber) ? (
            <CardWeather
              type={active === 'week' ? 'day' : 'hour'}
              dt_txt={dt_txt}
              main={main}
              weather={weather}
              loading={loading}
              key={dt}
            />
          ) : null;
        })}
      </ul>
    </>
  );
}
