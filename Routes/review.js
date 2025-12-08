const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync.js');
const Review = require('../Models/reviews.js');
const Listing = require('../Models/listing.js');
const { joiValidateReview, isLoggedIn, isReviewAuthor } = require('../middleware.js');
const reviewController = require('../controllers/reviews.js');


//reviews post route
router.post("/", isLoggedIn, joiValidateReview, reviewController.createReview);

//review delete route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, reviewController.deleteReview);
 

module.exports = router;