import React from "react";

const InfoWindow = (props) =>
  props.show ? (
    <div id="info" style={{ width: 100, height: 100 }}>
      details to follow {props.name}
    </div>
  ) : null;

export default InfoWindow;
