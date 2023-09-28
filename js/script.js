//get handle on variables for each section of html by id (getelementbyID)

var searchForm = document.getElementById('search-form');
var cityInput = document.getElementById('enterCity');
var currentWeather = document.getElementById('currentWeather');
var searchHistory = document.getElementById('searchHistory');
var forecast = document.getElementById('forecast');
//variable for Weather APi key
var apiKey = 'c1a28dcc507b67ad38b18eedc543dd6e'
// var apiurl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=apiKey
//code to fetch key
// fetch(apiUrl)
// .then(function(response) {
//     return response.json();
// }

function(){

};
// WHEN I search for a city
// GIVEN a weather dashboard with form inputs
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city