const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;
const authRoute = require("./Routes/AuthRoute");
const todoRoute = require("./Routes/TodoRoutes");
const path = require('path');

mongoose
    .connect(MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{
        console.log("MongoDB is  connected successfully")})
    .catch((err) => console.error(`Error: ${err}`));
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    });

app.use(
    cors(
        {
        origin:["http://localhost:5173"],
        methods:['GET',"POST","PUT","DELETE"],
        credentials:true,
    }
    )
)
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/",authRoute)
app.use("/",todoRoute)
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
