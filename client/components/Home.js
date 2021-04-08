import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Map from './Map';
import { setRests } from '../store/rest';
import { nextStage, fetchMiniGameComplete } from '../store/game';

import { setGame } from '../store/game';
import GameStart from './GameStart';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Home = (props) => {
  useEffect(() => {
    props.fetchMiniGameComplete();
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (props.game.mini_status === 'finished') {
      setOpen(true);
    }
  }, [props.game.mini_status]);

  const game_type =
    props.rests.length > 0
      ? props.rests[props.game.gameStage - 1].game_type
      : '';
  return (
    <div>
      <center>
        <Button
          variant="contained"
          color="primary"
          disabled={props.game.mini_status !== 'finished'}
          endIcon={<NavigateNextIcon />}
          onClick={props.nextStage}
        >
          {props.nextDisplay}
        </Button>
      </center>
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justify="space-around"
        style={{ height: '90vh' }}
      >
        <Grid item lg={1} md={1} sm={false} xs={false} />
        <Grid item lg={4} md={4} sm={10} xs={12} style={{ height: '70vh' }}>
          <Map />
        </Grid>
        <Grid item lg={1} md={false} sm={false} xs={false} />
        <Grid item lg={5} md={5} sm={10} xs={12}>
          <GameStart game_type={game_type} />
        </Grid>
        <Grid item lg={1} md={1} sm={false} xs={false} />
      </Grid>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {'Mini Game finished! Continue to next stage'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You're ready to move onto the next stage on {props.game.path_name}{' '}
            pathway. Your score so far is {props.game.total_score}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            disabled={props.game.mini_status !== 'finished'}
            endIcon={<NavigateNextIcon />}
            onClick={() => {
              props.nextStage();
              handleClose();
            }}
          >
            {props.nextDisplay}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    userId: state.auth.id,
    rests: state.rest.rests,
    game: state.game,
    nextDisplay:
      state.game.gameStage === state.rest.rests.length
        ? 'End Game'
        : 'Continue your Adventure!',
  };
};
const mapDispatch = {
  setRests,
  nextStage,
  setGame,
  fetchMiniGameComplete,
};
export default connect(mapState, mapDispatch)(Home);
