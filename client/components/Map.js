import React, { useState } from 'react';
// import {
//   GoogleMap,
//   withScriptjs,
//   withGoogleMap,
//   Marker,
//   InfoWindow,
// } from "react-google-maps";

import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import { setRest } from '../store/restaurants';
//dummy data
const points = [
  { id: 1, title: 'The Smith', lat: 40.741895, lng: -73.989308 },
  { id: 2, title: 'The Hillstone', lat: 40.7580445, lng: -73.9699967 },
  { id: 3, title: 'Boqueria', lat: 40.77152, lng: -73.9561132 },
];

class _Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: [],
      restaurants: [],
    };
    this.setMarker = this.setMarker.bind(this);
  }

  componentDidMount() {
    this.props.setRest();
    console.log(this.props);
  }

  setMarker(arr) {
    this.setState({
      marker: arr,
    });
  }

  render() {
    const { setMarker } = this;
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyCnNLEaNM_3zfMo0yHe - nINMSUPPfyJwUI',
          }}
          defaultZoom={10}
          defaultCenter={{ lat: 40.7127281, lng: -74.0060152 }}
        ></GoogleMapReact>
        <div>
          <button onClick={() => this.setMarker()}>Next</button>
        </div>
      </div>
    );
  }
}

//changed the map package, converted it into a class. must fix the route to grab the right data.
//working on that next, pushing this for now so Samir and i can work on the same repo.

const mapState = (state) => {
  return state;
};
const mapDispatch = (dispatch) => {
  return {
    setRest: () => dispatch(setRest()),
  };
};

export default connect(mapState, mapDispatch)(_Map);
