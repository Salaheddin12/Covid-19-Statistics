import React, {
  Component,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import axios from "axios";
import PopupCard from "./popupCard";
import popupContext from "../App";

function StatisticsMap({ position }) {
  
 //init map
  const mapRef = useRef();
  useEffect(() => {
    const { current } = mapRef;
    const { leafletElement: map } = current;
    map.flyTo(position, 4, { duration: 3 });
  }, []);
  return (
    <Map ref={mapRef} center={position} zoom={4}>
      <TileLayer
        zIndex={-5}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          <PopupCard />
        </Popup>
      </Marker>
    </Map>
  );
}

export default StatisticsMap;
