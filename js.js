$(document).ready(function() {

var sports = [];

  
 	function displaySports() {

	var sports = $(this).data("search");
	console.log(sports);

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sports + "&api_key=3c9JI6NJcYkF4rX1CeE3YMsoos7mnVet";

	console.log(queryURL);

	$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	var results = response.data;
        	console.log(results);
        	for (var i = 0; i < results.length; i++) {
        	
        	var sportsDiv = $("<div class='col-md-4'>");

        	var rating = results[i].rating;
        	var defaultAnimatedSrc = results[i].images.fixed_height.url;
        	var staticSrc = results[i].images.fixed_height_still.url;
        	var sportsImage = $("<img>");
        	var p = $("<p>").text("Rating: " + rating);

        	sportsImage.attr("src", staticSrc);
        	sportsImage.addClass("sportsGiphy");
        	sportsImage.attr("data-state", "still");
        	sportsImage.attr("data-still", staticSrc);
        	sportsImage.attr("data-animate", defaultAnimatedSrc);
        	sportsDiv.append(p);
        	sportsDiv.append(sportsImage);
        	$("#added-gifs").prepend(sportsDiv);

        }
	});
}

	$("#addSport").on("click", function(event) {
        event.preventDefault();
        var newSport = $("#sportInput").val().trim();
        sports.push(newSport);
        console.log(sports);
        $("#sportInput").val('');
        displayButtons();
      });

	function displayButtons() {
    $("#myButtons").empty();
    for (var i = 0; i < sports.length; i++) {
      var a = $('<button class="btn btn-primary">');
      a.attr("id", "sport");
      a.attr("data-search", sports[i]);
      a.text(sports[i]);
      $("#myButtons").append(a);
    }
  }

  displayButtons();

  $(document).on("click", "#sport", displaySports);

  $(document).on("click", ".sportsGiphy", pausePlayGifs);

  function pausePlayGifs() {
  	 var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }
}

});