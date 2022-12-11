const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4} = require('uuid');

const axios = require("axios");

exports.index = async( req, res) => { 
    await axios.get('https://platform.fatsecret.com/rest/server.api?method=recipes.search.v2&format=json&max_results=50', {headers: {
    Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVGQUQ4RTE5MjMwOURFRUJCNzBCMzU5M0E2MDU3OUFEMUM5NjgzNDkiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJYNjJPR1NNSjN1dTNDeldUcGdWNXJSeVdnMGsifQ.eyJuYmYiOjE2NzA3MDEyNTcsImV4cCI6MTY3MDc4NzY1NywiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI3Njk3NWEzYzNmZTI0N2QyOTkxZGE4ZjEwNmM4YzhiZiIsInNjb3BlIjpbImJhc2ljIl19.L0vo_f03uSskspAiLlwf_gm_6ct6W-Q4Ih2494lJ8MP9Bvnb6STgrq66fALMLlQXuQ9qX99LwXelfif5RjTa9V5WUGY4NtQtJBsVbOjmV8hjaoxugo6HVIUG9y6R5Wruhmc1HXbw2FlwQxxLVz8_vLrE8BEjffC_2p8BYn8JdJI9HwCKib9n2NZ8YntU0Mya04eFFp-5KDB2_UBjxiZbN2hgYvRt9Qb6fgB0sSXaUvym87jE10GF0P-tjS9tOBQ2MoiVVf1Gx64akePA_hkrtNZTyEJ0MO0W9degHwYkLDMInM26ReT3QJWUczvfVqInR2kufR6Jv6_buV9BsJOl4Q"
}}    
)
.then(response => {
    const results = response.data;
    res.status(200).json(results);

}).catch (err => {console.log(err)} )
}

exports.oneRecipe = async (req, res) => {
    await axios.get(`https://platform.fatsecret.com/rest/server.api?method=recipe.get&format=json&recipe_id=${req.params.id}`, {headers: {
        Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVGQUQ4RTE5MjMwOURFRUJCNzBCMzU5M0E2MDU3OUFEMUM5NjgzNDkiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJYNjJPR1NNSjN1dTNDeldUcGdWNXJSeVdnMGsifQ.eyJuYmYiOjE2NzA3MDEyNTcsImV4cCI6MTY3MDc4NzY1NywiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI3Njk3NWEzYzNmZTI0N2QyOTkxZGE4ZjEwNmM4YzhiZiIsInNjb3BlIjpbImJhc2ljIl19.L0vo_f03uSskspAiLlwf_gm_6ct6W-Q4Ih2494lJ8MP9Bvnb6STgrq66fALMLlQXuQ9qX99LwXelfif5RjTa9V5WUGY4NtQtJBsVbOjmV8hjaoxugo6HVIUG9y6R5Wruhmc1HXbw2FlwQxxLVz8_vLrE8BEjffC_2p8BYn8JdJI9HwCKib9n2NZ8YntU0Mya04eFFp-5KDB2_UBjxiZbN2hgYvRt9Qb6fgB0sSXaUvym87jE10GF0P-tjS9tOBQ2MoiVVf1Gx64akePA_hkrtNZTyEJ0MO0W9degHwYkLDMInM26ReT3QJWUczvfVqInR2kufR6Jv6_buV9BsJOl4Q"
    }}    
    )
    .then(response => {
        console.log(response.data)
        const results = response.data;
        res.status(200).json(results);
    }).catch(err => {console.log(err)});
  
}
exports.addRecipe = async (req, res) => {
    console.log(req.body)
    if (
        !req.body.recipe_name ||
        !req.body.recipe_description ||
        !req.body.recipe_types ||
        !req.body.directions ||
        !req.body.cooking_time_min ||
        !req.body.ingredients
      )  
      {
        return res
          .status(400)
          .send("Please make sure to fill out the form completely");
      }
  try {  const newRecipe = req.body;
     newRecipe.recipe_id = uuidv4();
     newRecipe.recipe_image = '../public/images/recipe.jpg';
    const data = await knex('recipe').insert(newRecipe);
  } catch (err) {
    res.status(400).send(`Missing information: ${err}`);
  }
}


exports.getNewRecipe = async (req, res) => {
    try {
        const recipeData = await knex('recipe').select(
            "recipe_id",
            "recipe_name",
            "recipe_description",
            "recipe_types",
            "directions",
            "cooking_time_min",
            "ingredients",
            "recipe_image"
        );
        res.status(200).json(recipeData);
    } catch (err) {`Error retrieving data: ${err}`};
}


exports.saveRecipe = async (req, res) => {
  try {  const saved = req.body;
   
    const data = await knex('recipe').insert(saved);
    res.status(201).send('The recipe has been saved');
} catch (err) {
    res.status(400).send(`Error:${err}`)
}
}

exports.storedRecipes = async (req, res) => {
    try {
        const data = await knex("recipe").select("recipe_id");
       
        res.status(200).json(data);
  
    } catch (err) {
        res.status(400).send(`Error:${err}`)
    }
}