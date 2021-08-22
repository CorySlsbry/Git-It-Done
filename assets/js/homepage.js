
// gets data from link. THEN function response {response.json} to convert data. THEN function data.
var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a request to the url
    fetch(apiUrl).then(function(response) {
      response.json().then(function(data) {
        console.log(data);
      });
    });
  };

getUserRepos("microsoft");
//////////////////