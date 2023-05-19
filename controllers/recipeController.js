const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require('uuid');
const axios = require("axios");
const fs = require("fs");


//function to get all data on homepage
exports.index = async (req, res) => {
    await axios.get('https://platform.fatsecret.com/rest/server.api?method=recipes.search.v2&format=json&max_results=50', {
        headers: {
            Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVGQUQ4RTE5MjMwOURFRUJCNzBCMzU5M0E2MDU3OUFEMUM5NjgzNDkiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJYNjJPR1NNSjN1dTNDeldUcGdWNXJSeVdnMGsifQ.eyJuYmYiOjE2ODQ1MzM0OTAsImV4cCI6MTY4NDYxOTg5MCwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI3Njk3NWEzYzNmZTI0N2QyOTkxZGE4ZjEwNmM4YzhiZiIsInNjb3BlIjpbImJhc2ljIl19.tDimTm4O5loAZDGbLtklMPjxgJT3RlZse967jszQm7TVMRIiOMuaOkkrNyez51thTy-ZIuh1OSEla_fRHRAZ8wUiLUWX8hH8fYqACVKEfCTpi8uxB9tB3Ieuv21jNcWf-Lmj9o-zfs5l7DwmcMFiLPY6ke7t_vupOcDSjEzca2aNAIjnNR-Q7J6p9xl7h6SnXGGwjMrVbnMVU-92KTIuyygzHhcZNfIZSpxTsKerrqqbgmAjIWU5msxNDhMKiOXBA4ymvl84fxkMWILYt1nPaxfFtbAtyfSlxBiKwuSP0hYi6N3TUUVLa4v2Rrwij0vUPoZ3SduwkbIdL3JiOD08EQ"
        } }
            ).then(response => {
        const results = response.data;
        res.status(200).json(results);
    }).catch(err => { console.log(err) });
}

//function to get details of one recipe
exports.oneRecipe = async (req, res) => {
    await axios.get(`https://platform.fatsecret.com/rest/server.api?method=recipe.get&format=json&recipe_id=${req.params.id}`, {
        headers: {
            Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVGQUQ4RTE5MjMwOURFRUJCNzBCMzU5M0E2MDU3OUFEMUM5NjgzNDkiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJYNjJPR1NNSjN1dTNDeldUcGdWNXJSeVdnMGsifQ.eyJuYmYiOjE2ODQ1MzM0OTAsImV4cCI6MTY4NDYxOTg5MCwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI3Njk3NWEzYzNmZTI0N2QyOTkxZGE4ZjEwNmM4YzhiZiIsInNjb3BlIjpbImJhc2ljIl19.tDimTm4O5loAZDGbLtklMPjxgJT3RlZse967jszQm7TVMRIiOMuaOkkrNyez51thTy-ZIuh1OSEla_fRHRAZ8wUiLUWX8hH8fYqACVKEfCTpi8uxB9tB3Ieuv21jNcWf-Lmj9o-zfs5l7DwmcMFiLPY6ke7t_vupOcDSjEzca2aNAIjnNR-Q7J6p9xl7h6SnXGGwjMrVbnMVU-92KTIuyygzHhcZNfIZSpxTsKerrqqbgmAjIWU5msxNDhMKiOXBA4ymvl84fxkMWILYt1nPaxfFtbAtyfSlxBiKwuSP0hYi6N3TUUVLa4v2Rrwij0vUPoZ3SduwkbIdL3JiOD08EQ"
    } }
    ).then(response => {
        const results = response.data;
        res.status(200).json(results);
    }).catch(err => { console.log(err) });
}

//function to add recipe
exports.addRecipe = async (req, res) => {
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
        let imageData = req.files.file.data;
        let imageName = req.files.file.name;
        let fileName = uuidv4() + "-" + imageName;
        let actualStaticFilePath = './public/images/' + fileName;
        let servedFilePath = "/images/" + fileName;
        let servedURL = 'https://recipe-box-app.azurewebsites.net' + servedFilePath;
        fs.writeFileSync(actualStaticFilePath, imageData);
       
        const newRecipe = req.body;
        newRecipe.recipe_id = uuidv4();
        newRecipe.recipe_image = '/images/mixed-fruits.jpg';
        newRecipe.recipe_image = servedURL;
        const data = await knex('recipe').insert(newRecipe);
        res.status(201).json(data);
    } catch (err) {
        res.status(400).send(`Missing information: ${err}`);
    }
}

//function to get new added recipes
exports.getNewRecipe = async (req, res) => {
    try {
        const recipeData = await knex('recipe').select(
            "*"
        );
        res.status(200).json(recipeData);
    } catch (err) { `failed` };
}

//function to save a recipe to the backend
exports.saveRecipe = async (req, res) => {
    try {
        const saved = req.body;
        const data = await knex('recipe').insert(saved);
        res.status(201).send('The recipe has been saved');
    } catch (err) {
        res.status(400).send(`Error:${err}`)
    }
}

//function to get the saved recipes from backend to front end
exports.storedRecipes = (req, res) => {

    knex("recipe").select("recipe_id").then(data => {
        const savedRecipe = [];
        const promises = [];
        const externalId = data.filter((item) => item.recipe_id.length < 9)
        for (i = 0; i < externalId.length; i++) {
            promises.push(axios.get(`https://platform.fatsecret.com/rest/server.api?method=recipe.get&format=json&recipe_id=${externalId[i].recipe_id}`, {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVGQUQ4RTE5MjMwOURFRUJCNzBCMzU5M0E2MDU3OUFEMUM5NjgzNDkiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJYNjJPR1NNSjN1dTNDeldUcGdWNXJSeVdnMGsifQ.eyJuYmYiOjE2ODQ1MzM0OTAsImV4cCI6MTY4NDYxOTg5MCwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI3Njk3NWEzYzNmZTI0N2QyOTkxZGE4ZjEwNmM4YzhiZiIsInNjb3BlIjpbImJhc2ljIl19.tDimTm4O5loAZDGbLtklMPjxgJT3RlZse967jszQm7TVMRIiOMuaOkkrNyez51thTy-ZIuh1OSEla_fRHRAZ8wUiLUWX8hH8fYqACVKEfCTpi8uxB9tB3Ieuv21jNcWf-Lmj9o-zfs5l7DwmcMFiLPY6ke7t_vupOcDSjEzca2aNAIjnNR-Q7J6p9xl7h6SnXGGwjMrVbnMVU-92KTIuyygzHhcZNfIZSpxTsKerrqqbgmAjIWU5msxNDhMKiOXBA4ymvl84fxkMWILYt1nPaxfFtbAtyfSlxBiKwuSP0hYi6N3TUUVLa4v2Rrwij0vUPoZ3SduwkbIdL3JiOD08EQ"
                }
            }).then(response => {
                savedRecipe.push(response.data);
            }))
        }
        Promise.all(promises).then(() => {
            res.status(200).json(savedRecipe);
        })
    })
        .catch(err => {
            res.status(400).send(`Error:${err}`)
        })
}