import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import './Style/AboutUs.css';
import { CardMedia } from '@material-ui/core';
import OurTeam from './OurTeam';

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: '1rem',
    backgroundColor: theme.palette.background.default,
  },
  card: {
    margin: '1rem',
    padding: '1rem',
    backgroundColor: theme.palette.background.default,
  },
  media: {
    // height: 175,
    // width: 160,
  },
}));

export const AboutUs = (props) => {
  const classes = useStyles();

  return (
    <Container>
      <Paper variant="outlined" square className={classes.paper}>
        <div className="tech-heading">Technologies</div>
        <Grid
          container
          spacing={1}
          direction="row"
          alignItems="center"
          justify="space-around"
        >
          <Grid item xs={5} sm={5} lg={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                component="img"
                alt="react-logo"
                image="./img/react-logo.png"
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                component="img"
                alt="material-ui-logo"
                image="./img/material-ui-logo.png"
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                component="img"
                alt="google-maps-logo"
                image="./img/google-maps-logo.png"
              />
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                component="img"
                alt="node-js-logo"
                image="./img/node-js-logo.svg"
              />
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                component="img"
                alt="express-logo"
                // height="140"
                image="./img/express-logo.jpeg"
              />
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                component="img"
                alt="postgres SQL logo"
                image="./img/postgresql-logo.png"
              />
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                component="img"
                alt="OAuth2.0 logo"
                image="./img/oauth-logo.png"
              />
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                component="img"
                alt="Sequelize Logo"
                image="./img/sequelize-logo.png"
              />
            </Card>
          </Grid>
        </Grid>
        <OurTeam />
      </Paper>
    </Container>
  );
};

export default AboutUs;
