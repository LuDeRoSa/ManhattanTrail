import React from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import Marker from './Marker';
import InfoWindow from './InfoWindow';
class _Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      center: {
        lat:
          this.props.rests[this.props.gameStage - 1].restaurant_latitude ||
          40.7127281,
        lng:
          this.props.rests[this.props.gameStage - 1].restaurant_longitude ||
          -74.0060152,
      },
      show: false,
    };
    this.setCenter = this.setCenter.bind(this);
  }

  componentDidMount() {
    if (this.props.rests.length > 0) {
      this.setCenter(this.props.gameStage - 1);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.rests !== this.props.rests) {
      if (this.props.rests.length > 0) {
        this.setCenter(this.props.gameStage - 1);
      }
    }
    if (prevProps.gameStage !== this.props.gameStage) {
      this.setCenter(this.props.gameStage - 1);
    }
  }

  setCenter(index = this.props.gameStage) {
    let center = this.props.rests[index];
    if (!center) {
      console.log('cancelling setCenter');
      return null;
    }
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
      draggableCursor: 'default',
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
  onChildClick() {
    this.setState({ show: !this.state.show });
  }
  render() {
    return (
      <React.Fragment>
        <InfoWindow
          show={this.state.show}
          lat={this.state.center.lat}
          lng={this.state.center.lng}
        />
        <div style={{ height: '90%', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyCnNLEaNM_3zfMo0yHe - nINMSUPPfyJwUI',
            }}
            zoom={16}
            center={this.state.center}
            options={this.createMapOptions}
            onChildClick={() => this.onChildClick()}
          >
            {this.props.rests.map((r, idx) => (
              <Marker
                key={r.id}
                name={r.restaurant_name}
                lat={r.restaurant_latitude}
                lng={r.restaurant_longitude}
                color={this.props.gameStage - 1 === idx ? 'red' : 'black'}
                show={this.state.show}
              />
            ))}
          </GoogleMapReact>
        </div>
      </React.Fragment>
    );
  }
}
const mapState = (state) => {
  return {
    rests: state.rest.rests,
    game: state.game,
    gameStage: state.game.gameStage,
  };
};
const mapDispatch = {};
export default connect(mapState, mapDispatch)(_Map);
