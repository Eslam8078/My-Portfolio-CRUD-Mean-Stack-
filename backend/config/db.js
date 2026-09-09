const mongoose = require("mongoose");

async function connectDB() {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/testDB";
    await mongoose.connect(uri);
    return mongoose.connection;
}

module.exports = { connectDB };
