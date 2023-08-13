import React from "react";

import { CityContext, DetailContext, ThemeContext } from "./context";

import "./index.css";

import { Detail } from "./components/Detail";
import { Forecast } from "./components/Forecast";
import { SideBar } from "./components/SideBar";
import { Background } from "./components/Background";
import { getBackground } from "./utils/getBackground";

function App() {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "light"
  );

  const body = React.useRef(document.body);

  const [city, setCity] = React.useState(
    localStorage.getItem("city") || "Москва"
  );
  const [loading, setLoading] = React.useState(false);
  const [windSpeed, setWindSpeed] = React.useState(
    localStorage.getItem("windSpeed") || 7
  );
  const [windDeg, setWindDeg] = React.useState(0);
  //Влажность оказывается
  const [humidity, setHumidity] = React.useState(
    localStorage.getItem("humidity") || 84
  );

  const [pressure, setPressure] = React.useState(
    localStorage.getItem("pressure") || 84
  );

  const [visibility, setVisibility] = React.useState(
    localStorage.getItem("visibility") || 6200
  );

  const [status, setStatus] = React.useState('ясно');

  return (
    <ThemeContext.Provider value={{ theme, setTheme, body }}>
      <DetailContext.Provider
        value={{
          windSpeed,
          setWindSpeed,
          windDeg,
          setWindDeg,
          humidity,
          setHumidity,
          pressure,
          setPressure,
          visibility,
          setVisibility,
        }}
      >
        <CityContext.Provider value={{ loading, setLoading, city, setCity, status, setStatus }}>
          <div className="container">
            <SideBar />
            <main className="main">
              <Background src={getBackground(status)}/>
              <Forecast />
              <Detail />
            </main>
          </div>
        </CityContext.Provider>
      </DetailContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
