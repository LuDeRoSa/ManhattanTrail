import React, { useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

//dummy data
const points = [
  { id: 1, title: "The Smith", lat: 40.741895, lng: -73.989308 },
  { id: 2, title: "The Hillstone", lat: 40.7580445, lng: -73.9699967 },
  { id: 3, title: "Boqueria", lat: 40.77152, lng: -73.9561132 },
];

function Map() {
  const [marker, setMarker] = useState(null);
  return (
    <div>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 40.7127281, lng: -74.0060152 }}
      >
        {/* //this is the initial marker, attached an onClick that displays the rest
        of the Marker(path) */}
        <Marker
          position={{ lat: 40.7127281, lng: -74.0060152 }}
          onClick={() => {
            setMarker(
              points.map((point) => (
                <Marker
                  key={point.id}
                  position={{ lat: point.lat, lng: point.lng }}
                />
              ))
            );
          }}
        />
        {/* conditionally renders the marker once its clicked  */}
        {marker &&
          points.map((point) => (
            <Marker
              key={point.id}
              position={{ lat: point.lat, lng: point.lng }}
            />
          ))}
      </GoogleMap>
    </div>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default MapWrapped;
