const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const homeRoutes = require("./routes/homeRoute");
const fileupload = require("express-fileupload");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(fileupload());

app.use("/recipes", homeRoutes);
app.use('/images', express.static('./public/images'));


app.listen(PORT, () => {
    console.log(`test running on ${PORT}`);
});



