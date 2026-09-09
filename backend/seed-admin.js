require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user");

const run = async () => {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/testDB");

    const email = String(process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    const password = String(process.env.ADMIN_PASSWORD || "");
    const name = process.env.ADMIN_NAME || "Portfolio Admin";

    if (!email || password.length < 8) {
        throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD (minimum 8 characters) in .env");
    }

    let user = await User.findOne({ email });
    if (!user) {
        user = new User({ name, email, role: "admin" });
    }
    user.name = name;
    user.role = "admin";
    user.isActive = true;
    user.setPassword(password);
    await user.save();

    console.log(`Admin ready: ${email}`);
    await mongoose.disconnect();
};

run().catch(async error => {
    console.error(error.message);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
});
