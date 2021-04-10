import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import makeStyles from '@material-ui/core/styles/makeStyles';
import './Style/AboutUs.css';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    margin: '1rem',
    padding: '1rem',
    backgroundColor: theme.palette.background.default,
  },
  card: {
    margin: '1rem',
    padding: '1rem',
    backgroundColor: theme.palette.background.default,
  },
  media: {
    height: 150,
    width: 150,
  },
}));

export const OurTeam = (props) => {
  const classes = useStyles();
  return (
    <Paper variant="outlined" square className={classes.paper}>
      <div className="tech-heading">The Team</div>
      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
        justify="space-around"
      >
        <Grid item xs={12} sm={6} lg={3}>
          <Card className={classes.card}>
            <Typography variant="h5" component="h2" align="center">
              Devy Agarwal
            </Typography>
            <CardMedia
              className={classes.media}
              component="img"
              alt="team-picture"
              // height="140"
              image="./img/devy.jpeg"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card className={classes.card}>
            <Typography variant="h5" component="h2" align="center">
              Samir Jain
            </Typography>
            <CardMedia
              className={classes.media}
              component="img"
              alt="team-picture"
              // height="140"
              image="./img/samir.jpg"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card className={classes.card}>
            <Typography variant="h5" component="h2" align="center">
              Luisa Zhou
            </Typography>
            <CardMedia
              className={classes.media}
              component="img"
              alt="team-picture"
              // height="140"
              image="./img/luisa.jpeg"
            />
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <Card className={classes.card}>
            <Typography variant="h5" component="h2" align="center">
              Rommel Demano
            </Typography>
            <CardMedia
              className={classes.media}
              component="img"
              alt="team-picture"
              // height="140"
              image="./img/rommel.png"
            />
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OurTeam;
