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

  componentClicked = () =>
    this.setState({
      clicked: true,
    });

  responseFacebook = (response) => {
    let username = response.email;
    let id = response.id;
    if (this.state.clicked) {
      this.props.fbAuthenticate(username, id);
    }
  };

  render() {
    console.log(this.state.clicked);
    let fbContent;

    // if (this.state.isLoggedIn) {
    //   fbContent = null;
    // } else {
    //   fbContent = (
    //     <FacebookLogin
    //       name='fb'
    //       appId='459306878548339'
    //       autoLoad={true}
    //       fields='name,email'
    //       onClick={this.componentClicked}
    //       callback={this.responseFacebook}
    //     />
    //   );
    // }

    if (this.state.clicked) {
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
    } else {
      fbContent = null;
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
