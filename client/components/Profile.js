import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PastGames from './PastGames';

/**
 * COMPONENT
 */
class Profile extends React.Component {
  componentDidMount() {}
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
        <div className="edit-profile">
          <h3> Edit Account </h3>
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
