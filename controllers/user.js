const User = require('../Models/user.js');
const wrapAsync = require('../utils/wrapAsync.js');

module.exports.rendersignupForm = (req, res) => {
    res.render('users/signup.ejs');
};

module.exports.signupForm = wrapAsync(async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            console.log('User registered:', registeredUser.username);
            req.flash('success', 'Welcome to Airbnb!');
            res.redirect('/listings');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
});

module.exports.renderloginForm = (req, res) => {
    res.render('users/login.ejs');
};

module.exports.login = async (req, res) => {
        req.flash('success', 'Welcome back!');
        const redirectUrl = req.session.returnTo || '/listings';
        res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logged out successfully');
        res.redirect('/listings');
    });
};