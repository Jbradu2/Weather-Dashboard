//get handle on variables for each section of html by id (getelementbyID)
//jquery??
$(document).ready(function () {
var searchForm = $('#search-form');
var cityInput = $('#enterCity');
var searchHistory = $('#searchHistory');
var forecast = $('#forecast');
//variable for Weather APi key
var apiKey = 'c1a28dcc507b67ad38b18eedc543dd6e';
var cities =[];

function WeatherInfo (city) {
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon="  + lon + "&appid=" + apiKey + '&units=imperial&appid';
;
//code to fetch key

//add fetched data to placeholders in the html
fetch(apiUrl)
    .then(function (response) {
      if (!response.ok) {
        responseText.textContent = "Errorr Response: " + response.status;
      }
      return response.json();
    })
    .then(function (data) {
      $('#city-name').text(data.name);
      $('#date').text('Date: ' + new Date(data.dt * 1000).toLocaleDateString());
      $('#temperature').text('Temperature: ' + data.main.temp + '°C');
      $('#humidity').text('Humidity: ' + data.main.humidity + '%');
      $('#wind-speed').text('Wind Speed: ' + data.wind.speed + ' m/s');
      $('#weather-icon').attr('src', 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png').attr('alt', data.weather[0].description);
    })
    .catch(function (error) {
      console.error('Problem with the fetch operation:', error);
    });

var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=' + apiKey;

   // Fetch 5-day forecast data
fetch(forecastUrl)
  .then(function (response) {
    if (!response.ok) {
      responseText.textContent = "Errorr Response: " + response.status;
    } return response.json();
  })
  .then(function (forecastData) {
    forecast.empty();
    forecastData.list.forEach(function (day, i) { if (i % 8 === 0) {
        forecast.append(
                    '<div class="forecast-item">' +
                    '<p>Date: ' + new Date(day.dt * 1000).toLocaleDateString() + '</p>' +
                    '<p>Temperature: ' + day.main.temp + '</p>' +
                    '<p>Humidity: ' + day.main.humidity + '</p>' +
                    '<p>Wind Speed: ' + day.wind.speed + '</p>' +
                    '<img src="https://openweathermap.org/img/w/' + day.weather[0].icon + '.png" alt="' + day.weather[0].description + '">' +'</div>'
                );
            }
        });
    });
    
// function(){

addToSearchHistory(city);
}
// };
// WHEN I search for a city
// GIVEN a weather dashboard with form inputs
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city

  // Event listener for form submission
  searchForm.on('submit', function (e) {
    e.preventDefault();
    var city = cityInput.val().trim();
    if (city) {
        WeatherInfo(city);
        cityInput.val('');
    }
});




function addToSearchHistory(city) {
  var historyItem = $('<div class="history-item"></div>').text(city);
  historyItem.on('click', function () {
      WeatherInfo(city);
  });
  searchHistory.append(historyItem);
}
});
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
//once pulled from the api, append this data to the forecast
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

//make event listener for submit button on search form