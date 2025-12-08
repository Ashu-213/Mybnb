const mongoose = require('mongoose');
const reviews = require('./reviews');
const schema = mongoose.Schema;
const Review = require('./reviews');    

const listingSchema = new schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        url: String,
        filename: String
        /*
        // no need for default image now as we are using cloudinary to upload images
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://assets.architecturaldesigns.com/plan_assets/344742712/original/36678TX_Render1_1668877906.jpg"
        }
        */
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    reviews:[{
        type: schema.Types.ObjectId,
        ref: 'Review'
    }],
    owner: {
        type: schema.Types.ObjectId,
        ref: 'User'
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    // category: {
    //     type: String,
    //     enum: ['Trending', 'Rooms', 'Homes', 'Cities', 'Outdoors', 'Beach', 'Winter', 'Nature', 'Urban']
    // },
});

// to delete associated reviews when a listing is deleted
listingSchema.post('findOneAndDelete', async function(doc) {
    if(doc){
        await reviews.deleteMany({
            _id: {
                $in: doc.reviews
            }
        });
    }
});


const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;