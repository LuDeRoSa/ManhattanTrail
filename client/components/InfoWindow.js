import React, { Component } from 'react';
import { connect } from 'react-redux';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import { addFavorite } from '../store/favorites';
import Chip from '@material-ui/core/Chip';

class InfoWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.gameStage - 1,
      clicked: false,
      show: false,
    };
    this.addFav = this.addFav.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.gameStage !== this.props.gameStage) {
      this.setState({
        clicked: false,
      });
    }
  }

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

    return (
      <>
        <Chip
          label={restaurantName}
          variant="default"
          color="secondary"
          onClick={this.addFav}
          icon={
            !this.state.clicked ? (
              <FavoriteBorderOutlinedIcon
                style={{
                  fontSize: 20,
                }}
              />
            ) : (
              <FavoriteOutlinedIcon
                label={restaurantName}
                style={{
                  fontSize: 20,
                }}
              />
            )
          }
        />
      </>
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
