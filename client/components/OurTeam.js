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
    margin: '5rem',
    padding: '1rem',
  },
  card: { margin: '1rem', padding: '1rem' },
  media: {
    height: 150,
    width: 150,
  },
};

class OurTeam extends Component {
  state = {};
  render() {
    return (
      <Container>
        <Paper style={styles.paper}>
          <div className="tech-heading">Our Team</div>
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
                  alt="team-picture"
                  // height="140"
                  image="./img/devy.jpeg"
                />
                <b> Devy Agarwal </b>
              </Card>
            </Grid>
            <Grid item xs={5} sm={5} lg={3}>
              <Card style={styles.card}>
                <CardMedia
                  style={styles.media}
                  component="img"
                  alt="team-picture"
                  // height="140"
                  image="./img/samir.jpg"
                />
                <b>Samir Jain</b>
              </Card>
            </Grid>
            <Grid item xs={5} sm={5} lg={3}>
              <Card style={styles.card}>
                <CardMedia
                  style={styles.media}
                  component="img"
                  alt="team-picture"
                  // height="140"
                  image="./img/luisa.jpeg"
                />
                <b>Luisa Zhou</b>
              </Card>
            </Grid>

            <Grid item xs={5} sm={5} lg={3}>
              <Card style={styles.card}>
                <CardMedia
                  style={styles.media}
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
      </Container>
    );
  }
}

export default OurTeam;
