import React from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import { setRests } from '../store/rest';
import Marker from './Marker';
import { nextStage } from '../store/game';
import { setGame } from '../store/game';
class _Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      center: { lat: 40.7127281, lng: -74.0060152 },
      show: false,
      startingPoint: { lat: 40.7127281, lng: -74.0060152 },
    };
    this.setCenter = this.setCenter.bind(this);
    this.stepStage = this.stepStage.bind(this);
  }
  componentDidMount() {
    if (this.props.game.status === 'no-game') {
      this.props.setGame(this.props.userId);
    }
    this.props.setRests(this.props.game.path_name);
    if (this.props.rests.length > 0) {
      this.setCenter();
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.rests !== this.props.rests) {
      if (this.props.rests.length > 0) {
        this.setCenter();
      }
    }
  }
  setCenter() {
    const index = this.props.game.gameStage - 1;
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
  stepStage() {
    this.props.nextStage();
    this.setCenter();
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
        <div style={{ height: '90%', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyCnNLEaNM_3zfMo0yHe - nINMSUPPfyJwUI',
            }}
            zoom={12}
            center={this.state.center}
            options={this.createMapOptions}
            onChildClick={() => this.onChildClick()}
          >
            {this.props.rests.length > 0 && this.props.game.gameStage > 0 && (
              <Marker
                key={'main'}
                lat={this.state.startingPoint.lat}
                lng={this.state.startingPoint.lng}
                color={this.props.game.gameStage === 1 ? 'red' : 'black'}
                show={this.state.show}
                name='starting point'
              />
            )}
            {this.props.rests.length > 0 &&
              this.props.rests
                .filter((r, idx) => idx < this.props.game.gameStage - 1)
                .map((r, idx) => (
                  <Marker
                    key={r.id}
                    name={r.restaurant_name}
                    lat={r.restaurant_latitude}
                    lng={r.restaurant_longitude}
                    color={
                      this.props.game.gameStage - 2 === idx ? 'red' : 'black'
                    }
                    show={this.state.show}
                  />
                ))}
          </GoogleMapReact>
        </div>
        <div id = 'next-button-div'>
          {this.props.game.mini_status === 'finished'
              ? <button id = 'next-button' onClick={this.stepStage}>Move to Next Stage »</button>
              : ''
          }
        </div>
        <div>
          <button onClick={this.stepStage}>Next</button>
          {this.props.game.status}
          {this.props.game.gameStage}
          {this.props.game.status === 'finished' && 'gameover'}
        </div>
      </React.Fragment>
    );
  }
}
const mapState = (state) => {
  return {
    userId: state.auth.id,
    rests: state.rest.rests,
    game: state.game,
  };
};
const mapDispatch = {
  setRests,
  nextStage,
  setGame,
};
export default connect(mapState, mapDispatch)(_Map);