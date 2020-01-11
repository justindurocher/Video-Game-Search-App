// variable to hold the total number of games from RAWG
let totalGames;
// variable to increment if the random game query was successful
let randomGameCount = 0;
let gameImageDisplayIndex = 1;

// query RAWG to get total number of games
$.ajax({
  url: 'https://api.rawg.io/api/games',
  method: 'GET'
}).then(function(response) {
  totalGames = response.count;
  console.log(totalGames);
  threeRandomGames();
})

// get 3 random games
function threeRandomGames() {
  let randNum = Math.floor(Math.random() * totalGames);
  // console.log(randNum);

  $.ajax({
    url: 'https://api.rawg.io/api/games/' + randNum,
    method: 'GET'
  }).then(function(response) {
    // console.log('then');
    // console.log(response);
    console.log(response.background_image === null);
    if (response) {
      randomGameCount++;
      let elID = '#game-thumb-' + gameImageDisplayIndex;
      if (response.background_image === null) {
        // Display a placeholder image
      } else {
        $(elID).attr('src', response.background_image);
      }
      
      gameImageDisplayIndex++;
    }
    if (randomGameCount < 3) {
      threeRandomGames();
    }
  }).fail(function(response) {
    // console.log('fail');
    // console.log(response);
    if (randomGameCount < 3) {
      threeRandomGames();
    }
  });
}