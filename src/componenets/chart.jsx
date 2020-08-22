import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const Chart = ({ data }) => {
  const { country, cases, deaths, recovered } = data;
  const dataSetDeathes = Object.values(deaths);
  const dataSetCases = Object.values(cases);
  const dataSetRecovered = Object.values(recovered);
  const getLabels = () => {
    let dates = Object.keys(deaths);
    console.log("dates" + Object.keys(deaths));
    dates = dates.map((date_) => date_.slice(0, date_.length - 3));
    console.log(dates);
    return dates;
  };
  const [chartData, setChartData] = useState({});
  const defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
  };
  useEffect(() => {
    setChartData({
      labels: getLabels(),
      datasets: [
        {
          label: "Deaths",
          data: Object.values(deaths),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
        },
        {
          label: "Cases",
          data: Object.values(cases),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
        },
        {
          label: "Recovered",
          data: Object.values(recovered),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
        },
      ],
    });
  }, []);
  const { displayTitle, displayLegend, legendPosition } = defaultProps;
  return (
    <div className="chart">
      <Line
        data={chartData}
        options={{
          title: {
            display: displayTitle,
            text: "Past 7 days in " + country,
            fontSize: 25,
          },
          legend: {
            display: displayLegend,
            position: legendPosition,
          },
        }}
      />
    </div>
  );
};

export default Chart;
