# Title

Recipe Box: back-end

## Tech Stack

Server: Node, Express, Axios, Knex, MySql

## Installation:

### Install Node js:

```bash
  npm init -y
  node app.js 
```
(start second line above after you have created an app.js file to start node app)

### Install Express, axios, cors and dotenv:

```bash
  npm install express, axios cors, dotenv
```

### Install knex and mysql and uuid for database:

```bash
  npm install knex mysql uuid
```

## API guide:

The FatSecret API requires you to add your IP address to your allowed addresses in your account so you will have to do it yourself with the below guide.

I used the API from FatSecret and in order to access their data, you need to signup and get a Client Id and Client Secret. (https://platform.fatsecret.com/api/Default.aspx?screen=r)
Save the Oauth 2.0 client Id and secret.

Then in Postman or equivalent app, under Authorization tab you need to obtain the Access Token. In order to do this you get the Access token url from here: https://platform.fatsecret.com/api/Default.aspx?screen=rapiauth2 - this is under Developers>Rest API>Authentication>OAuth 2.0 under Step 2.
Then in the Authorization tab in Postman you enter Bearer as the header prefix. Grant type is Client credentials. You enter the access token url you got from the above step. You enter your Client Id and Client Secret. The scope is basic. Client authentication is Send as Basic Auth header.
Then you click Get new access token. 
Save this token, it is active for 24 hours. After 24 hours you have to repeat the above to get a new one.

Then in the Headers tab in Postman or VS Code (whichever app you use) add a header called Authorization, and the value is Bearer (access token). Without the brackets. In VS code you would add this header to your axios requests as the second parameter.
(In my current code this is added)

Then in your FatSecret account go to your profile, Manage API keys, and click on the app you created. Under Allowed IP Addresses add your IP address or it will not return data.

Then from here you only need to replace the Access token in the headers whenever you get a new one.

## Usage/examples

```javascript
const express = require('express');
const router = express.Router();

router
    .route('/')
    .get(controller.index);
```


## Lessons learned:

I learned how to access a complicated API such as FatSecret. It took me quite some time to figure out all the steps. I also learned how to work with 2 sources of data. 
I also learned how to retrieve data from one source and combine it with another source to display the saved recipes on the front end.
I learned how to connect to FatSecret from the backend with the header parameter.



