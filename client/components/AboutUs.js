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
    margin: '1rem',
    padding: '1rem',
  },
  card: { margin: '1rem', padding: '1rem' },
};


class AboutUs extends Component {
  state = {  }
  render() {
    return (
      <Paper style={styles.paper}>
        <div className="tech-heading">Technologies</div>
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justify="space-around"
      >

        <Grid item xs={12} sm={6} lg={4}>
          <Card style={styles.card}>
            <CardMedia
            // className={classes.media}
            src={require('logo.svg')}
            component="img"
            // style={styles.media}
            />
            React.js
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Card style={styles.card}>
            Material UI
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Card style={styles.card}>
            Google Maps API
          </Card>
        </Grid>
      </Grid>
    </Paper>




    );
  }
}

export default AboutUs;
