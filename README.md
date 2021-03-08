# FoodWasteGame, Szechuan Trail, Food Oregon Trail: an adventure educational game built on NERP

## Visit Us
https://luderosa.herokuapp.com/home

## NERP Stack
- Built with Node.js, Express.js, React.js, PostgreSQL over a month in a four person team

### Front End
- Front end utilizes React and Material UI for interface, Redux for store management, React Router for page management

- User authorization is persisted with local storage use of JWT Token

- User can log in via GitHub OAuth2 API

- Game progress is persistent across browsers/devices

- Google Maps API used to render current game location

### Back End
- Back end utilizes Express for RESTful API, Sequelize for ORM with PostgreSQL database

- User Authorization via JWT in header authorization tokens

- Passwords encrypted with bcrypt

### Deployment
- Deployed on Heroku with postgres db and secret keys for OAuth, Stripe, JWT
