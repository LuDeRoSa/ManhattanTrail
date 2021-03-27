import React from 'react';
import { connect } from 'react-redux';
import { Link, matchPath } from 'react-router-dom';
import PastGames from './PastGames';
import { getFav } from '../store/favorites';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    let userId = this.props.account.id;
    this.props.getFav(userId);
  }

  onChange(ev) {
    console.log(ev.target.files);
  }
  render() {
    const { account, favorites } = this.props;

    console.log('favorites', favorites);

    return (
      <div className='account-page'>
        <h2>Welcome {account.username}.</h2>
        <h3>Account details</h3>
        <ul id='account_component' className='account_component_class'>
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

        <ul>
          {favorites.map((favorite, idx) => (
            <li key={idx}>{favorite.restaurant.restaurant_name}</li>
          ))}
        </ul>

        <div>
          {favorites.map((favorite, idx) => (
            <li key={idx}>{favorite.restaurant.restaurant_name}</li>
          ))}
        </div>

        <ul>
          {favorites.map((favorite, idx) => (
            <li key={idx}>{favorite.restaurant.restaurant_name}</li>
          ))}
        </ul>
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
    favorites: state.favorites.favorites,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getFav: (userId) => dispatch(getFav(userId)),
  };
};

export default connect(mapState, mapDispatch)(Profile);
