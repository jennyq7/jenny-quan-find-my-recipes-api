const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController.js');

router
    .route("/")
    .get(recipeController.index);

module.exports = router;