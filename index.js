const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const writeFileAsync = util.promisify(fs.writeFile);

//Gather user input
function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "Enter your GitHub username"
    },
    {
      type: "input",
      name: "color",
      message: "Enter a color for styling"
    }
  ]);
}

//Define the structure of the created file
function generateHTML(answers) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <style>
    .card {
    background-color: ${color};
    color: white;
}
  </style>
  <title>Document</title>
</head>
<body>
  <div class="container">
    
    <div class="card" style="width: 18rem;">
        <img src="${res.avatar_url}" class="card-img-top" alt="Avatar">
        <div class="card-body">
            <p class="card-text">Hi! My name is ${res.name}<br>
              My GitHub username is ${res.login}<br>
              I am from ${res.location}<br>
              Bio message: ${res.bio}
            </p>
        </div>
    </div>

    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Links</h5>
            <a href="${res.html_url}" class="card-link">GitHub</a>
            <a href="${res.blog}" class="card-link">Blog</a>
        </div>
    </div>
    
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Number of Repos</h5>
            <p class="card-text">${res.public_repos}</p>
        </div>
    </div>

    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Followers</h5>
            <p class="card-text">${res.followers}</p>
        </div>
    </div>
   
   <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Following</h5>
            <p class="card-text">${res.following}</p>
        </div>
    </div>

  </div>
</body>
</html>`;
}

//Call the functions in order
promptUser()
.then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;
    axios.get(queryUrl);
})
.then(function(res) {
        (function(answers) {
            const html = generateHTML(answers);
            return writeFileAsync("index.pdf", html);
})
})
.catch(function(err) {
    console.log(err);
})


