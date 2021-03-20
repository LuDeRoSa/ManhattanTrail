import React from 'react';

import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import { setRests, setGameTypes } from '../store/rest';
import Marker from './Marker';
import { nextStage } from '../store/game';
import { setGame } from '../store/game';
import InfoWindow from './InfoWindow';

import Quiz from './Quiz';
import PhaserGame from './PhaserGame'

class _Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      center: { lat: 40.7127281, lng: -74.0060152 },
      show: false,
    };
    this.setCenter = this.setCenter.bind(this);
    this.stepStage = this.stepStage.bind(this);
  }

  componentDidMount() {
    if (this.props.game.status === 'no-game') {
      this.props.setGame(this.props.userId);
    }
    this.props.setGameTypes(this.props.game.pathId);
    this.props.setRests(this.props.game.pathId);

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
    //console.log(this.props.rests);
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
    //console.log('GAMESTAGE',this.props.game.gameStage);
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

  render() {
    return (
      <React.Fragment>
        <div style={{ height: '90%', width: '100%' }}>
        {/* {this.props.rests
              .map((r) => (
                r.game_type
              ))} */}
              
              
              
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyCnNLEaNM_3zfMo0yHe - nINMSUPPfyJwUI',
            }}
            zoom={13}
            center={this.state.center}
            options={this.createMapOptions}
          >
          
            {this.props.rests.length > 0 && this.props.game.gameStage > 0 && (
              <Marker
                key={'main'}
                lat={
                  this.props.rests[this.props.game.gameStage - 1]
                    .restaurant_latitude
                }
                lng={
                  this.props.rests[this.props.game.gameStage - 1]
                    .restaurant_longitude
                }
                color={'red'}
              />
            )}

            {this.props.rests
              .filter((r, idx) => idx < this.props.game.gameStage - 1)
              .map((r) => (
                <Marker
                  key={r.id}
                  lat={r.restaurant_latitude}
                  lng={r.restaurant_longitude}
                  color={'black'}
                />
              ))}
          </GoogleMapReact>
        </div>
        <div>
          <button onClick={this.stepStage}>Next</button>
          {this.props.game.status}
          {this.props.game.gameStage}
          
          {/* this.props.rests[this.props.game.gameStage].game_type */}
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
  setGameTypes,
  nextStage,
  setGame,
};

export default connect(mapState, mapDispatch)(_Map);
