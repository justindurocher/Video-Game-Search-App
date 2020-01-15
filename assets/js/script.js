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
