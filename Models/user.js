const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({    //username and password will be added by passport-local-mongoose
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// passport-local-mongoose v9.0.0 has .default export
UserSchema.plugin(passportLocalMongoose.default);

// Delete all reviews by this user when user is deleted
UserSchema.post('findOneAndDelete', async function(doc) {
    if(doc){
        const Review = require('./reviews.js');
        await Review.deleteMany({
            author: doc._id
        });
    }
});

module.exports = mongoose.model('User', UserSchema);

