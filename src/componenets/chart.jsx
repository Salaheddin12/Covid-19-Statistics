import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const Chart = ({ query }) => {
  const [chartData, setChartData] = useState({});
  const [country, setContry] = useState("");
  const getLabels = (days_) => {
    let dates = days_;
    dates = dates.map((date_) => date_.slice(0, date_.length - 3));
    console.log(dates);
    return dates;
  };
  //fetch global historical data
  const fetchHistoricalData = async (query) => {
    axios
      .get(`https://disease.sh/v3/covid-19/historical/${query}?lastdays=7`)
      .then((response) => {
        const { country, timeline } = response.data;
        const { deaths, cases, recovered } = timeline;
        console.log("deaths", deaths);
        console.log("cases", cases);
        setContry(country);
        setChartData({
          labels: getLabels(Object.keys(deaths)),
          datasets: [
            {
              label: "Deaths",
              data: Object.values(deaths),
              borderColor: "rgba(236, 112, 99, 0.8 )",
              backgroundColor: "rgba(236, 112, 99, 0.8 )",
              pointBorderColor: "#666",
              pointBackgroundColor: "rgba(236, 112, 99, 1)",
            },
            {
              label: "Recovered",
              data: Object.values(recovered),
              borderColor: "rgba(130, 224, 170, 0.8)",
              backgroundColor: "rgba(130, 224, 170, 0.8)",
              pointBorderColor: "#666",
              pointBackgroundColor: "rgba(130, 224, 170, 1)",
            },
            {
              label: "Cases",
              data: Object.values(cases),
              borderColor: "rgba(247, 220, 111, 0.8)",
              backgroundColor: "rgba(247, 220, 111, 0.8)",
              pointBorderColor: "#666",
              pointBackgroundColor: "rgba(247, 220, 111, 1)",
            },
          ],
        });
      })
      .catch((ex) => {
        if (ex.response && ex.response.status === 404)
          alert("oops Page Not Found");
      });
  };

  const defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "bottom",
  };
  useEffect(() => {
    fetchHistoricalData(query);
    console.log(chartData);
  }, [query]);
  const { displayTitle, displayLegend, legendPosition } = defaultProps;
  return (
    <div className="chart">
      <Line
        height={300}
        width={300}
        data={chartData}
        options={{
          title: {
            display: displayTitle,
            text: "Past 7 days in " + country,
            fontSize: 25,
            fontColor: "White",
            fontFamily: "'Baloo Tamma 2', cursive",
          },
          legend: {
            display: displayLegend,
            position: legendPosition,
            labels: {
              fontColor: "white",
              fontSize: 18,
              fontFamily: "'Baloo Tamma 2', cursive",
            },
          },
        }}
      />
    </div>
  );
};

export default Chart;
