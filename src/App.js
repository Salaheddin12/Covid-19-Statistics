import React, { useState, useEffect } from "react";
import "./App.css";
import StatisticsMap from "./componenets/statisticsMap";
import Card from "./componenets/card";
import Chart from "./componenets/chart";
import Search from "./componenets/search";
import http from "./services/httpServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//context
export const popupContext = React.createContext({});
function App() {
  //map position
  const [position, setPosition] = useState([34, -7]);
  //country total data
  const [countryData, setCountryData] = useState({
    country: "Morocco",
    deaths: 0,
    active: 0,
    critical: 0,
    cases: 0,
    recovered: 0,
    tests: 0,
  });
  //global total data
  const [Data, setData] = useState({
    deaths: 0,
    active: 0,
    critical: 0,
    cases: 0,
    recovered: 0,
    tests: 0,
  });
  //country daily data
  const [countryTodayData, setCountryTodayData] = useState({
    todayDeaths: 0,
    todayCases: 0,
    todayRecovered: 0,
  });
  //global daily data
  const [todayData, setTodayData] = useState({
    todayDeaths: 0,
    todayCases: 0,
    todayRecovered: 0,
  });
  //search query to store controlled element Search value
  const [searchQuery, setSearchQuery] = useState("");

  //fetch global data
  const fetchData = async () => {
    http
      .get("https://disease.sh/v3/covid-19/all")
      .then((response) => {
        const {
          deaths,
          active,
          critical,
          cases,
          recovered,
          tests,
          todayDeaths,
          todayCases,
          todayRecovered,
        } = response.data;
        setData({
          deaths: deaths,
          active: active,
          critical: critical,
          cases: cases,
          recovered: recovered,
          tests: tests,
        });
        setTodayData({
          todayDeaths: todayDeaths,
          todayCases: todayCases,
          todayRecovered: todayRecovered,
        });
      })
      .catch((ex) => {
        if (ex.response && ex.response.status === 404)
          toast.error("ooops Page Not Found");
      });
  };
  //fetch country data
  const fetchCountryData = (query) => {
    console.log(query);
    http
      .get(
        `https://disease.sh/v3/covid-19/countries/${query}?strict=true&allowNull=0`
      )
      .then((response) => {
        const { lat, long } = response.data.countryInfo;
        const {
          country,
          deaths,
          active,
          critical,
          cases,
          recovered,
          tests,
          todayDeaths,
          todayCases,
          todayRecovered,
        } = response.data;
        setCountryData({
          country: country,
          deaths: deaths,
          active: active,
          critical: critical,
          cases: cases,
          recovered: recovered,
          tests: tests,
        });
        setCountryTodayData({
          todayDeaths: todayDeaths,
          todayCases: todayCases,
          todayRecovered: todayRecovered,
        });
        setPosition([lat, long]);
      })
      .catch((ex) => {
        if (ex.response && ex.response.status === 404)
          toast.error("oops Try Diffrente Country");
      });
  };
  //handleSearch
  const handleChange = (text) => {
    setSearchQuery(text);
  };
  //handle search submit
  const handleSearchSubmit = (text) => {
    fetchCountryData(text);
  };
  //Fetching needed data on load
  useEffect(() => {
    fetchCountryData(countryData.country);
    fetchData();
  }, []);
  const { deaths, active, critical, cases, recovered, tests } = Data;
  const { todayDeaths, todayCases, todayRecovered } = todayData;
  return (
    <div className="App" style={{ padding: "2rem" }}>
      <ToastContainer />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          justifyContent: "space-between",
          marginTop: "4rem",
          alignItems: "center",
        }}
      >
        <Search
          value={searchQuery}
          handleChange={handleChange}
          handleSubmit={handleSearchSubmit}
        />

        <div className="country-statistics">
          <div className="container">
            <popupContext.Provider value={{ countryData, countryTodayData }}>
              <StatisticsMap position={position} />
            </popupContext.Provider>
          </div>
          <div className="container">
            <Chart query={countryData.country} />
          </div>
        </div>

        <div
          style={{
            width: "100%",
            borderRadius: 10,
            padding: "1rem",
            margin: "4rem 0 0",
            overflow: "hidden",
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "row",
            flexWrap: "wrap",
            backgroundColor: "rgba(255, 255, 255,0.2)",
          }}
        >
          <Card title="Total Tests" value={tests} />
          <Card title="Total Cases" value={cases} todayValue={todayCases} />
          <Card title="Deaths" value={deaths} todayValue={todayDeaths} />
          <Card
            title="Recovered"
            value={recovered}
            todayValue={todayRecovered}
          />
          <Card title="Critical" value={critical} />
          <Card title="Active" value={active} />
        </div>
      </div>
    </div>
  );
}

export default App;
