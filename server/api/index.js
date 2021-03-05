const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/path', require('./path'))
// router.use('/quiz', require('./quiz'))
// router.use('/responses', require('./responses'))
// router.use('/restaurant', require('./restaurant'))
// router.use('/scores', require('./scores'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
