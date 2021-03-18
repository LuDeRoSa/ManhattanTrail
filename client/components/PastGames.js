import React from 'react';
import { connect } from 'react-redux';

import { fetchPastGames } from '../store/pastgames';
import GamesTable from './GamesTable';

class PastGames extends React.Component {
  componentDidMount() {
    this.props.fetchPastGames();
  }
  render() {
    const styles = {
      Table: {
        minWidth: 650,
        height: 200,
        overflowY: 'auto',
      },
      Row: {},
      Cell: {
        width: 130,
      },
    };
    let { pastgames } = this.props;
    return (
      <React.Fragment>
        <GamesTable data={pastgames} />
      </React.Fragment>
    );
  }
} //end class

const mapState = (state) => {
  return {
    pastgames: state.pastgames.pastgames,
  };
};

const mapDispatch = {
  fetchPastGames,
};

export default connect(mapState, mapDispatch)(PastGames);
