const Listing = require('../Models/listing.js');
const wrapAsync = require('../utils/wrapAsync.js');

// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// const mapBoxToken = process.env.MAPBOX_TOKEN;
// const geocodingClient = mbxGeocoding({ accessToken: mapBoxToken });

const axios = require('axios');

// Index route - show all listings with search functionality
module.exports.index = wrapAsync(async (req, res) => {
    const { search } = req.query;
    let allListings;

    if (search) {
        // Search for listings matching the query in title, location, country, or description
        allListings = await Listing.find({
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
                { country: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        });
    } else {
        // If no search query, show all listings
        allListings = await Listing.find({});
    }

    res.render('listings/index.ejs', { listings: allListings, searchQuery: search || '' });
});

// Render new listing form
module.exports.rendernewform = (req, res) => {
    res.render('listings/new.ejs');
};

// Show individual listing
module.exports.showListing = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author'
            }
        })
        .populate('owner');

    if (!listing) {
        req.flash('error', 'Listing you requested for does not exist!');
        return res.redirect('/listings');
    }
    res.render('listings/show.ejs', { listing });
});

// Create new listing
module.exports.createListing = wrapAsync(async (req, res) => {

    // Geocode the location to get geometry data
    // const geoData = await geocodingClient.forwardGeocode({
    //     query: req.body.listing.location,
    //     limit: 1
    // }).send();
    // const newListing = new Listing(req.body.listing);
    // newListing.owner = req.user._id;

    //maptiler geocoding as alternative
    const geoResponse = await axios.get(`https://api.maptiler.com/geocoding/${encodeURIComponent(req.body.listing.location)}.json`, {
        params: {
            key: process.env.MAPTILER_KEY,
            limit: 1
        }
    });

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        newListing.image = { url, filename };
    }
    // newListing.geometry = geoData.body.features[0].geometry;
    newListing.geometry = geoResponse.data.features[0].geometry;

    let savedListing = await newListing.save();
    console.log(savedListing);

    req.flash('success', 'New Listing Created!');
    res.redirect('/listings');
});

// Render edit listing form
module.exports.editListing = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash('error', 'Listing you requested for does not exist!');
        return res.redirect('/listings');
    }
    // Prepare image URL for display in edit form
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render('listings/edit.ejs', { listing, originalImageUrl });
});

// Update listing
module.exports.updateListing = wrapAsync(async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== 'undefined') {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash('success', 'Listing Updated!');
    res.redirect(`/listings/${id}`);
});

// Delete listing
module.exports.deleteListing = wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success', 'Listing Deleted!');
    res.redirect('/listings');
});
