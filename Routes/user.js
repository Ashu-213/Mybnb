const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user.js');


//signup get route and post route
router.route('/signup')
    .get(userController.rendersignupForm)
    .post(userController.signupForm);

    
//login get route and post route
router.route('/login')
    .get(userController.renderloginForm)
    .post(
        passport.authenticate('local', {
            failureRedirect: '/login',
            failureFlash: true,
        }), userController.login
    );

//logout route
router.get('/logout', userController.logoutUser);

module.exports = router;
