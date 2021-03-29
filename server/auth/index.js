const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

//github callback if using github OAUTH
router.get('/github/callback', async (req, res, next) => {
  //User.authenticateGithub will attempt to use code to find a user in our system.
  //if successful, a jwt token will be returned
  //that token will be set in localStorage
  //and client will redirect to home page
  try {
    res.send(
      `
      <html>
      <body>
        <script>
        window.localStorage.setItem('token', '${await User.authenticateGithub(
          req.query.code
        )}');
        window.document.location = '/';
        </script>
      </body>
      </html>
      `
    );
  } catch (ex) {
    next(ex);
  }
});

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

router.post('/facebook', async (req, res, next) => {
  try {
    res.send({ token: await User.fbAuthenticate(req.body) });
  } catch (err) {
    next(err);
  }
});
