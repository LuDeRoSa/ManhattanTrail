import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { fbAuthenticate } from '../store';
import { connect } from 'react-redux';

class Facebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  componentClicked = () => console.log('clicked');

  responseFacebook = (response) => {
    console.log(response);
    let username = response.email;
    let id = response.id;
    this.props.fbAuthenticate(username, id);
  };

  render() {
    let fbContent;

    if (this.state.isLoggedIn) {
      fbContent = null;
    } else {
      fbContent = (
        <FacebookLogin
          appId='459306878548339'
          autoLoad
          fields='name,email,picture'
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      );
    }
    return <div>{fbContent}</div>;
  }
}

const mapToDispatch = (dispatch) => {
  return {
    fbAuthenticate: (username, id) => dispatch(fbAuthenticate(username, id)),
  };
};

export default connect((state) => state, mapToDispatch)(Facebook);
