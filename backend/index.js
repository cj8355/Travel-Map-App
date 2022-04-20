// requiring packages/libraries
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

// importing user/pin routes
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

// adding in the ability to use env variables
dotenv.config();

// parse incoming JSON req
app.use(express.json());

// connecting to MongoDB using mongoose
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}).then(() => {
    console.log("MongoDB connected");
})
.catch((err) => console.log(err));

// adding routes with express
app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

// starting the server
app.listen(8800, () => {
    console.log("Backend server is running");
});