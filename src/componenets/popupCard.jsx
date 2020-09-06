import styled from "styled-components";
import React, { useContext, useEffect } from "react";
import { popupContext } from "../App";

const Text = styled.h6`
  font-size: "15px";
  margin-bottom: "20px";
`;
const Head = styled.h5`
  font-weight: "bold";
  font-size: "26px";
`;
const Card = styled.div`
  text-align: "start";
  height: "350px";
  margin-top: "30px";
`;

const PopupCard = () => {
  //context data
  const { countryData, countryTodayData } = useContext(popupContext);
  const {
    country,
    deaths,
    active,
    critical,
    cases,
    recovered,
    tests,
  } = countryData;
  const { todayDeaths, todayCases, todayRecovered } = countryTodayData;

  const Badge = styled.span``;
  useEffect(() => {
    console.log(countryData, countryTodayData);
  });
  return (
    <Card>
      <Head>{country}</Head>
      <Text>Tests:{tests}</Text>
      <Text>Active:{active}</Text>
      <Text>
        Cases:{cases}
        <Badge className="badge badge-warning ml-2">+{todayCases}</Badge>
      </Text>
      <Text>Critical:{critical}</Text>
      <Text>
        Recovered:{recovered}
        <Badge className="badge badge-success ml-2">+{todayRecovered}</Badge>
      </Text>
      <Text>
        Deaths:{deaths}
        <Badge className="badge badge-danger ml-2">+{todayDeaths}</Badge>
      </Text>
    </Card>
  );
};

export default PopupCard;
