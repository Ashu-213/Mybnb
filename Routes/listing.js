const express = require("express");
const router = express.Router();
const { isLoggedIn, isOwner, joiValidateListing } = require('../middleware.js');
const listingController = require('../controllers/listings.js');
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage: storage });

//write same router at once using router.route()
//index and create routes
router
    .route("/")
    .get(listingController.index)
    .post(isLoggedIn, upload.single('listing[image]'), joiValidateListing, listingController.createListing);
    
// new route
router.get("/new", isLoggedIn, listingController.rendernewform);

// show route put and delete routes
router.route("/:id")
    .get(listingController.showListing)
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), joiValidateListing, listingController.updateListing)
    .delete(isLoggedIn, isOwner, listingController.deleteListing);

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, listingController.editListing);

module.exports = router;