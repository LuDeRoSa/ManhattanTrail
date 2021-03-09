import React from "react";

import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
import rest, { setRests } from "../store/rest";
import Marker from "./Marker";

//dummy data
const points = [
  { id: 1, title: "The Smith", lat: 40.741895, lng: -73.989308 },
  { id: 2, title: "The Hillstone", lat: 40.7580445, lng: -73.9699967 },
  { id: 3, title: "Boqueria", lat: 40.77152, lng: -73.9561132 },
];
let index = 0;

class _Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: [],
      restaurants: [],
      center: { lat: 40.7127281, lng: -74.0060152 },
      showMarker: false,
    };
    this.setMarker = this.setMarker.bind(this);
  }

  componentDidMount() {
    this.props.setRests();
    this.setState({
      showMarker: true,
    });
  }

  setMarker(arr) {
    this.setState({
      marker: arr,
    });
  }

  setCenter(center) {
    this.setState({
      center: { ...center },
    });
    index++;
  }

  //   [1, 2, 3, 4]
  createMapOptions(maps) {
    //these options create a frozen map. intention is to have the map move itself only to the new restarauns on its own
    return {
      panControl: false,
      mapTypeControl: false,
      scrollwheel: false,
      zoomControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      scaleControl: false,
      gestureHandling: "none",
      styles: [
        {
          stylers: [
            { saturation: 0 },
            { gamma: 1 },
            { lightness: 4 },
            { visibility: "on" },
          ],
        },
      ],
    };
  }

  render() {
    const { setMarker } = this;

    console.log(this.props);

    return (
      <div style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyCnNLEaNM_3zfMo0yHe - nINMSUPPfyJwUI",
          }}
          zoom={13}
          center={this.state.center}
          options={this.createMapOptions}
        >
          {this.state.showMarker && (
            <Marker lat={this.state.center.lat} lng={this.state.center.lng} />
          )}
        </GoogleMapReact>

        <div>
          <button onClick={() => this.setCenter(points[index])}>Next</button>
        </div>
      </div>
    );
  }
}

// one restaurant
// as he clicks, the nxt marker shows
// requires to zoom,

//changed the map package, converted it into a class. must fix the route to grab the right data.
//working on that next, pushing this for now so Samir and i can work on the same repo.
//

// Games Model associatons User /  Scores / Path

const mapState = (state) => {
  return state;
};
const mapDispatch = (dispatch) => {
  return {
    setRests: () => dispatch(setRests()),
  };
};

export default connect(mapState, mapDispatch)(_Map);
