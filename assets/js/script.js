// variable to hold the total number of games from RAWG
let totalGames;
// variable to increment if the random game query was successful
let randomGameCount = 0;

// query RAWG to get total number of games
$.ajax({
  url: 'https://api.rawg.io/api/games',
  method: 'GET'
}).then(function(response) {
  totalGames = response.count;
  prepDisplay();
  // show the necessary <div>s and 
  $('#game-search-results').removeClass('d-none');
  $('#total-games').removeClass('d-none');
  $('#total-games').text('The RAWG database currently contains ' + response.count + ' games. Here are 5 at random:')
  getRandomGames();
});

// this function clears and hides the content <div>s
// so that information doesn't stack
function prepDisplay() {
  $('#game-search-results').addClass('d-none');
  $('#game-cards').empty();

  // $('#total-games').empty();
  // $('#total-games').addClass('d-none');
  
  $('#main-game-display').addClass('d-none');
  $('#main-game-display').empty();
  
  $('#game-news-container').addClass('d-none');
  $('#game-news').empty();
}

// get 5 random games
function getRandomGames() {
  let randNum = Math.floor(Math.random() * totalGames);

  $.ajax({
    url: 'https://api.rawg.io/api/games/' + randNum,
    method: 'GET'
  }).then(function(response) {
    populateGameSearchCards(response);
    randomGameCount++;
    
    // call function until 5 successful responses
    if (randomGameCount < 5) {
      getRandomGames();
    }

  // if response is 404, then don't increment counter
  }).fail(function() {
    getRandomGames();
  });
}

// write HTML to <div id="game-cards">
// using Semantic UI classes
// this is called when the page is loaded
// and when the user searches
function populateGameSearchCards(response) {
  let newCard = $('<div class="card">');
  $(newCard).attr('id', response.id);

  let cardImg = $('<div class="image">');
  if (response.background_image === null) {
    // Display a placeholder image
  } else {
    $(cardImg).append('<img src="' + response.background_image + '">');
  }
  newCard.append(cardImg);

  let cardContent = $('<div class="content">');
  let cardHeader = $('<div class="header">').text(response.name);
  cardContent.append(cardHeader);

  let description = $('<div class="description">');

  let releaseDate = $('<p>').text('Release Date: ' + response.released);
  description.append(releaseDate);

  let rawgID = $('<p>').text('RAWG ID: ' + response.id);
  description.append(rawgID);

  cardContent.append(description);
  newCard.append(cardContent);

  $('#game-cards').append(newCard);
}

// user search event handler
var searchIcon = $("#search-button");
searchIcon.on("click", function(event)
{
    event.preventDefault();
    prepDisplay();
    $('#game-search-results').removeClass('d-none');
    var userInput = $(".searchInput").val();
    uSearch(userInput);
});

// function is called when user searches
function uSearch(title) {
  $.ajax({
    url: "https://api.rawg.io/api/games?page_size=5&search=" + title,
    method: 'GET'
  }).then(function(response) {
    for (var i = 0; i < response.results.length; i++)
    {
      populateGameSearchCards(response.results[i]);
    }
  });
}

// event handler when the user clicks on a game card
$('#game-search-results').on('click', '.card', function() {
  prepDisplay();
  $('#main-game-display').removeClass('d-none');
  $('#game-news-container').removeClass('d-none');
  // call the function to query RAWG API via game ID
  querySpecificGame($(this).attr('id'));
  // call the function to search for news related to the game title
  queryGameNews($(this).find('.header').text());
});

// query RAWG about a specific game ID
function querySpecificGame(rawgGameID){
  $.ajax({
    url: 'https://api.rawg.io/api/games/' + rawgGameID,
    method: 'GET'
  }).then(function(response) {
    // populate the cards by writing HTML
    // and by using Semantic UI classes
    let newCard = $('<div class="ui card fluid">');
    let cardImg = $('<div class="image">');
    if (response.background_image === null) {
      // Display a placeholder image
    } else {
      $(cardImg).append('<img src="' + response.background_image + '">');
    }
    newCard.append(cardImg);
    
    let cardContent = $('<div class="content">');
    let cardHeader = $('<div class="header">').text(response.name);
    cardContent.append(cardHeader);

    let cardDescription = $('<div class="description">');
    let releaseDate = $('<p>').text('Release Date: ' + response.released);
    let gameDescription = $('<p>').text(response.description_raw);

    cardDescription.append(releaseDate, gameDescription);
    cardContent.append(cardDescription);
    newCard.append(cardContent);
    $('#main-game-display').append(newCard);
  });
}

// query NewsAPI for articles with the title of the game
function queryGameNews(gameName) {
  $.ajax({
    url: 'https://newsapi.org/v2/everything?q=' + gameName + '&apiKey=7489c782bcde4db08a083da4b92cd2ef',
    method: 'GET'
  }).then(function(response) {
    $('#news-header').text('Here are ' + response.articles.length + ' news articles related to ' + gameName);

    if (response.articles.length > 0) {
      // loop through the number of articles that are given in the response array
      for (let i = 0; i < response.articles.length; i++) {

        // populate the news search results by
        // using Semantic UI items
        let newItem = $('<div class="item">');
        let itemImage = $('<div class="image">');
        $(itemImage).append('<img src="' + response.articles[i].urlToImage + '">');
        newItem.append(itemImage);

        let itemContent = $('<div class="content">');
        let itemHeader = $('<div class="header">').text(response.articles[i].title);
        itemContent.append(itemHeader);

        let description = $('<div class="description">');
        $(description).append($('<p>').text('Published by ' + response.articles[i].source.name + ' at ' + response.articles[i].publishedAt));
        $(description).append($('<p>').text(response.articles[i].description))
        itemContent.append(description);

        let extra = $('<div class="extra">');
        $(extra).append($('<a class="ui right floated primary button" target="_blank" href="' + response.articles[i].url + '">').text('View Article'));
        itemContent.append(extra);
        newItem.append(itemContent);
        $('#game-news').append(newItem);
      }
    } else {
      // no articles found on this game
    }
  });
};