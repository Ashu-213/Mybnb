const Joi = require('joi');
const reviews = require('./Models/reviews');

//for data validation of listings
const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),    
        price: Joi.number().required().min(0),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
    }).required(),
});

//for reviews
const reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comments: Joi.string().required(),
    }).required(),
});

module.exports = { listingSchema, reviewSchema };
