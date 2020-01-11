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
