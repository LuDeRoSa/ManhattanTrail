import React, { Component } from 'react';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import IconButton from '@material-ui/core/IconButton';

class InfoWindow extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return this.props.show ? (
      <div id='info' style={{ width: 100, height: 100 }}>
        {this.props.name}
        <br />
        <IconButton onClick={() => console.log('favorite')}>
          <FavoriteOutlinedIcon style={{ fontSize: 20, color: 'red' }} />
        </IconButton>
      </div>
    ) : null;
  }
}

export default InfoWindow;
