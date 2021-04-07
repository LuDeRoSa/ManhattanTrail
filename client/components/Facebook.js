import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import { fbAuthenticate } from '../store';
import { connect } from 'react-redux';

class Facebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }

  componentClicked = () => console.log('cliked');

  responseFacebook = (response) => {
    let username = response.email;
    let id = response.id;
    this.setState({
      clicked: true,
    });
    if (this.state.clicked) {
      this.props.fbAuthenticate(username, id);
    }
  };

  render() {
    return (
      <div>
        {
          <FacebookLogin
            name='fb'
            appId='459306878548339'
            autoLoad={false}
            fields='name,email'
            onClick={this.componentClicked}
            callback={this.responseFacebook}
          />
        }
      </div>
    );
  }
}

const mapToDispatch = (dispatch) => {
  return {
    fbAuthenticate: (username, id) => dispatch(fbAuthenticate(username, id)),
  };
};

export default connect((state) => state, mapToDispatch)(Facebook);
