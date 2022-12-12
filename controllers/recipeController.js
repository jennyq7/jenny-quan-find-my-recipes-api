const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require('uuid');
const express = require('express');

const axios = require("axios");

exports.index = async (req, res) => {
    await axios.get('https://platform.fatsecret.com/rest/server.api?method=recipes.search.v2&format=json&max_results=50', {
        headers: {
            Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVGQUQ4RTE5MjMwOURFRUJCNzBCMzU5M0E2MDU3OUFEMUM5NjgzNDkiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJYNjJPR1NNSjN1dTNDeldUcGdWNXJSeVdnMGsifQ.eyJuYmYiOjE2NzA4NTcwMDEsImV4cCI6MTY3MDk0MzQwMSwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI3Njk3NWEzYzNmZTI0N2QyOTkxZGE4ZjEwNmM4YzhiZiIsInNjb3BlIjpbImJhc2ljIl19.uRt6M9TWh6rwI13uP3zXRlWEmI0cvQjQ1h7B3R7SJGQHz-tZzGUm7O49vctG9TJBJXGN3Iry1HU3pj5_2FuHcv0Cp_NMQfQaCJw30tKUe5jUPLpNd0_ewwe4RGH6UgztB5DLF14NBrGHOsTmfSDH73pUU5wG6u1ga9NK_AnWc9ujpx0Jxl1TXxK7XEzRbdQtQgX7Io7LbDKVo4OSJ1h8TQoKKPf5TBGm6a96Kvjx_95aJL3iWFfyN1xGKx3_C_JDt5miLMq_O9Lt-qIZq3qXdewtS3SKxeqxWSi9YI9guXq_wZ0OgD8jN_vb9arfKTpS0QAICqtblibKfdeJO6HjgA"
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
            Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVGQUQ4RTE5MjMwOURFRUJCNzBCMzU5M0E2MDU3OUFEMUM5NjgzNDkiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJYNjJPR1NNSjN1dTNDeldUcGdWNXJSeVdnMGsifQ.eyJuYmYiOjE2NzA4NTcwMDEsImV4cCI6MTY3MDk0MzQwMSwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI3Njk3NWEzYzNmZTI0N2QyOTkxZGE4ZjEwNmM4YzhiZiIsInNjb3BlIjpbImJhc2ljIl19.uRt6M9TWh6rwI13uP3zXRlWEmI0cvQjQ1h7B3R7SJGQHz-tZzGUm7O49vctG9TJBJXGN3Iry1HU3pj5_2FuHcv0Cp_NMQfQaCJw30tKUe5jUPLpNd0_ewwe4RGH6UgztB5DLF14NBrGHOsTmfSDH73pUU5wG6u1ga9NK_AnWc9ujpx0Jxl1TXxK7XEzRbdQtQgX7Io7LbDKVo4OSJ1h8TQoKKPf5TBGm6a96Kvjx_95aJL3iWFfyN1xGKx3_C_JDt5miLMq_O9Lt-qIZq3qXdewtS3SKxeqxWSi9YI9guXq_wZ0OgD8jN_vb9arfKTpS0QAICqtblibKfdeJO6HjgA"
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
        newRecipe.recipe_image = '/images/recipe.jpg';
        const data = await knex('recipe').insert(newRecipe);
        res.status(201).json(data);
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
                Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVGQUQ4RTE5MjMwOURFRUJCNzBCMzU5M0E2MDU3OUFEMUM5NjgzNDkiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJYNjJPR1NNSjN1dTNDeldUcGdWNXJSeVdnMGsifQ.eyJuYmYiOjE2NzA4NTcwMDEsImV4cCI6MTY3MDk0MzQwMSwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI3Njk3NWEzYzNmZTI0N2QyOTkxZGE4ZjEwNmM4YzhiZiIsInNjb3BlIjpbImJhc2ljIl19.uRt6M9TWh6rwI13uP3zXRlWEmI0cvQjQ1h7B3R7SJGQHz-tZzGUm7O49vctG9TJBJXGN3Iry1HU3pj5_2FuHcv0Cp_NMQfQaCJw30tKUe5jUPLpNd0_ewwe4RGH6UgztB5DLF14NBrGHOsTmfSDH73pUU5wG6u1ga9NK_AnWc9ujpx0Jxl1TXxK7XEzRbdQtQgX7Io7LbDKVo4OSJ1h8TQoKKPf5TBGm6a96Kvjx_95aJL3iWFfyN1xGKx3_C_JDt5miLMq_O9Lt-qIZq3qXdewtS3SKxeqxWSi9YI9guXq_wZ0OgD8jN_vb9arfKTpS0QAICqtblibKfdeJO6HjgA"
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