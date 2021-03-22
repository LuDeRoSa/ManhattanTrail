import React, { useState } from 'react';
import InfoWindow from './InfoWindow';

const Marker = (props) => {
  const { color, name } = props;
  // const [show, setShow] = useState(null);
  // console.log('marker', name);
  function onClose() {
    React.useState({ show: true });
  }
  return (
    <div
      className='marker'
      style={{
        backgroundColor: color,
        // cursor: 'pointer'
      }}
      title={name}
    >
      {' '}
      {color === 'red' && (
        <InfoWindow
          show={props.show}
          lat={props.lat}
          lng={props.lng}
          // id={props.id}
          name={name}
        />
      )}
    </div>
  );
};

export default Marker;
