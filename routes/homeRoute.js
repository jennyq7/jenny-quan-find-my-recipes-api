const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController.js');

router
    .route("/")
    .get(recipeController.index);

router
    .route("/:id")
    .get(recipeController.oneRecipe);

router
    .route('/add')
    .post(recipeController.addRecipe);  
    
router
    .route('/saved')
    .post(recipeController.saveRecipe)
    .get(recipeController.storedRecipes);

module.exports = router;