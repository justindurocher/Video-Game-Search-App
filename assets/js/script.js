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
  console.log(totalGames);
  prepDisplay();
  $('#game-search-results').removeClass('vis-hidden');
  getRandomGames();
});

function prepDisplay() {
  $('#game-search-results').addClass('vis-hidden');
  $('#game-cards').empty();
  
  $('#main-game-display').addClass('vis-hidden');
  $('#main-game-display').empty();
  
  $('#game-news-container').addClass('vis-hidden');
  $('#game-news').empty();
}

// get 5 random games
function getRandomGames() {
  let randNum = Math.floor(Math.random() * totalGames);

  $.ajax({
    url: 'https://api.rawg.io/api/games/' + randNum,
    method: 'GET'
  }).then(function(response) {
    console.log(response)
    populateGameSearchCards(response);
    randomGameCount++;
    
    // call function until 5 successful responses
    if (randomGameCount < 5) {
      getRandomGames();
    }
  }).fail(function() {
    getRandomGames();
  });
}

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

// articleUrl:'https://newsapi.org/v2/everything?from=2020-01-13&sortBy=popularity&apiKey=5b70edca1d034d86b9a94213f1344c61',

var searchIcon = $("#search-button");
searchIcon.on("click", function(event)
{
    event.preventDefault();
    prepDisplay();
    $('#game-search-results').removeClass('vis-hidden');
    var userInput = $(".searchInput").val();
    uSearch(userInput);
});

function uSearch(title) {
  $.ajax({
    url: "https://api.rawg.io/api/games?page_size=5&search=" + title,
    method: 'GET'
  }).then(function(response) {
    // console.log(response);
    for (var i = 0; i < response.results.length; i++)
    {
      populateGameSearchCards(response.results[i]);
    }
  });
}

$('#game-search-results').on('click', '.card', function() {
  // console.log($(this).find('.header').text());
  // console.log($(this).attr('id'));
  prepDisplay();
  $('#main-game-display').removeClass('vis-hidden');
  $('#game-news-container').removeClass('vis-hidden');
  querySpecificGame($(this).attr('id'));
  queryGameNews($(this).find('.header').text());
});

function querySpecificGame(rawgGameID){
  $.ajax({
    url: 'https://api.rawg.io/api/games/' + rawgGameID,
    method: 'GET'
  }).then(function(response) {
    console.log(response);
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

function queryGameNews(gameName) {
  $.ajax({
    url: 'https://newsapi.org/v2/everything?q=' + gameName + '&apiKey=7489c782bcde4db08a083da4b92cd2ef',
    method: 'GET'
  }).then(function(response) {
    console.log(response);
    console.log(response.articles.length);
    if (response.articles.length > 0) {
      for (let i = 0; i < response.articles.length; i++) {
        console.log(i);
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