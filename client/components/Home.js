import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Map from './Map';
import { setRests } from '../store/rest';
import { nextStage, fetchMiniGameComplete } from '../store/game';

import { setGame } from '../store/game';
import GameStart from './GameStart';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    [theme.breakpoints.up('xs')]: {
      height: false,
      alignItems: 'flex-start',
    },
    [theme.breakpoints.up('md')]: {
      height: '90vh',
      alignItems: 'center',
    },
  },
  map: {
    height: '30vh',
    [theme.breakpoints.up('md')]: {
      height: '70vh',
    },
    [theme.breakpoints.up('lg')]: {
      height: '80vh',
    },
  },
}));

export const Home = (props) => {
  const classes = useStyles();
  useEffect(() => {
    props.fetchMiniGameComplete();
  }, []);

  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (props.game.mini_status === 'finished') {
      setOpen(true);
    }
  }, [props.game.mini_status]);
  const handleClose = () => {
    setOpen(false);
  };

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
          Stage: {props.game.gameStage}. {props.nextDisplay}
        </Button>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          // keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {
              "You've finished the minigame! Click Continue Your Adventure to Continue!"
            }
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Stage: {props.game.gameStage}.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/* <Button
              variant="contained"
              color="primary"
              endIcon={<NavigateNextIcon />}
              onClick={() => {
                props.nextStage();
                handleClose();
              }}
            >
              {props.nextDisplay}
            </Button> */}
          </DialogActions>
        </Dialog>
      </center>
      <Grid
        container
        spacing={2}
        direction="row"
        alignContent="space-around"
        justify="space-evenly"
        className={classes.container}
      >
        <Grid item lg={1} md={false} sm={false} xs={false} />
        <Grid item lg={4} md={4} sm={10} xs={12} className={classes.map}>
          <Map />
        </Grid>
        <Grid item lg={1} md={false} sm={false} xs={false} />
        <Grid item lg={5} md={5} sm={10} xs={12}>
          <GameStart game_type={game_type} />
        </Grid>
        <Grid item lg={1} md={false} sm={false} xs={false} />
      </Grid>
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
