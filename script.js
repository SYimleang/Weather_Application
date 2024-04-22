const apiKey = "1b1d8cf8e11552a446f638acb19d932d";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const event = new KeyboardEvent("keydown", {
  key: "Enter",
  code: "Enter",
  which: 13,
  keyCode: 13,
});

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // Handling error
    if (!response.ok) {
      throw new Error("City not found!");
    }
    const data = await response.json();
    updateWeatherData(data);
  } catch {
    displayError();
  }
}

function updateWeatherData(data) {
  // Setting the information
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  // Check weather icon type
  if (data.weather[0].main === "Clouds") {
    weatherIcon.src = "img/clouds.png";
  } else if (data.weather[0].main === "Clear") {
    weatherIcon.src = "img/clear.png";
  } else if (data.weather[0].main === "Mist") {
    weatherIcon.src = "img/mist.png";
  } else if (data.weather[0].main === "Drizzle") {
    weatherIcon.src = "img/drizzle.png";
  } else if (data.weather[0].main === "Rain") {
    weatherIcon.src = "img/rain.png";
  } else if (data.weather[0].main === "Snow") {
    weatherIcon.src = "img/snow.png";
  } else {
    weatherIcon.src = "";
  }

  // Display information
  document.querySelector(".error").style.display = "none";
  document.querySelector(".weather").style.display = "block";
}

// Hide the information and display error message
function displayError() {
  document.querySelector(".error").style.display = "block";
  document.querySelector(".weather").style.display = "none";
}

function init() {
  const triggerWeatherCheck = () => {
    checkWeather(searchBox.value);
  };
  // Click search button options
  searchBtn.addEventListener("click", triggerWeatherCheck);

  // Press "Enter" key options
  searchBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      triggerWeatherCheck();
    }
  });
}

init();
