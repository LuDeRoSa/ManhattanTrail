import React, { Component } from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { fbAuthenticate } from '../store';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
class Facebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }
  componentClicked = () => console.log('clicked');
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
            name="fb"
            appId="459306878548339"
            autoLoad={false}
            fields="name,email"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
            render={(renderProps) => (
              <Button
                style={{ width: '300px', height: '40px', textAlign: 'center' }}
                variant="contained"
                color="primary"
                startIcon={<FacebookIcon />}
                onClick={renderProps.onClick}
              >
                Continue with Facebook
              </Button>
            )}
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
