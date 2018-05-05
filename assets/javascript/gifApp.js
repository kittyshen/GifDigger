/* 
# Gif digger
Pseudocode
Step1 select some game as topic subject and build an array for the game name.
Step2 render the buttons on the html with the game name fill in the text field of the buttons
Step3 formated a url accroding to giphy documentation, using the game name as variable.
Step4 call ajax link based on the url
Step5 inside the ajax call, process through those returned 10 objects
Step6 grab the img's url for still img and animated gif, the rating of the img and the title of the img maybe
Step7 render the html with a "for" loop, and render each frame of the gif object returned.
Step8 be sure to clear the html before ppl click another button
Step9 build a form in the html using bootstrap form
Step10 capture the form input value from the user input, push the value of string to the gameName[], and append another button to the button session of the page
Step11 when user click their own button,start ajax call according to user's input button
*/

var gameArray = ["Beyond Two Souls", "Dark Souls 2", "Heavy Rain", "Mass Effect 3", "Destiny 2"];

//render all the bottons according to the game array data
var buttonHooker = $("#buttonGroup");  // create a variable to hook all buttons ad future user input append

function renderButtons(arr){             // create a function to render current game array as  buttons
    for (var i = 0; i <arr.length; i++){
        var newButton = $("<button>");
        newButton.text(arr[i]);
        newButton.attr("class","buttons text-center badge badge-pill badge-secondary");
        newButton.attr("value",arr[i]);
        buttonHooker.append(newButton);
    }
}
renderButtons(gameArray);   //render game array button to html page

function renderUserButton(string){       // create a function to render user input as button
    var newButton = $("<button>");
    newButton.text(string);
    newButton.attr("class","buttons text-center badge badge-pill badge-secondary");
    newButton.attr("value",string);
    buttonHooker.append(newButton);
}
// renderUserButton("New game");  // testing 

function renderImg(obj){
    $("#gifContainer").html("");
    for(var i =0; i<obj.data.length; i++ ){
        console.log(obj.data[i].images.original_still.url);
        var newDiv =$("<div>").attr("class","imgWrap jumbotron col-md-3 col-sm-4 col-xs-6");
        var newImg = $("<img>").attr("src", obj.data[i].images.original_still.url);
        newImg.attr("class","images");
        newImg.attr("data-still",obj.data[i].images.original.url);
        newImg.attr("data-animate",obj.data[i].images.original_still.url);
        newImg.attr("data-state","still");
        var newP = $("<p>").text(obj.data[i].title);
        newP.attr("class","text-center");
        newP.append("<br> Rating: "+obj.data[i].rating);
        newDiv.append(newImg,newP);
        $("#gifContainer").append(newDiv);
    } 
}

//define a variable to capture user click and store button's value into the var
var currentQueryVar;
$(".buttons").on("click", function(){
    currentQueryVar = $(this).val();
    console.log(currentQueryVar);
    var currentURL = "https://api.giphy.com/v1/gifs/search?q=" + currentQueryVar + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url:currentURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
    
        renderImg(response);
    });


});

// render first page with some content
var defaultURL = "https://api.giphy.com/v1/gifs/search?q=" + gameArray[0] + "&api_key=dc6zaTOxFJmzC&limit=10"
$.ajax({
    url:defaultURL,
    method: "GET"
}).then(function(response){
    renderImg(response);
});



// var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

// // displayMovieInfo function re-renders the HTML to display the appropriate content
// function displayMovieInfo() {

//   var movie = $(this).attr("data-name");
//   var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

//   // Creates AJAX call for the specific movie button being clicked
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {
//     // Creates a div to hold the movie
//     var movieDisplay = $("<div>");
//       movieDisplay.attr("id","movieDisplay");
//     // movieDisplay.text("fdsjhfks");
    
//     // Retrieves the Rating Data
//     console.log(response);

//     // Creates an element to have the rating displayed
//     var newRating = $("<p>");
//     newRating.text("Rating: "+response.Rated);
//     movieDisplay.append(newRating);
//     var newYear = $("<p>");
//     newYear.text("Year: "+response.Year);
//     movieDisplay.append(newYear);
//     var newPlot = $("<p>");
//     newPlot.text("Plot: "+response.Plot);
//     movieDisplay.append(newPlot);
//     var newImg = $("<img>");
//     newImg.attr("src",response.Poster);
//     // newImg.attr("src","https://ia.media-imdb.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg");
//     movieDisplay.append(newImg);

//     // $("h1").append(movieDisplay);
//     $("#movieDisplay").empty();
//     $("#buttons-view").prepend(movieDisplay);
//   });

// }

// // Function for displaying movie data
// function renderButtons() {

//   // Deletes the movies prior to adding new movies
//   // (this is necessary otherwise you will have repeat buttons)
//   $("#buttons-view").html("");
//   // Loops through the array of movies
//   for (var i = 0; i < movies.length; i++) {

//     // Then dynamicaly generates buttons for each movie in the array
//     // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
//     var a = $("<button>");
//     // Adds a class of movie to our button
//     a.addClass("movie");
//     // Added a data-attribute
//     a.attr("data-name", movies[i]);
//     // Provided the initial button text
//     a.text(movies[i]);
//     // Added the button to the buttons-view div
//     $("#buttons-view").append(a);
//   }
// }

// // This function handles events where the add movie button is clicked
// $("#add-movie").on("click", function(event) {
//   event.preventDefault();
//   // This line of code will grab the input from the textbox
//   var movie = $("#movie-input").val().trim();

//   // The movie from the textbox is then added to our array
//   movies.push(movie);

//   // Calling renderButtons which handles the processing of our movie array
//   renderButtons();
// });

// // Adding click event listeners to all elements with a class of "movie"
// $(document).on("click", ".movie", displayMovieInfo);

// // Calling the renderButtons function to display the intial buttons
// renderButtons();