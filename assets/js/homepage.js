
// GETS or FETCHES data from link. THEN function response {response.json} to convert data. THEN function data.
var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a request to the url
    fetch(apiUrl).then(function(response) {     // FETCHES server data through API URL (fetch method)
      if (response.ok) {                        // CHECKS if response is ok
      response.json().then(function(data) {     // CONVERTS data to JSON and sets DATA perameter
        displayRepos(data, user);               // SENDS data from fetch to display functions
      });
    } else {
      alert("Error: GitHub User Not Found");    // ELSE returns alert
    }
    })
    .catch(function(error) {                    // CATCHES connection errors with GitHib (catch method)
        alert("Unable to connect to GitHub");
    });
  };
///////////////////////////////////////////////////////////////////////////////////

// TARGETS form in HTML, if there is a username it passes to getUserRepos function, adds event listener.
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var formSubmitHandler = function(event) {
    event.preventDefault();                     // PREVENTS running script right away
    
var username = nameInputEl.value.trim();        // GETS value from input element

if (username) {                                 // CHECKS if username is input
    getUserRepos(username);                     // STARTS get user repo funtion 
    nameInputEl.value = "";                     // SETS USERNAME value into  name input element in HTML
} else {
    alert("Please enter a GitHub username");    // ELSE returns alert
    }
  };

userFormEl.addEventListener("submit", formSubmitHandler);  // ADDS submit listener on form HTML element
//////////////////////////////////////////////////////////////////////////////////

// DISPLAYS selected information taken from the JSON information pull////////////
var displayRepos = function(repos, searchTerm) {

    // CHECKS if api returned any repos and STOPS if no repos are found
if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }
    
    repoContainerEl.textContent = "";           // CLEARS old content from search
    repoSearchTerm.textContent = searchTerm;    // DISPLAYS new search term content

    // LOOPS over ALL repos, CREATES HTML elements, and INSERTS into HTML ///////
for (var i = 0; i < repos.length; i++) {

    // FORMATS repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;
  
    // CREATES a container for each repo
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
  
    // CREATES a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // CREATES a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // CHECKS if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
    statusEl.innerHTML =
    "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    } else {
    statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // APPENDS or INSERTS status element to container
    repoEl.appendChild(statusEl);
  
    // APPENDS or INSERTS title element into container
    repoEl.appendChild(titleEl);
  
    // APPENDS or INSERTS repo element container to the dom
    repoContainerEl.appendChild(repoEl);
  }

    console.log(repos);
    console.log(searchTerm);
};

    // CONNECTS to HTML containers by ID
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
//////////////////////////////////////////////////////////////////////////////////