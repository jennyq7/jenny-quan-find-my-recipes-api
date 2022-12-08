const axios = require("axios");

exports.index = async( req, res) => { 
    await axios.get('https://platform.fatsecret.com/rest/server.api?method=recipes.search.v2&format=json&max_results=50', {headers: {
    Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVGQUQ4RTE5MjMwOURFRUJCNzBCMzU5M0E2MDU3OUFEMUM5NjgzNDkiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJYNjJPR1NNSjN1dTNDeldUcGdWNXJSeVdnMGsifQ.eyJuYmYiOjE2NzA0NzA5NTgsImV4cCI6MTY3MDU1NzM1OCwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI3Njk3NWEzYzNmZTI0N2QyOTkxZGE4ZjEwNmM4YzhiZiIsInNjb3BlIjpbImJhc2ljIl19.pZeRxbcEv4Gjens2P59soOEtG_NpB1EFcS9iyz5RCJVWjUIIKQkmukoMwQughvNY5KsnBjnObqQ2_godGfUPw-Uxl2yRTqBUz26t7SlE94TgyBbhVXL4CscmwS88-baOCDtLULf9U0kZZS5__Fi8SixbyeEahXblWbolUL5eG4rT41LhIcHklmLs_2iiE3geNpYWRwEBLDB6l7Y9aL2swWJbmk703uMi6XS_o0zQWP93y1YtwIi7SeNdXY-wRnUZPWwL6b4vplAiC1_CW5HkOR5wdBbgJUZyqL-lX3dpR2_XjRzCuhP0DJzWxZkdsBvODGAxoaVV9U1zAtUMCalD-Q"
}}    
)
.then(response => {
    const results = response.data;
    res.status(200).json(results);

}).catch (err => {console.log(err)} )
}


