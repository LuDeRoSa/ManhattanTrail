import React from "react";
import InfoWindow from "./InfoWindow";

const Marker = (props) => {
  const { color, name } = props;
  return (
    <div
      className="marker"
      style={{
        backgroundColor: color,
        // cursor: 'pointer'
      }}
      title={name}
    >
      <InfoWindow
        show={props.show}
        lat={props.lat}
        lng={props.lng}
        // id={props.id}
        name={props.name}
      />
    </div>
  );
};

export default Marker;
