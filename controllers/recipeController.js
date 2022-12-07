const axios = require("axios");

exports.index = async( req, res) => { 
    await axios.get('https://platform.fatsecret.com/rest/server.api?method=recipes.search.v2&format=json&max_results=50', {headers: {
    Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVGQUQ4RTE5MjMwOURFRUJCNzBCMzU5M0E2MDU3OUFEMUM5NjgzNDkiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJYNjJPR1NNSjN1dTNDeldUcGdWNXJSeVdnMGsifQ.eyJuYmYiOjE2NzAzNzY2NzgsImV4cCI6MTY3MDQ2MzA3OCwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI3Njk3NWEzYzNmZTI0N2QyOTkxZGE4ZjEwNmM4YzhiZiIsInNjb3BlIjpbImJhc2ljIl19.fwh44PBGXNBjCYbCgqSEtO_g0kC3bQOgX-Wz_nqqU856pVafB5xmoyz9qkNAbv6lWpOOrozdaSWpahJUKUMcKD7kQV-Z5rZSLGjRJfDiQ77-1x79v3dXY9fzTiZGhVQSgpJAtMh-i0a5k96-hwC2kM530AZs9WeP6QMOb2N7SoNWrs0U_qvux6Qmy1BlLA8repMAoi312LLAlGa3YqPeu3wKqf1QMD5lWFx3me_9x9jZ6XZNojZfq5g8lmLaSLnQOgAlJPTe85NNsAj3JNc14wqc3py6vgOoQ-vMHN05xgjUM_FLFg7RwVTqZ8okI1qcJj8w48oTVfrxrRMk3vfiGA"
}}    
)
.then(response => {
    const results = response.data;
    res.status(200).json(results);

}).catch (err => {console.log(err)} )
}
