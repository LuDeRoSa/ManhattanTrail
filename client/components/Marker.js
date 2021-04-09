import React, { useState } from 'react';
import './Style/Marker.css';

const Marker = (props) => {
  const { color, name } = props;
  function onClose() {
    React.useState({ show: true });
  }
  return (
    <div
      className='marker'
      style={{
        backgroundColor: color,
      }}
      title={name}
    >
      )}
    </div>
  );
};

export default Marker;
