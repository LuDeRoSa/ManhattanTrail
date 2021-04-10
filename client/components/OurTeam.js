import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import makeStyles from '@material-ui/core/styles/makeStyles';
import './Style/AboutUs.css';
import CardMedia from '@material-ui/core/CardMedia';

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
      <div className="tech-heading">Our Team</div>
      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
        justify="space-around"
      >
        <Grid item xs={12} sm={6} lg={3}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              component="img"
              alt="team-picture"
              // height="140"
              image="./img/devy.jpeg"
            />
            <b> Devy Agarwal </b>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              component="img"
              alt="team-picture"
              // height="140"
              image="./img/samir.jpg"
            />
            <b>Samir Jain</b>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              component="img"
              alt="team-picture"
              // height="140"
              image="./img/luisa.jpeg"
            />
            <b>Luisa Zhou</b>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              component="img"
              alt="team-picture"
              // height="140"
              image="./img/rommel.png"
            />
            <b>Rommel Demano</b>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OurTeam;
