// const apiAddress =
//   "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/petrozavodsk?key=7WASBVZYUP9CKSTKH36CSJRJ4";

const daysTempTitle = document.querySelectorAll("[data-temp-day]");
const daysTempMin = document.querySelectorAll("[data-temp-min]");
const daysTempMax = document.querySelectorAll("[data-temp-max]");
const btnToggle = document.querySelector("[data-btn-toggle]");

fetch(
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/petrozavodsk?unitGroup=metric&key=7WASBVZYUP9CKSTKH36CSJRJ4&contentType=json"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    const currentTemp = document.querySelector("[data-temp-now]");
    const currentTempMin = document.querySelector("[data-current-min]");
    const currentTempMax = document.querySelector("[data-current-max]");
    const currentConditions = document.querySelector(
      "[data-current-conditions]"
    );
    const currentSensation = document.querySelector("[data-current-sensation]");
    const conditionsStatus = document.querySelectorAll(
      "[data-conditions-status]"
    );
    const currentIcon = document.querySelector("[data-current-icon]");

    console.log(response);
    console.log(response.days[0].feelslikemax);

    currentTempMin.append(response.days[0].feelslikemax);
    currentTempMax.append(response.days[0].feelslikemin);
    currentConditions.append(response.currentConditions.conditions);
    currentSensation.append(response.currentConditions.feelslike);

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
      daysTempTitle[i].append(response.days[i].datetime);
      daysTempMin[i].append(response.days[i].feelslikemax);
      daysTempMax[i].append(response.days[i].feelslikemin);
      console.log(response.days[i].conditions);
      conditionsStatus[i].textContent = response.days[i].conditions;

      if (conditionsStatus[i].textContent === "Overcast") {
        const weatherIcon = document.createElement("img");
        weatherIcon.src = "./images/overcast.png";
        conditionsStatus[i].append(weatherIcon);
      }
      if (conditionsStatus[i].textContent === "Partially cloudy") {
        const weatherIcon = document.createElement("img");
        weatherIcon.src = "./images/partly-cloudy.png";
        conditionsStatus[i].append(weatherIcon);
      }
      if (conditionsStatus[i].textContent === "Snow, Overcast") {
        const weatherIcon = document.createElement("img");
        weatherIcon.src = "./images/snow.png";
        conditionsStatus[i].append(weatherIcon);
      }
    }
    currentTemp.append(response.currentConditions.temp);

    btnToggle.addEventListener("click", () => {
      const spanToggle = document.querySelector("[data-span-toggle]");
      spanToggle.classList.toggle("c");
    });
  });
