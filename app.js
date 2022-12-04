const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`test running on ${PORT}`);
});



