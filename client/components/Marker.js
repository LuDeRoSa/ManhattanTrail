import React, { useState } from 'react';
import InfoWindow from './InfoWindow';
import './Style/Marker.css';

const Marker = (props) => {
  const { color, name } = props;
  function onClose() {
    React.useState({ show: true });
  }
  return (
    <div
      className="marker"
      style={{
        backgroundColor: color,
      }}
      title={name}
    >
      {' '}
      {color === 'red' && (
        <InfoWindow
          show={props.show}
          lat={props.lat}
          lng={props.lng}
          name={name}
        />
      )}
    </div>
  );
};

export default Marker;
