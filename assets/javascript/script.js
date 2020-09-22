// User can search for weather reports by city using the openweathermap API.
// After searching for a city, the following information is displayed: current temperature, current humidity, windspeed, uv index, and 5 day forecast.
// Application uses icons to represent weather conditions.
// Application stores previously searched for cities in local storage and displays them to the user.
// Application loads last searched city forecast on page load.
// OWM API display images
// Prob build a URL with the API

// Personal API key

// Integrating moment.js to use their date features
console.log(moment().format("l"));
// Personal API Key
var APIKey = "e10987ffef94fe88a10c5d54823a1d23";

// When search button is clicked, the weather is displayed for the searched for city
$(document).ready(function () {
  $("#weather-btn").on("click", function (event) {
    event.preventDefault();
    var cityInput = $("#weather-input").val().trim();
    console.log(cityInput);
    currentWeather(cityInput);
    forecast(cityInput);
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
      console.log(weather);

      // City name
      var cityName = document.querySelector(".city");
      cityName.textContent = weather.name + moment().format("l");

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
        console.log(uv);
        var uv = uv.value.toFixed(1);
        console.log(uv);
        var uvIndex = document.querySelector(".uvIndex");
        uvIndex.textContent = "Today's UV Index is: " + uv;
      });
    });
  }
  // Function for the five-day forecast
  function forecast(city) {
    // URL for the OWM five-day forecast API
    var forecastURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=imperial&appid=" +
      APIKey;

    // Get the info from the API
    $.ajax({
      url: forecastURL,
      method: "GET",
    }).then(function (forecast) {
      console.log(forecast);

      // After user enters a city, the temperature and humidity will be shown for the next five days
      // Day 1
      var dayOne = forecast.list[4];
      var dayTitleOne = document.querySelector(".date-title-one");
      var dayTempOne = document.querySelector(".date-temp-one");
      var dayHumOne = document.querySelector(".date-hum-one");
      dayTitleOne.textContent = moment().add(1, "day").format("l");
      dayTempOne.textContent = dayOne.main.temp.toFixed(1);
      dayHumOne.textContent = dayOne.main.humidity;
      console.log(moment().add(1, "day").format("l"));
      console.log(dayOne.main.temp.toFixed(1));
      console.log(dayOne.main.humidity);

      // Day 2
      var dayTwo = forecast.list[12];
      var dayTitleTwo = document.querySelector(".date-title-two");
      var dayTempTwo = document.querySelector(".date-temp-two");
      var dayHumTwo = document.querySelector(".date-hum-two");
      dayTitleTwo.textContent = moment().add(2, "days").format("l");
      dayTempTwo.textContent = dayTwo.main.temp.toFixed(1);
      dayHumTwo.textContent = dayTwo.main.humidity;
      console.log(moment().add(2, "days").format("l"));
      console.log(dayTwo.main.temp.toFixed(1));
      console.log(dayTwo.main.humidity);

      // Day 3
      var dayThree = forecast.list[20];
      var dayTitleThree = document.querySelector(".date-title-three");
      var dayTempThree = document.querySelector(".date-temp-three");
      var dayHumThree = document.querySelector(".date-hum-three");
      dayTitleThree.textContent = moment().add(3, "days").format("l");
      dayTempThree.textContent = dayThree.main.temp.toFixed(1);
      dayHumThree.textContent = dayThree.main.humidity;
      console.log(moment().add(3, "days").format("l"));
      console.log(dayThree.main.temp.toFixed(1));
      console.log(dayThree.main.humidity);

      // Day 4
      var dayFour = forecast.list[28];
      var dayTitleFour = document.querySelector(".date-title-four");
      var dayTempFour = document.querySelector(".date-temp-four");
      var dayHumFour = document.querySelector(".date-hum-four");
      dayTitleFour.textContent = moment().add(4, "days").format("l");
      dayTempFour.textContent = dayFour.main.temp.toFixed(1);
      dayHumFour.textContent = dayFour.main.humidity;
      console.log(moment().add(4, "days").format("l"));
      console.log(dayFour.main.temp.toFixed(1));
      console.log(dayFour.main.humidity);

      // Day 5
      var dayFive = forecast.list[36];
      var dayTitleFive = document.querySelector(".date-title-five");
      var dayTempFive = document.querySelector(".date-temp-five");
      var dayHumFive = document.querySelector(".date-hum-five");
      dayTitleFive.textContent = moment().add(5, "days").format("l");
      dayTempFive.textContent = dayFive.main.temp.toFixed(1);
      dayHumFive.textContent = dayFive.main.humidity;
      console.log(moment().add(5, "days").format("l"));
      console.log(dayFive.main.temp.toFixed(1));
      console.log(dayFive.main.humidity);
    });
  }
});
