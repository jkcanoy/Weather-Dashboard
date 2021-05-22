// grab variables from HTML
var apiKeyEl = "&appid=86b0bc104251dc9755ed60f815cfdd2d";

var cityEl = document.getElementById("current-city");
var tempEl = document.getElementById("temperature");
var humEl = document.getElementById("humidity");
var windEl = document.getElementById("wind-speed");
var uviEl = document.getElementById("UVI");

var searchBtnEl = document.getElementById("search-button");
var searchEl = document.getElementById("city-search");

// search button event listener
searchBtnEl.addEventListener("click", function (event) {
  event.preventDefault();
  getWeather(searchEl);
  console.log(searchEl.value);
});
// Current weather data function
function getWeather(searchEl) {
  var currentURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchEl.value +
    apiKeyEl +
    "&units=imperial";
  // fetch current weather data
  fetch(currentURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (currentData) {
      console.log(currentData);
      var currentDate = moment().format("L");
      // append currentData to html
      cityEl.innerHTML = currentData.name + " " + currentDate;
      tempEl.innerHTML = currentData.main.temp;
      humEl.innerHTML = currentData.main.humidity;
      windEl.innerHTML = currentData.wind.speed;
      // fetch UVI
      var uviURL =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        currentData.coord.lat +
        "&lon=" +
        currentData.coord.lon +
        apiKeyEl;
      fetch(uviURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (uviData) {
          console.log(uviData);

          // append uvi
          uviEl.innerHTML = uviData.current.uvi;
          // uvi colors
          // var uviBadge = document.getElementsByClassName("badge")
          //     if (data.current.uvi.value = 0 && data.current.uvi.value < 3){
          //         uviBadge.className += " badge-success"
          //     }
        });

      // 5day forecast fetch
      var forecastURL =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        searchEl.value +
        apiKeyEl +
        "&units=imperial";
      fetch(forecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (forecastData) {
            console.log(forecastData);
            var forecastResults = response.list
        // append 5 day forecast to HTML
            for (var i = 0; i < forecastResults.length; i += 8)

        })
    });
}
