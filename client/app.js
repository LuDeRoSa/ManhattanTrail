import React, { useState } from "react";

import Navbar from "./components/Navbar";
import Routes from "./routes";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

function Map() {
  const [point, setPoint] = useState(null);
  return (
    <div>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 40.7127281, lng: -74.0060152 }}
      />
    </div>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

const App = () => {
  return (
    <div style={{ width: "50vw", height: "50vh" }}>
      <Navbar />
      <Routes />
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${"AIzaSyCnNLEaNM_3zfMo0yHe - nINMSUPPfyJwUI"}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

export default App;
