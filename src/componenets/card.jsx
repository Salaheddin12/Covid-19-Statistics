import React from "react";

const Card = ({ title, value, todayValue }) => {
  let color = "rgba(241, 196, 15,0.5)";
  if (title === "Deaths") color = "rgba(245, 7, 15,0.5)";
  if (title === "Recovered") color = "rgba(63, 209, 4,0.5)";
  
  return (
    <div
      className="card"
      style={{
        width: 300,
        height: 150,
        backgroundColor: "transparent",
        color: "whitesmoke",
        border: 0,
        margin: "2rem",
        borderRadius: "10px 10px 0 0",
      }}
    >
      {todayValue ? (
        <span
          style={{
            backgroundColor: color,
            width: 90,
            height: 90,
            position: "absolute",
            top: 0,
            right: 0,
            borderRadius: 50,
            transform: "translate(50%,-50%)",
            lineHeight: 6,
            fontWeight: "bold",
            fontFamily: "'Baloo Tamma 2', cursive",
            fontSize: 16,
          }}
        >
          +{todayValue}
        </span>
      ) : null}
      <h1
        style={{
          backgroundColor: "rgba(0, 114, 255,0.3)",
          borderRadius: "10px 10px 0 0",
          padding: "5px 0",
          fontFamily: "'Baloo Tamma 2', cursive",
        }}
      >
        {title}
      </h1>
      <h2
        style={{
          lineHeight: "80px",
          color: "GrayText",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255,0.5)",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        {value}
      </h2>
    </div>
  );
};

export default Card;
