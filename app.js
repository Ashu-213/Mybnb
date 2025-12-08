if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
// console.log(process.env.SECRET);

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const listingRouter = require('./Routes/listing.js');
const reviewRouter = require('./Routes/review.js');
const cookieParser = require('cookie-parser');
const userRoutes = require('./Routes/user.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./Models/user.js');


// const mongoURI = 'mongodb://127.0.0.1:27017/test';
const dbURl = process.env.ATLAS_DB || 'mongodb://127.0.0.1:27017/test';


async function main() {
    try {
        await mongoose.connect(dbURl);
        console.log('Database connection successful');
    } catch (err) {
        console.error('Database connection error:', err);
    }
}
main();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser());


//connect-mongo setup
const store = MongoStore.create({
    mongoUrl: dbURl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 60 * 60 // time period in seconds(24 hours) 
});
store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e);
});

//session configuration
const sessionConfig = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7 // one week
    }
};


store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e);
});

sessionConfig.store = store;

app.use(session(sessionConfig));
app.use(flash());

//passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//flash middleware - make flash messages available to all templates
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
});

//root route
// app.get('/', (req, res) => {
//     res.send('Welcome To MYBNB');
// });


//use routers
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRoutes);  // Mount at root so /signup works directly

app.use((req, res, next) => {
    next(new ExpressError(404, "page not found!"));
});

//middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { statusCode, message });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

