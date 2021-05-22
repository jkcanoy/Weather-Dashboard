// grab variables from HTML
var apiKeyEl = "&appid=86b0bc104251dc9755ed60f815cfdd2d";

var cityEl = document.getElementById("current-city");
var tempEl = document.getElementById("temperature");
var humEl = document.getElementById("humidity");
var windEl = document.getElementById("wind-speed");
var uviEl = document.getElementById("UVI");
var forecastCards = document.getElementById("forecast");

var searchBtnEl = document.getElementById("search-button");
var searchEl = document.getElementById("city-search");

// search button event listener
searchBtnEl.addEventListener("click", function (event) {
  event.preventDefault();
  getWeather(searchEl);
  // save to local storage
  var cityInput = searchEl.value.trim();
  var storeArr = [];
  storeArr.push(cityInput);
  localStorage.setItem("cityName:", JSON.stringify(storeArr));

  cityHistory();
});

// get items from local storage
function cityHistory() {
  var lastCity = JSON.parse(localStorage.getItem("cityName:"));
  var historyDiv = $(
    '<button type="button" class="btn btn-outline-primary"></button>'
  ).text(lastCity);
  var olderSearch = $("#searchHistory");
  olderSearch.append(historyDiv);
  // $("#searchHistory").prepend(olderSearch)
}
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
      tempEl.innerHTML = currentData.main.temp + "°F";
      humEl.innerHTML = currentData.main.humidity + "%";
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
          var forecastResults = forecastData.list;
          // append 5 day forecast to HTML
          $("#forecast").html("");
          
          for (var i = 0; i < forecastResults.length; i += 8) {
            var forecastDiv = $(
              '<div class="card text-white bg-primary m-auto" style="width:8rem; height: 10rem;">'
            );

            var dateData = forecastResults[i].dt_txt;
            var formatDate = dateData.substr(0, 10);
            var tempData = forecastResults[i].main.temp;
            var humData = forecastResults[i].main.humidity;

            var foreDate = $('<h5 class="card-title">').text(formatDate);
            var foreTemp = $('<p class="card-text">').text(
              "Temp: " + tempData + "°F"
            );
            var foreHum = $('<p class="card-text">').text(
              "Hum: " + humData + "%"
            );

            // append items
            forecastDiv.append(foreDate);
            forecastDiv.append(foreTemp);
            forecastDiv.append(foreHum);
            $("#forecast").append(forecastDiv);
          }
        });
    });
}
