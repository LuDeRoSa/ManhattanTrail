const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const axios = require('axios');

const SALT_ROUNDS = 5;

const User = db.define('user', {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  first_name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  github_id: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  facebook_id: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
})

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
}

User.prototype.generateToken = function() {
  return jwt.sign({id: this.id}, process.env.JWT)
}

/**
 * classMethods
 */
User.authenticate = async function({ username, password }){
    const user = await this.findOne({where: { username }})
    if (!user || !(await user.correctPassword(password))) {
      const error = Error('Incorrect username/password');
      error.status = 401;
      throw error;
    }
    return user.generateToken();
};

User.findByToken = async function(token) {
  try {
    const {id} = await jwt.verify(token, process.env.JWT)
    const user = User.findByPk(id)
    if (!user) {
      throw 'nooo'
    }
    return user
  } catch (ex) {
    const error = Error('bad token')
    error.status = 401
    throw error
  }
}

User.authenticateGithub = async function(code){
  //step 1: exchange code for token
  let response = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code
  }, {
    headers: {
      accept: 'application/json'
    }
  });
  const { data } = response;
  if(data.error){
    const error = Error(data.error);
    error.status = 401;
    throw error;
  }
  //step 2: use token for user info
  response = await axios.get('https://api.github.com/user', {
    headers: {
      authorization: `token ${ data.access_token }`
    }
  });
  const { login, id } = response.data;

  //step 3: either find user or create user
  let user = await User.findOne({ where: { githubId: id, username: login } });
  if(!user){
    user = await User.create({ username: login, githubId: id });
  }
  //step 4: return jwt token
  return user.generateToken();
}

/**
 * hooks
 */
const hashPassword = async(user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
}

User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)
User.beforeBulkCreate(users => {
  users.forEach(hashPassword)
})