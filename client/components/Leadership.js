import React from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { fetchLeadership } from '../store/pastgames';

import GamesTable from './GamesTable';

class Leadership extends React.Component {
  componentDidMount() {
    this.props.fetchLeadership();
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
    let { leadership } = this.props;
    return (
      <React.Fragment>
        <GamesTable data={leadership} />
      </React.Fragment>
    );
  }
} //end class

const mapState = (state) => {
  return {
    leadership: state.pastgames.leadership,
  };
};

const mapDispatch = {
  fetchLeadership,
};

export default connect(mapState, mapDispatch)(Leadership);
