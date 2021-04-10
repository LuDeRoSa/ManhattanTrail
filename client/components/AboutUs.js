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
    // height: 175,
    // width: 160,
  },
};

 export const AboutUs = (props) => {


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
                <b> React.js </b>

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
              </Card>
            </Grid>


            <Grid item xs={5} sm={5} lg={3}>
              <Card style={styles.card}>
                <CardMedia
                  style={styles.media}
                  component="img"
                  alt="logo"
                  // height="140"
                  image="./img/node-js-logo.svg"
                />
                <b>Node.js</b>
              </Card>
            </Grid>

            <Grid item xs={5} sm={5} lg={3}>
            <Card style={styles.card}>
                <CardMedia
                  style={styles.media}
                  component="img"
                  alt="logo"
                  // height="140"
                  image="./img/express-logo.jpeg"
                />
                <b>Express</b>
              </Card>
            </Grid>

            <Grid item xs={5} sm={5} lg={3}>
              <Card style={styles.card}>
                <CardMedia
                  style={styles.media}
                  component="img"
                  alt="logo"
                  // height="140"
                  image="./img/postgresql-logo.png"
                />
                <b>PostgreSQL</b>
              </Card>
            </Grid>

            <Grid item xs={5} sm={5} lg={3}>
              <Card style={styles.card}>
                <CardMedia
                  style={styles.media}
                  component="img"
                  alt="logo"
                  // height="140"
                  image="./img/oauth-logo.png"
                />
                <b>OAuth 2.0</b>
              </Card>
            </Grid>


            <Grid item xs={5} sm={5} lg={3}>
              <Card style={styles.card}>
                <CardMedia
                  style={styles.media}
                  component="img"
                  alt="logo"
                  // height="140"
                  image="./img/sequelize-logo.png"
                />
                <b>Sequelize</b>
              </Card>
            </Grid>


          </Grid>
          <OurTeam />
        </Paper>
      </Container>
    );

}

export default AboutUs;
