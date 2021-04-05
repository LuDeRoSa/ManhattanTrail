import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import { fbAuthenticate } from '../store';
import { connect } from 'react-redux';

class Facebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      clicked: false,
    };
  }

  componentClicked = () =>
    this.setState({
      clicked: true,
    });

  responseFacebook = (response) => {
    let username = response.email;
    let id = response.id;
    this.props.fbAuthenticate(username, id);
  };

  render() {
    console.log(this.state.isLoggedIn);
    let fbContent;

    if (this.state.clicked && this.state.isLoggedIn) {
      fbContent = null;
    } else {
      fbContent = (
        <FacebookLogin
          name='fb'
          appId='459306878548339'
          autoLoad={true}
          fields='name,email'
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
