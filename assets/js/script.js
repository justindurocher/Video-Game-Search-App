// get 3 random games
for (let i = 0; i < 3; i++) {
  let num = Math.floor(Math.random() * 354144);
  console.log(num);
  queryRawg(num, i + 1);
}

function queryRawg(gameID, index) {
  $.ajax({
    url: 'https://api.rawg.io/api/games/' + gameID,
    method: 'GET'
  }).then(function(response) {
    console.log(response);
    let elID = '#game-thumb-' + index;
    console.log(elID);
    $(elID).attr('src', response.background_image);
  });
}
//////////
//Ab
////////////


// var searchFromIndexPage = $(".search.link.icon").val();
// var searchIconFromIndexPage = $("#searchIcon");
var searchFromDisplayPage = $(".search.link.icon").val();
var seacrIconFromDisplayPage = $(".search.link");

// searchIconFromIndexPage.on("click", function(event)
// {
//     event.preventDefault();
//     console.log("calling from Index")
//     getInput(searchFromIndexPage);
// });
seacrIconFromDisplayPage.on("click", function(event)
{
    event.preventDefault();
    console.log("calling from Display");
    console.log(seacrIconFromDisplayPage);
    getInput (searchFromDisplayPage);
});

function getInput(userInput){
  
  console.log("user search " + userInput);
  //$(".searchData").text(yourSearch);
  uSearch(userInput);
}
// var yourSeach = $(".ui.transparent.icon.input").text();
// console.log("user search " + yourSeach);
// $(".ui.transparent.icon.input")
//   .search({
//     type: "Title",
//     source: response
//   });

  var queryURL = "https://api.rawg.io/api/games?page_size=5&search=";

  function uSearch(title) {
    $.ajax({
      url: queryURL + title,
      method: 'GET'
    }).then(function(response) {
      console.log(response);
      var result = response.description;
      console.log($(result));
      
    });
  
}


