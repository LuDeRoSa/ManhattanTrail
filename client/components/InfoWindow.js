import React, { Component } from 'react';
import { connect } from 'react-redux';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import IconButton from '@material-ui/core/IconButton';
import { addFavorite } from '../store/favorites';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import './Style/InfoWindow.css';

class InfoWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.gameStage - 1,
      clicked: false,
      show: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.gameStage !== this.props.gameStage) {
      this.setState({
        clicked: false,
      });
    }
  }

  // this.props.gameStage being passedf from infoWindow to grab the right restaurant
  addFav() {
    this.setState({
      show: !this.state.show,
      clicked: true,
    });
    this.props.addFavorite(this.props.rests[this.props.gameStage - 1].id);
  }

  render() {
    const restaurantName = this.props.rests[this.props.gameStage - 1]
      .restaurant_name;

    const restId = this.props.rests[this.state.index].id;
    return (
      <div className='info' style={{ width: 100, height: 80 }}>
        {restaurantName}
        {/* <br /> */}
        <Button onClick={() => this.addFav(restId)}>
          {!this.state.clicked && (
            <FavoriteBorderOutlinedIcon
              style={{
                fontSize: 20,
              }}
            />
          )}
          {this.state.clicked && (
            <FavoriteOutlinedIcon
              style={{
                fontSize: 20,
              }}
            />
          )}
        </Button>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    rests: state.rest.rests,
    gameStage: state.game.gameStage,
  };
};

const mapToDispatch = (dispatch) => {
  return {
    addFavorite: (restId) => dispatch(addFavorite(restId)),
  };
};

export default connect(mapState, mapToDispatch)(InfoWindow);
