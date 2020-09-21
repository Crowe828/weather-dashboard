// User can search for weather reports by city using the openweathermap API.
// After searching for a city, the following information is displayed: current temperature, current humidity, windspeed, uv index, and 5 day forecast.
// Application uses icons to represent weather conditions.
// Application stores previously searched for cities in local storage and displays them to the user.
// Application loads last searched city forecast on page load.
// OWM API display images
// Prob build a URL with the API

// Personal API key
var APIKey = "e10987ffef94fe88a10c5d54823a1d23";

// When search button is clicked, the weather is displayed for the searched for city
$(document).ready(function () {
  $("#weather-btn").on("click", function (event) {
    event.preventDefault();
    var cityInput = $("#weather-input").val().trim();
    console.log(cityInput);
    currentWeather(cityInput);
  });

  //   Grabs the city name, current temp, humidity, wind speed/degree, and UV index
  function currentWeather(city) {
    //   URL for the Current Weather API
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      APIKey;

    // Gets all of the info save for the UV Index provided by the Current Weather API
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (weather) {
      console.log(this.url);
      console.log(weather);

      // City name
      console.log(weather.name);
      var cityName = document.querySelector(".city");
      cityName.textContent = weather.name;

      // Temperature
      var F = weather.main.temp.toFixed(1);
      console.log(F);
      var tempToday = document.querySelector(".temp");
      tempToday.textContent = "Today's temp: " + F;

      // Humidity
      var hum = weather.main.humidity;
      console.log(hum);
      var humToday = document.querySelector(".humidity");
      humToday.textContent = "Humidity: " + hum;

      // Wind
      console.log(weather.wind);
      var windSpeed = weather.wind.speed.toFixed(1);
      var windDeg = weather.wind.deg;
      var windCurrent = document.querySelector(".wind");
      windCurrent.textContent =
        "Wind speed: " + windSpeed + " Wind Degree: " + windDeg;

      // Lat/Lon for UV Index
      var uvLat = weather.coord.lat;
      console.log(uvLat);
      var uvLon = weather.coord.lon;
      console.log(uvLon);

      // URL for the UV index API
      var uvURL =
        "https://api.openweathermap.org/data/2.5/uvi?appid=" +
        APIKey +
        "&lat=" +
        uvLat +
        "&lon=" +
        uvLon;

      // Grabs info from UV Index API
      $.ajax({
        url: uvURL,
        method: "GET",
      }).then(function (uv) {
        console.log(this.url);
        console.log(uv);
        var uv = uv.value.toFixed(1);
        console.log(uv);
        var uvIndex = document.querySelector(".uvIndex");
        uvIndex.textContent = "Today's UV Index is: " + uv;
      });
    });
  }
});
