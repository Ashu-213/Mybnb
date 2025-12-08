const Listing = require('../Models/listing');
const Review = require('../Models/reviews.js');
const wrapAsync = require('../utils/wrapAsync.js');

module.exports.createReview = wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    const review = new Review(req.body.review);

    review.author = req.user._id; // Associate the review with the logged-in user

    listing.reviews.push(review);
    await review.save();
    await listing.save();
    console.log("new review saved");
    req.flash('success', 'Review submitted successfully!');
    res.redirect(`/listings/${listing._id}?success=review_submitted`);
});

module.exports.deleteReview = wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    console.log("review deleted");
    req.flash('success', 'Review deleted successfully!');
    res.redirect(`/listings/${id}`);
});