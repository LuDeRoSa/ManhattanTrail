import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import PastGames from './PastGames';

//TODO: implement nicer image upload experience
//https://www.npmjs.com/package/react-images-upload

//TODO: send image on submit to backend route
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {}
  onChange(ev) {
    console.log(ev.target.files);
  }
  render() {
    const { account } = this.props;
    return (
      <div className="account-page">
        <h2>Welcome {account.username}.</h2>
        <h3>Account details</h3>
        <ul id="account_component" className="account_component_class">
          {Object.keys(account)
            .filter((key) => key !== 'password' && key !== 'id')
            .map((key, idx) => {
              return (
                <li key={idx}>
                  {key}: {account[key]}
                </li>
              );
            })}
        </ul>
        <h2>Favorited Restaraunts</h2>
        <div>{/* component table for favorites */}</div>
        <div className="edit-profile">
          <h3> Edit Account </h3>
          <ImageUpload />
        </div>
        <h2>Past Games</h2>
        <PastGames />
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    account: state.auth,
  };
};

export default connect(mapState, (dispatch) => {
  return {};
})(Profile);
