import React, { useRef, useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import TileSource from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

import "./Map.css";

const Maps = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    const map = new Map({
      target: mapRef.current.id,
      layers: [
        new TileLayer({
          source: new TileSource(),
        }),
      ],
      view: new View({
        center: fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });

    return () => {
      // Clean up the map when the component unmounts
      map.setTarget(null);
    };
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
};

export default Maps;
