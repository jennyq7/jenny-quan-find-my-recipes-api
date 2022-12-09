const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController.js');

router
    .route("/")
    .get(recipeController.index);

router
    .route("/:id")
    .get(recipeController.oneRecipe);

module.exports = router;