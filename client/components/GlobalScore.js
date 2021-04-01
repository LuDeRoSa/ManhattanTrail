import React from 'react';
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
const GlobalScore = (props) => (
  <>
    <Chip
      variant="default"
      color="secondary"
      icon={<TrackChangesIcon />}
      label={'Score:' + props.total_score}
    >
      Current Score: {props.total_score}{' '}
    </Chip>
  </>
);

const mapState = (state) => {
  return {
    total_score: state.game.total_score,
  };
};

export default connect(mapState)(GlobalScore);
