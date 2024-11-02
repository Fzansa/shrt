const express = require("express");
const connectToMongoDB = require("./database");
const URL = require("./models/url");
const path = require('path');
const cookieParser = require("cookie-parser");
const cors = require('cors');
require('dotenv').config();


const urlRoute = require("./routes/url");

const app = express();
const PORT = 8000;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
connectToMongoDB(process.env.MONGODB_URL);


app.use('/', urlRoute);


app.listen(PORT, () => {
    console.log(`Server started ad ${PORT}`);
});