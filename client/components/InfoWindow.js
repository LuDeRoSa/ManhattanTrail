import React, { Component } from 'react';
import { connect } from 'react-redux';
// import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import IconButton from '@material-ui/core/IconButton';
import { addFavorite } from '../store/favorites';

import './Style/InfoWindow.css';

class InfoWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.game.gameStage - 1,
      show: false,
    };
  }

  addFav() {
    this.setState({
      show: !this.state.show,
    });
    this.props.addFavorite(this.state.index);
  }

  render() {
    const { name } = this.props;
    const restId = this.props.rest.rests[this.state.index].id;
    return this.props.show ? (
      <div id='info' style={{ width: 100, height: 100 }}>
        {this.props.name}
        <br />
        <IconButton onClick={() => this.addFav(restId)}>
          <FavoriteBorderOutlinedIcon style={{ fontSize: 20, color: 'red' }} />
        </IconButton>
      </div>
    ) : null;
  }
}

const mapToDispatch = (dispatch) => {
  return {
    addFavorite: (restId) => dispatch(addFavorite(restId)),
  };
};

export default connect((state) => state, mapToDispatch)(InfoWindow);
