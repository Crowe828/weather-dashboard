// Personal API Key
var APIKey = "e10987ffef94fe88a10c5d54823a1d23";
// Empty variable to hold cities entered in input field
var cities = [];

// When search button is clicked, the weather is displayed for the searched for city
$(document).ready(function () {
  $("#weather-btn").on("click", function (event) {
    event.preventDefault();
    var cityInput = $("#weather-input").val().trim();
    cities.push(cityInput);
    currentWeather(cityInput);
    forecast(cityInput);
    localStorage.setItem("weather", JSON.stringify(cities));
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

      // Weather icon
      var icon = weather.weather[0].icon;
      var iconURL = "http://openweathermap.org/img/wn/" + icon + ".png";
      var iconImage = document.createElement("img");
      iconImage.src = iconURL;

      // City name
      var cityName = document.querySelector(".city");
      cityName.textContent = weather.name + " (" + moment().format("l") + ") ";
      cityName.append(iconImage);

      // Temperature
      var F = weather.main.temp.toFixed(1);
      console.log(F);
      var tempToday = document.querySelector(".temp");
      tempToday.textContent = "Temperature: " + F + " °F";

      // Humidity
      var hum = weather.main.humidity;
      console.log(hum);
      var humToday = document.querySelector(".humidity");
      humToday.textContent = "Humidity: " + hum + "%";

      // Wind
      console.log(weather.wind);
      var windSpeed = weather.wind.speed.toFixed(1);
      var windCurrent = document.querySelector(".wind");
      windCurrent.textContent = "Wind speed: " + windSpeed + " MPH";

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
        var uv = uv.value.toFixed(1);
        var uvIndex = document.querySelector(".uvIndex");
        uvIndex.textContent = "UV Index: " + uv;
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
      dayTempOne.textContent = "Temp: " + dayOne.main.temp.toFixed(1) + " °F";
      dayHumOne.textContent = "Humidity: " + dayOne.main.humidity + "%";
      console.log(moment().add(1, "day").format("l"));
      console.log(dayOne.main.temp.toFixed(1));
      console.log(dayOne.main.humidity);

      // Weather icon for day 1
      var iconOne = forecast.list[4].weather[0].icon;
      var iconOneURL = "http://openweathermap.org/img/wn/" + iconOne + ".png";
      document.querySelector(".card-icon-one").src = iconOneURL;

      // Day 2
      var dayTwo = forecast.list[12];
      var dayTitleTwo = document.querySelector(".date-title-two");
      var dayTempTwo = document.querySelector(".date-temp-two");
      var dayHumTwo = document.querySelector(".date-hum-two");
      dayTitleTwo.textContent = moment().add(2, "days").format("l");
      dayTempTwo.textContent = "Temp: " + dayTwo.main.temp.toFixed(1);
      +" °F";
      dayHumTwo.textContent = "Humidity: " + dayTwo.main.humidity + "%";
      console.log(moment().add(2, "days").format("l"));
      console.log(dayTwo.main.temp.toFixed(1));
      console.log(dayTwo.main.humidity);

      // Weather icon for day 2
      var iconTwo = forecast.list[12].weather[0].icon;
      var iconTwoURL = "http://openweathermap.org/img/wn/" + iconTwo + ".png";
      document.querySelector(".card-icon-two").src = iconTwoURL;

      // Day 3
      var dayThree = forecast.list[20];
      var dayTitleThree = document.querySelector(".date-title-three");
      var dayTempThree = document.querySelector(".date-temp-three");
      var dayHumThree = document.querySelector(".date-hum-three");
      dayTitleThree.textContent = moment().add(3, "days").format("l");
      dayTempThree.textContent =
        "Temp: " + dayThree.main.temp.toFixed(1 + " °F");
      dayHumThree.textContent = "Humidity: " + dayThree.main.humidity + "%";
      console.log(moment().add(3, "days").format("l"));
      console.log(dayThree.main.temp.toFixed(1));
      console.log(dayThree.main.humidity);

      // Weather icon for day 3
      var iconThree = forecast.list[20].weather[0].icon;
      var iconThreeURL =
        "http://openweathermap.org/img/wn/" + iconThree + ".png";
      document.querySelector(".card-icon-three").src = iconThreeURL;

      // Day 4
      var dayFour = forecast.list[28];
      var dayTitleFour = document.querySelector(".date-title-four");
      var dayTempFour = document.querySelector(".date-temp-four");
      var dayHumFour = document.querySelector(".date-hum-four");
      dayTitleFour.textContent = moment().add(4, "days").format("l");
      dayTempFour.textContent = "Temp: " + dayFour.main.temp.toFixed(1) + " °F";
      dayHumFour.textContent = "Humidity: " + dayFour.main.humidity + "%";
      console.log(moment().add(4, "days").format("l"));
      console.log(dayFour.main.temp.toFixed(1));
      console.log(dayFour.main.humidity);

      // Weather icon for day 4
      var iconFour = forecast.list[28].weather[0].icon;
      var iconFourURL = "http://openweathermap.org/img/wn/" + iconFour + ".png";
      document.querySelector(".card-icon-four").src = iconFourURL;

      // Day 5
      var dayFive = forecast.list[36];
      var dayTitleFive = document.querySelector(".date-title-five");
      var dayTempFive = document.querySelector(".date-temp-five");
      var dayHumFive = document.querySelector(".date-hum-five");
      dayTitleFive.textContent = moment().add(5, "days").format("l");
      dayTempFive.textContent = "Temp: " + dayFive.main.temp.toFixed(1) + " °F";
      dayHumFive.textContent = "Humidity: " + dayFive.main.humidity + "%";
      console.log(moment().add(5, "days").format("l"));
      console.log(dayFive.main.temp.toFixed(1));
      console.log(dayFive.main.humidity);

      // Weather icon for day 5
      var iconFive = forecast.list[36].weather[0].icon;
      var iconFiveURL = "http://openweathermap.org/img/wn/" + iconFive + ".png";
      document.querySelector(".card-icon-five").src = iconFiveURL;
    });
  }

  // List where previously entered cities will be stored
  var cityList = document.querySelector(".city-list");

  // Retrieve cities from localStorage
  cities = JSON.parse(localStorage.getItem("weather"));

  // For loop to create the list items
  for (var i = 0; i < cities.length; i++) {
    var cityListEl = document.createElement("li");
    cityListEl.setAttribute("class", "list-group-item");
    cityListEl.textContent = cities[i];
    cityList.prepend(cityListEl);
  }

  // Call the two functions when the page opens
  currentWeather(cities.pop());
  forecast(cities.pop());
});
