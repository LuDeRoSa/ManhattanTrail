import React, { useState } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from 'react-google-maps';

function Map() {
  const [point, setPoint] = useState(null);
  return (
    <div>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 40.7127281, lng: -74.0060152 }}
        fullscreenControl={false}
        // zoomControl: false,
        // mapTypeControl: false,
        // streetViewControl: false
      >
        <Marker position={{ lat: 40.7127281, lng: -74.0060152 }} />
      </GoogleMap>
    </div>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default MapWrapped;
