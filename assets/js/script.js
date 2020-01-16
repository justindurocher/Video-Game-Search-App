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

///////////////////////// Articles function/////////////
let totalArticles;
let articleDisplayIndex = 1;
$.ajax({
  articleUrl:'https://newsapi.org/v2/everything' + 'from=2020-01-13&' +'sortBy=popularity&' +'apiKey=5b70edca1d034d86b9a94213f1344c61',
  method:"GET"
}).then(function(response) {
  totalArticles = response.count;
  console.log(totalArticles);
  console.log(articleUrl)
  console.log(response.image === randomGameCount);
});

$.ajax({
  articleUrl:'https://newsapi.org/v2/everything?'  + 'from=2020-01-13&' +'sortBy=popularity&' +'apiKey=5b70edca1d034d86b9a94213f1344c61',
  method:"GET"
}).then(function(response) {
var img = $('#image-header').attr({
  'src': "https//newsapi.org/v2/sources?" + response.article.urlToImage + 'png',
  'alt': response.article.urlToImage
})
if( response) { 
  articleCount ++;
  let ID = '#image-header-' + articleDisplayIndex;
  if (image === randomGameCount) {
    ///Display placeholder image////
  } else{
    $(ID).attr('src', response.data.artciles.urlToImage);
  }
  articleDisplayIndex++;
}})
  ///////////////// Grab the images for the articles////////////












}).fail(function(response) {
// console.log('fail');
// console.log(response);
if (randomGameCount < 3) {
  threeRandomGames();
}
});
}
//////////
//AbNews API: 7489c782bcde4db08a083da4b92cd2ef
////////////


var searchIcon = $(".searchIcon");
$(".searchIcon").load("/searchItems.html .searchData")
searchIcon.on("click", function(event)
{
    event.preventDefault();
    var userInput = $(".searchInput").val();
    uSearch(userInput);
    $(".searchIcon").load("/searchItems.html .searchData");
});

  var queryURL = "https://api.rawg.io/api/games?page_size=5&search=";

  function uSearch(title) {
    $.ajax({
      url: queryURL + title,
      method: 'GET'
    }).then(function(response) { 
      if (response.count > 1)
      {
        var cardDeck = $("<div>");
        for (var i = 0; i < response.results.length; i++)
        {
          console.log(response.results[i]);
          console.log(response.results[i].id);
          console.log(response.results[i].background_image);
          var myImage = $("<img>");
          var gameTitle = $("<h2>");
          // gameTitle.text((response.results[i].name));
          //$(".searchData").append(gameTitle);
          myImage.attr("src", response.results[i].background_image);
          //$(".searchData").append(myImage);
///Cards statr here.
          
          var aCard = $("<div>");
          var cardImage = $("<img>");
          var cardBody = $("<div>");
          var cardTitle = $("<h5>");
          var cardText = $("<p>");
          var cardFooter = $("<div>");
          var cardFooterText = $("<a>");
          cardDeck.addClass("card-deck");
          aCard.addClass("card");
          cardImage.attr("src", response.results[i].background_image);
          cardImage.addClass("card-img-top");
          cardBody.addClass("card-body");
          cardTitle.addClass("card-title");
          cardText.addClass("card-text");
          cardFooter.addClass("card-footer");
          cardFooterText.addClass("card-link" );
          cardFooterText.attr("href", "#");
          cardFooterText.text("News Articles on this game");
          cardTitle.text(response.results[i].name);
          cardText.text(response.results[i].released)
          cardBody.append(cardTitle, cardText);
          cardFooter.append(cardFooterText);
          aCard.append(cardImage, cardBody, cardFooter);
          cardDeck.append(aCard);
          $(".searchData").append(cardDeck);
          //$(".searchData").append($("<br>"));
          //https://newsapi.org/v2/everything?q=mario&apiKey=7489c782bcde4db08a083da4b92cd2ef
          ////News API start here
          var searchArticle = "https://newsapi.org/v2/everything?q=" + response.results[i].name + "&apiKey=7489c782bcde4db08a083da4b92cd2ef";

            $.ajax({
              url: searchArticle,
              method: 'GET'
            }).then(function(response){
              console.log(response);
            });
          
        }
      }

      else
      console.log(response.id);

    });
  
}


///////variable to the total number of articles/////

// let totalArticles;

// ///////variable increment if th erandom article was successful/////
// let articleDisplayIndex = 1;


// ////query to get the total number of articles/////
// $.ajax({
//   url:"https://newsapi.org/v2/everything?apiKey=5b70edca1d034d86b9a94213f1344c61" + image,
//   method:"GET"
// }).then(function(response) {
//   totalArticles = response.count;
//   console.log(totalArticles);
//   console.log(response.image === null);
//   var image = data.articles.urlToImage;
// });

// $.ajax({
//   url:"https://newsapi.org/v2/everything?apiKey=5b70edca1d034d86b9a94213f1344c61" + image ,
//   method:"GET"
// }).then(function(response) {
// var image = data.articles.urlToImage;
// if( response) {
//   articleCount ++;
//   let ID = "image header" + articleDisplayIndex;
//   if (image === null) {
//     ///Display placeholder image////
//   } else{
//     $(ID).attr('src', response.image);
//   }
//   articleDisplayIndex++;
// }})
