let lettersArray = [];
let locationRes = "";
let tempScale;

const daysTempTitle = document.querySelectorAll("[data-temp-day]");
const daysTempMin = document.querySelectorAll("[data-temp-min]");
const daysTempMax = document.querySelectorAll("[data-temp-max]");
const btnToggle = document.querySelector("[data-btn-toggle]");
const searchLocation = document.querySelector("[data-search]");

const currentLocation = document.querySelector("[data-current-location]");
const currentTemp = document.querySelector("[data-temp-now]");
const currentTempMin = document.querySelector("[data-current-min]");
const currentTempMax = document.querySelector("[data-current-max]");
const currentConditions = document.querySelector("[data-current-conditions]");
const currentSensation = document.querySelector("[data-current-sensation]");
const conditionsStatus = document.querySelectorAll("[data-conditions-status]");
const currentIcon = document.querySelector("[data-current-icon]");
const spanToggle = document.querySelector("[data-span-toggle]");
const sunriseTime = document.querySelector("[data-sunrise-time]");
const sunsetTime = document.querySelector("[data-sunset-time]");

window.onload = () => {
  fetchWeatherData();
};

searchLocation.addEventListener("keypress", (e) => {
  let letter = e.key;
  e.stopPropagation();
  if (letter === "Backspace") {
    lettersArray.splice(-1, 1);
  } else {
    lettersArray.push(letter);
  }
  if (letter === "Enter") {
    lettersArray.splice(-1, 1);
    locationRes = lettersArray.join("");
    checkTempScale();
    fetchWeatherData(locationRes.toLowerCase(), tempScale);
    searchLocation.value = "";
    lettersArray = [];
  }
});

btnToggle.addEventListener("click", () => {
  spanToggle.classList.toggle("f");
  checkTempScale();
  fetchWeatherData(locationRes, tempScale);
});

function checkTempScale() {
  if (spanToggle.classList.contains("f")) {
    tempScale = "us";
  } else {
    tempScale = "metric";
  }
}

function generateWeatherIcon(name, index) {
  const weatherIcon = document.createElement("img");
  weatherIcon.src = `./images/${name}.png`;
  conditionsStatus[index].append(weatherIcon);
}

function generateTwoIcons(nameOne, nameTwo, index) {
  const weatherIconOne = document.createElement("img");
  const weatherIconTwo = document.createElement("img");
  weatherIconOne.src = `./images/${nameOne}.png`;
  weatherIconTwo.src = `./images/${nameTwo}.png`;
  conditionsStatus[index].append(weatherIconOne, weatherIconTwo);
}

function fetchWeatherData(location = "petrozavodsk", degrees = "metric") {
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${degrees}&key=7WASBVZYUP9CKSTKH36CSJRJ4&contentType=json`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      currentLocation.textContent = response.address;
      currentTemp.textContent = `${response.currentConditions.temp}°`;
      currentTempMin.textContent = `минимум: ${response.days[0].feelslikemax}°`;
      currentTempMax.textContent = `максимум: ${response.days[0].feelslikemin}°`;
      currentConditions.textContent = response.currentConditions.conditions;
      currentSensation.textContent = `ощущается как: ${response.currentConditions.feelslike}°`;
      sunriseTime.textContent = response.currentConditions.sunrise;
      sunsetTime.textContent = response.currentConditions.sunset;

      //new func?
      if (currentConditions.textContent === "Overcast") {
        currentIcon.setAttribute("src", "./images/overcast.png");
      }
      if (currentConditions.textContent === "Partially cloudy") {
        currentIcon.setAttribute("src", "./images/partly-cloudy.png");
      }
      if (currentConditions.textContent === "Snow, Overcast") {
        currentIcon.setAttribute("src", "./images/snow.png");
      }

      for (let i = 0; i < daysTempTitle.length; i++) {
        daysTempTitle[i].textContent = response.days[i].datetime;
        daysTempMin[i].textContent = `${response.days[i].feelslikemax}°`;
        daysTempMax[i].textContent = `${response.days[i].feelslikemin}°`;
        console.log(response.days[i].conditions);
        conditionsStatus[i].textContent = response.days[i].conditions;

        //weatherIcon - in new func
        //colnditionsStatus - in new func?
        if (conditionsStatus[i].textContent === "Overcast") {
          generateWeatherIcon("overcast", i);
        }
        if (conditionsStatus[i].textContent === "Partially cloudy") {
          generateWeatherIcon("partly-cloudy", i);
        }
        if (conditionsStatus[i].textContent === "Clear") {
          generateWeatherIcon("clear", i);
        }
        if (
          conditionsStatus[i].textContent === "Snow, Overcast" ||
          conditionsStatus[i].textContent === "Snow"
        ) {
          generateWeatherIcon("snow", i);
        }
        if (
          conditionsStatus[i].textContent === "Rain" ||
          conditionsStatus[i].textContent === "Rain, Partially cloudy" ||
          conditionsStatus[i].textContent === "Rain, Overcast"
        ) {
          generateWeatherIcon("rain", i);
        }
        if (conditionsStatus[i].textContent === "Snow, Partially cloudy") {
          generateTwoIcons("partly-cloudy", "snowflake", i);
        }
        if (
          conditionsStatus[i].textContent === "Snow, Rain, Partially cloudy" ||
          conditionsStatus[i].textContent === "Snow, Rain, Overcast"
        ) {
          generateTwoIcons("rain", "snowflake", i);
        }
        if (
          conditionsStatus[i].textContent ===
          "Snow, Rain, Freezing Drizzle/Freezing Rain, Overcast"
        ) {
          generateWeatherIcon("freezing-rain", i);
        }
      }

      if (
        response.currentConditions.datetime ===
        response.currentConditions.sunset
      ) {
        document.querySelector("body").style.backgroundColor = "#645179";
        document.querySelector(".violet").style.color = "#d3b5ed";
      }
    });
}
