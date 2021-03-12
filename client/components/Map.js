import React from 'react';

import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import { setRests } from '../store/rest';
import Marker from './Marker';
import { nextStage } from '../store/game';
import { setGame } from '../store/game';

// //dummy data
// const points = [
//   { id: 1, title: 'The Smith', lat: 40.741895, lng: -73.989308 },
//   { id: 2, title: 'The Hillstone', lat: 40.7580445, lng: -73.9699967 },
//   { id: 3, title: 'Boqueria', lat: 40.77152, lng: -73.9561132 },
// ];
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
    if (this.props.game.status === 'no-game') {
      this.props.setGame(this.props.userId);
    }
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

  setCenter(index) {
    //call mapped dispatch to tell back end about new
    this.props.nextStage();
    const center = this.props.rest.rests[0][index];
    this.setState({
      center: {
        lat: center.restaurant_latitude,
        lng: center.restaurant_longitude,
      },
    });
  }
  createMapOptions(maps) {
    //these options create a frozen map. intention is to have the map move itself only to the new restarauns on its own
    return {
      panControl: false,
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      gestureHandling: 'none',
      styles: [
        {
          stylers: [
            { saturation: 0 },
            { gamma: 1 },
            { lightness: 4 },
            { visibility: 'on' },
          ],
        },
      ],
    };
  }

  render() {
    const { setMarker } = this;
    return (
      <React.Fragment>
        <div style={{ height: '90%', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyCnNLEaNM_3zfMo0yHe - nINMSUPPfyJwUI',
            }}
            zoom={13}
            center={this.state.center}
            options={this.createMapOptions}
          >
            {this.state.showMarker && (
              <Marker lat={this.state.center.lat} lng={this.state.center.lng} />
            )}
          </GoogleMapReact>
        </div>
        <div>
          <button onClick={() => this.setCenter(this.props.game.gameStage - 1)}>
            Next
          </button>
          {this.props.game.status}
          {this.props.game.status === 'finished' && 'gameover'}
        </div>
      </React.Fragment>
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
  return {
    userId: state.auth.id,
    rest: state.rest,
    game: state.game,
  };
};
const mapDispatch = {
  setRests,
  nextStage,
  setGame,
};

export default connect(mapState, mapDispatch)(_Map);
