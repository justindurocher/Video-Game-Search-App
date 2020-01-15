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


// search button (Searches for 5)

