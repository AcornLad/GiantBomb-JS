//Wait for page to load before deploying javascript
$(document).ready(function(){
  //Get today's date
  var date_today = new Date();
  var mm = date_today.getMonth()+1; //January is 0
  var dd = date_today.getDate();
  var yyyy = date_today.getFullYear();
  if(dd<10){
    dd='0'+dd;
  }
  if(mm<10){
    mm='0'+mm;
  }
  var dateString ="original_release_date:" + yyyy + "-" + mm + "-" + dd + " 00:00:00";

  //Display today's date
  var dateDiv = $("<div class='selectedDate'></div>");
  dateDiv.append('<h4>Games originally released on' + " " + mm + "/" + dd + "</h4>");
  $('#gamesList').append(dateDiv);

  //Initialize, show games from today
  var i = 1990;
  while(i <= yyyy){
    dateString = "original_release_date:" + i + "-" + mm + "-" + dd + " 00:00:00";
    GetGames(dateString,i);
    i++;
}


  //Update games list whenever date change is pushed
  $('#dateButton').click(function(){
    var $gamesList = $('#gamesList');
    $gamesList.empty();
    var mm = $('select[name=month]').val();
    var dd = $('select[name=day]').val();
    var yyyy = date_today.getFullYear();

    var dateDiv = $("<div class='selectedDate'></div>");
    dateDiv.append('<h4>Games originally released on' + " " + mm + "/" + dd + "</h4>");
    $('#gamesList').append(dateDiv);

    var i = 1990;
    var dateString;

    while(i <= yyyy){
      dateString = "original_release_date:" + i + "-" + mm + "-" + dd + " 00:00:00";
      GetGames(dateString,i);
      i++;
    }

  });


});


function GetGames(inputdate,yyyy){
  var div = $("<div class='gamesOutput'></div>")
  var $gamesList = $('#gamesList');


  $.ajax({
    url: 'http://www.giantbomb.com/api/games/',
    type: 'GET',
    dataType: 'jsonp',
    jsonp: 'json_callback',
    data:{
      api_key: '/*Your API key here*/',
      filter: inputdate,
      field_list: 'name,site_detail_url',
      format: 'jsonp'
    },
    success: function(data){
      if(data.number_of_total_results != 0){
        div.append("<br><h5>" + yyyy + "</h5><br>");
        $.each(data.results, function(i, gamereturn){
          if(gamereturn.name != null){
            div.append("<a href=\"" + gamereturn.site_detail_url + "\">" + gamereturn.name + "</a><br>");
          }
        })
      }
      console.log('success',data);
    }
  });
  $gamesList.append(div);
}