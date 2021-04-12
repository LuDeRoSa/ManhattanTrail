import React from 'react';
import './Style/Marker.css';

const Marker = (props) => {
  const { color, name } = props;

  return (
    <div
      className="marker"
      style={{
        backgroundColor: color,
      }}
      title={name}
    ></div>
  );
};

export default Marker;
