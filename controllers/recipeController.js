const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4} = require('uuid');

const axios = require("axios");

exports.index = async( req, res) => { 
    await axios.get('https://platform.fatsecret.com/rest/server.api?method=recipes.search.v2&format=json&max_results=50', {headers: {
    Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVGQUQ4RTE5MjMwOURFRUJCNzBCMzU5M0E2MDU3OUFEMUM5NjgzNDkiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJYNjJPR1NNSjN1dTNDeldUcGdWNXJSeVdnMGsifQ.eyJuYmYiOjE2NzA1OTgzNjQsImV4cCI6MTY3MDY4NDc2NCwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI3Njk3NWEzYzNmZTI0N2QyOTkxZGE4ZjEwNmM4YzhiZiIsInNjb3BlIjpbImJhc2ljIl19.qnV1Whe-aV7wL7xLyGxxkU3hek9vQUXa7fKO-tbt_7aJQwqC4FNnnsxFUwDd6Ad6FHfrUhV1SfC96gNnoyO7HoGZZ34zdd5maIBleF5a1gm5ROgCPva_AHZk-ExpOS6ukxmnRarqN61soj_8b1ajeya5w_Ni3GRik6nePbsTq_Z9toKbDQs20CojUbdMaWQrByhzayJqZUQKVwv9zH_Q6QqGIClnwjndBnWxub87HvsgtRDcCLhs-YmNSbWXTQJkrNqL8UBQs-fEAWIlxNB5wWthgMQr635-ExVOfV60ZeQnaLWjv983jFgKk4gRHIljIA2VjHyAFLBh7yzswU_MkA"
}}    
)
.then(response => {
    const results = response.data;
    res.status(200).json(results);

}).catch (err => {console.log(err)} )
}

exports.oneRecipe = async (req, res) => {
    await axios.get(`https://platform.fatsecret.com/rest/server.api?method=recipe.get&format=json&recipe_id=${req.params.id}`, {headers: {
        Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVGQUQ4RTE5MjMwOURFRUJCNzBCMzU5M0E2MDU3OUFEMUM5NjgzNDkiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJYNjJPR1NNSjN1dTNDeldUcGdWNXJSeVdnMGsifQ.eyJuYmYiOjE2NzA1OTgzNjQsImV4cCI6MTY3MDY4NDc2NCwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI3Njk3NWEzYzNmZTI0N2QyOTkxZGE4ZjEwNmM4YzhiZiIsInNjb3BlIjpbImJhc2ljIl19.qnV1Whe-aV7wL7xLyGxxkU3hek9vQUXa7fKO-tbt_7aJQwqC4FNnnsxFUwDd6Ad6FHfrUhV1SfC96gNnoyO7HoGZZ34zdd5maIBleF5a1gm5ROgCPva_AHZk-ExpOS6ukxmnRarqN61soj_8b1ajeya5w_Ni3GRik6nePbsTq_Z9toKbDQs20CojUbdMaWQrByhzayJqZUQKVwv9zH_Q6QqGIClnwjndBnWxub87HvsgtRDcCLhs-YmNSbWXTQJkrNqL8UBQs-fEAWIlxNB5wWthgMQr635-ExVOfV60ZeQnaLWjv983jFgKk4gRHIljIA2VjHyAFLBh7yzswU_MkA"
    }}    
    )
    .then(response => {
        console.log(response.data)
        const results = response.data;
        res.status(200).json(results);
    }).catch(err => {console.log(err)});
  
}
exports.addRecipe = async (req, res) => {
  try {  const newRecipe = req.body;
     newRecipe.id = uuidv4();
    const data = await knex('recipe').insert(newRecipe);
  } catch (err) {
    res.status(400).send('Missing information');
  }
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
        console.log(data);
        res.status(200).json(data);
  
    } catch (err) {
        res.status(400).send(`Error:${err}`)
    }
}