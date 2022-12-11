const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require('uuid');
const express = require('express');

const axios = require("axios");

exports.index = async (req, res) => {
    await axios.get('https://platform.fatsecret.com/rest/server.api?method=recipes.search.v2&format=json&max_results=50', {
        headers: {
            Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVGQUQ4RTE5MjMwOURFRUJCNzBCMzU5M0E2MDU3OUFEMUM5NjgzNDkiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJYNjJPR1NNSjN1dTNDeldUcGdWNXJSeVdnMGsifQ.eyJuYmYiOjE2NzA3NzQyNzUsImV4cCI6MTY3MDg2MDY3NSwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI3Njk3NWEzYzNmZTI0N2QyOTkxZGE4ZjEwNmM4YzhiZiIsInNjb3BlIjpbImJhc2ljIl19.WxsoSjUH2cinlRarZtRWsFSgvoiAEd75cgubgE0Am__rGhZHRFcxdQafnTwKrjMxwy_OJ9Nx91eXT6DZ1rYNKR6kzMJspNKpeCfEvu0qb0pC3yAFaQGB0qYGqp3Dq3vVGFeZYS_l-adrenI1T-cPg3sKVY-lWzdWTNYyiq5ZaxrJBuS2BRtRteOcb6wysDdQ51z6daVilHoBo-vQSAl31q2NwtreVL-3OxKmJxXTLWhbdTzyex7Z_JRPfu8G9eBqU1dIIgf3lHtQh1fpjWT9Q6Dpm8eueJtZcHfCA9jWkZCU2PYSJREv5gRAjxhzocX6U55OliQWjbn8SnjD1gpfnw"
        }
    }
    )
        .then(response => {
            const results = response.data;
            res.status(200).json(results);

        }).catch(err => { console.log(err) })
}

exports.oneRecipe = async (req, res) => {
    await axios.get(`https://platform.fatsecret.com/rest/server.api?method=recipe.get&format=json&recipe_id=${req.params.id}`, {
        headers: {
            Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVGQUQ4RTE5MjMwOURFRUJCNzBCMzU5M0E2MDU3OUFEMUM5NjgzNDkiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJYNjJPR1NNSjN1dTNDeldUcGdWNXJSeVdnMGsifQ.eyJuYmYiOjE2NzA3NzQyNzUsImV4cCI6MTY3MDg2MDY3NSwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI3Njk3NWEzYzNmZTI0N2QyOTkxZGE4ZjEwNmM4YzhiZiIsInNjb3BlIjpbImJhc2ljIl19.WxsoSjUH2cinlRarZtRWsFSgvoiAEd75cgubgE0Am__rGhZHRFcxdQafnTwKrjMxwy_OJ9Nx91eXT6DZ1rYNKR6kzMJspNKpeCfEvu0qb0pC3yAFaQGB0qYGqp3Dq3vVGFeZYS_l-adrenI1T-cPg3sKVY-lWzdWTNYyiq5ZaxrJBuS2BRtRteOcb6wysDdQ51z6daVilHoBo-vQSAl31q2NwtreVL-3OxKmJxXTLWhbdTzyex7Z_JRPfu8G9eBqU1dIIgf3lHtQh1fpjWT9Q6Dpm8eueJtZcHfCA9jWkZCU2PYSJREv5gRAjxhzocX6U55OliQWjbn8SnjD1gpfnw"
        }
    }
    )
        .then(response => {
            const results = response.data;
            res.status(200).json(results);
        }).catch(err => { console.log(err) });

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
    ) {
        return res
            .status(400)
            .send("Please make sure to fill out the form completely");
    }
    try {
        const newRecipe = req.body;
        newRecipe.recipe_id = uuidv4();
        newRecipe.recipe_image = 'http://localhost:8080/images/recipe.jpg';
        const data = await knex('recipe').insert(newRecipe);
    } catch (err) {
        res.status(400).send(`Missing information: ${err}`);
    }
}


exports.getNewRecipe = async (req, res) => {
    try {
        const recipeData = await knex('recipe').select(
            "*"
        );
        res.status(200).json(recipeData);
    } catch (err) { `failed` };
}


exports.saveRecipe = async (req, res) => {
    try {
        const saved = req.body;

        const data = await knex('recipe').insert(saved);
        res.status(201).send('The recipe has been saved');
    } catch (err) {
        res.status(400).send(`Error:${err}`)
    }
}

exports.storedRecipes =  (req, res) => {

    knex("recipe").select("recipe_id").then(data => {
        const savedRecipe = [];
        const promises = [];
        const externalId = data.filter((item) => item.recipe_id.length < 9)
        for(i=0; i < externalId.length; i++) {
         promises.push(axios.get(`https://platform.fatsecret.com/rest/server.api?method=recipe.get&format=json&recipe_id=${externalId[i].recipe_id}`,  {
            headers: {
                Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVGQUQ4RTE5MjMwOURFRUJCNzBCMzU5M0E2MDU3OUFEMUM5NjgzNDkiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJYNjJPR1NNSjN1dTNDeldUcGdWNXJSeVdnMGsifQ.eyJuYmYiOjE2NzA3NzQyNzUsImV4cCI6MTY3MDg2MDY3NSwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI3Njk3NWEzYzNmZTI0N2QyOTkxZGE4ZjEwNmM4YzhiZiIsInNjb3BlIjpbImJhc2ljIl19.WxsoSjUH2cinlRarZtRWsFSgvoiAEd75cgubgE0Am__rGhZHRFcxdQafnTwKrjMxwy_OJ9Nx91eXT6DZ1rYNKR6kzMJspNKpeCfEvu0qb0pC3yAFaQGB0qYGqp3Dq3vVGFeZYS_l-adrenI1T-cPg3sKVY-lWzdWTNYyiq5ZaxrJBuS2BRtRteOcb6wysDdQ51z6daVilHoBo-vQSAl31q2NwtreVL-3OxKmJxXTLWhbdTzyex7Z_JRPfu8G9eBqU1dIIgf3lHtQh1fpjWT9Q6Dpm8eueJtZcHfCA9jWkZCU2PYSJREv5gRAjxhzocX6U55OliQWjbn8SnjD1gpfnw"
            }
        }).then(response => {
                    savedRecipe.push(response.data);
                }) )
        }
        Promise.all(promises).then(() => {
            res.status(200).json(savedRecipe);
        })
        
    })

        .catch(err => {
            res.status(400).send(`Error:${err}`)
        })
    
}