const authController = require('../controller/auth');
const router = require('express').Router();

router
    .post('/signUp', authController.signUp)
    .get('/login', authController.login)



module.exports = router;