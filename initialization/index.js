const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../Models/listing.js");
const { init } = require("../Models/reviews.js");

const mongoURI = 'mongodb://127.0.0.1:27017/test';

async function main() {
    try {
        await mongoose.connect(mongoURI);
        console.log('Database connection successful');
    } catch (err) {
        console.error('Database connection error:', err);
    }
}
main();

const initDB = async () => {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({ ...obj, owner: '674c8ade8b7e3a4cec4ef7aa' }));
    await Listing.insertMany(initdata.data);
    console.log("Database initialized");
};
initDB();
