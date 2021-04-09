import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import './Style/AboutUs.css';
import { CardMedia } from '@material-ui/core';
import OurTeam from './OurTeam';

const styles = {
  root: {},
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-around',
    alignItems: 'center',
    height: '90vh',
  },
  paper: {
    margin: '5rem',
    padding: '1rem',
  },
  card: { margin: '1rem', padding: '1rem' },
  media: {
    height: 175,
    width: 175
  }
};


class AboutUs extends Component {
  state = {  }
  render() {
    return (
      <Container>
      <Paper style={styles.paper}>
        <div className="tech-heading">Technologies</div>
      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
        justify="space-around"
      >

        <Grid item xs={5} sm={5} lg={3}>
          <Card style={styles.card}>
          <CardMedia
          style={styles.media}
          component="img"
          alt="react-logo"
          // height="140"
          image="./img/react-logo.png"
        />
          <b>  React.js </b>
          <li>Builds user interfaces and interactive UI components</li>
          <li>Rich and dynamic single page and mobile applications</li>
          <li>React Hooks allowed state and lifecycle functions without writing entire classes</li>


          </Card>
        </Grid>
        <Grid item xs={5} sm={5} lg={3}>
        <Card style={styles.card}>
          <CardMedia
          style={styles.media}
          component="img"
          alt="material-ui-logo"
          // height="140"
          image="./img/material-ui-logo.png"
        />
          <b>Material UI</b>

          <li>Provides an optional CssBaseline component. </li>
          <li>Fixes some inconsistencies across browsers and devices while providing slightly more opinionated resets to common HTML elements</li>
          </Card>
        </Grid>
        <Grid item xs={5} sm={5} lg={3}>
        <Card style={styles.card}>
          <CardMedia
          style={styles.media}
          component="img"
          alt="google-maps-logo"
          // height="140"
          image="./img/google-maps-logo.png"
        />
          <b>Google Maps API</b>

          <li>Customize maps with your own content and imagery for display on web pages and mobile devices </li>

          </Card>
        </Grid>
      </Grid>
      <OurTeam/>
    </Paper>
  </Container>
    );
  }
}

export default AboutUs;
