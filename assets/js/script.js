//run once DOM is ready
$(document).ready(function() {
  // Variables
  var searchForm = $('#search-form');
  var cityInput = $('#enterCity');
  var searchHistory = $('#searchHistory');
  var forecast = $('#forecast');
  // Variable for Weather API key
  var apiKey = 'c1a28dcc507b67ad38b18eedc543dd6e';

  // Event listener for form submission
  searchForm.on('submit', function(e) {
    e.preventDefault();
    var city = cityInput.val().trim();
    if (city) {
      weatherInfo(city);
      cityInput.val('');
    }
  });

  function weatherInfo(city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + apiKey;
    
    // Retrieve city info using city name
    fetch(apiUrl)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Error Response: ' + response.status);
        }
        return response.json();
      })
      .then(function(data) {
        // Add fetched data to placeholders in the HTML
        $('#city-name').text(data.name);
        $('#date').text('Date: ' + new Date(data.dt * 1000).toLocaleDateString());
        $('#temperature').text('Temperature: ' + data.main.temp + '°F');
        $('#humidity').text('Humidity: ' + data.main.humidity + '%');
        $('#wind-speed').text('Wind Speed: ' + data.wind.speed + ' m/s');
        $('#weather-icon').attr('src', 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png').attr('alt', data.weather[0].description);
      })
      .catch(function(error) {
        console.error('Problem with the fetch operation:', error);
      });

    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=' + apiKey;

    // Fetch 5-day forecast data
    fetch(forecastUrl)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Error Response: ' + response.status);
        }
        return response.json();
      })
      .then(function(forecastData) {
        forecast.empty();
        forecastData.list.forEach(function(day, i) {
          if (i % 8 === 0) {
            forecast.append(
              '<div class="forecast-item">' +
              '<p>Date: ' + new Date(day.dt * 1000).toLocaleDateString() + '</p>' +
              '<p>Temperature: ' + day.main.temp + '°F</p>' +
              '<p>Humidity: ' + day.main.humidity + '%</p>' +
              '<p>Wind Speed: ' + day.wind.speed + ' m/s</p>' +
              '<img src="https://openweathermap.org/img/w/' + day.weather[0].icon + '.png" alt="' + day.weather[0].description + '">' +
              '</div>'
            );
          }
        });
      });

    addToSearchHistory(city);
  }

  function addToSearchHistory(city) {
    var historyItem = $('<div class="history-item"></div>').text(city);
    historyItem.on('click', function() {
      weatherInfo($(this).text());
    });
    searchHistory.append(historyItem);
  }
});

//once pulled from the api, append this data to the forecast
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

//make event listener for submit button on search form