// 1 Search location
function searchInput(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#location-input");
  searchLocation(searchInput.value);
}
function searchLocation(city) {
  let unit = "metric";
  let apiKey = "cde034e8222483825cf0d8bc4a20be05";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  console.log(response);
  //location
  let currentLocation = document.querySelector(".city");
  let getLocation = response.data.name;
  currentLocation.innerHTML = getLocation;
  //temperature
  let currentTemperature = document.querySelector("#current-temperature");
  let getTemperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = getTemperature;
  //wind
  let currentWind = document.querySelector("#wind");
  let getWind = Math.round(response.data.wind.speed);
  let windMessage = `Wind: ${getWind} m/s`;
  currentWind.innerHTML = windMessage;
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", searchInput);

searchLocation("stockholm");

// Bonus Get current location

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(displayPosition);
}

function displayPosition(position) {
  let apiKey = `cde034e8222483825cf0d8bc4a20be05`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeather);
}

let locationIcon = document.querySelector("#location-icon");
locationIcon.addEventListener("click", getCurrentLocation);

// Current day and time

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday                                                                                            ",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let currentTime = document.querySelector(".current-day");
currentTime.innerHTML = `${day} ${hour}:${minute}`;

// Temperature units (something wrong not working)

function showCelsius(response) {
  response.preventDefault();
  let mainTemp = document.querySelector("#current-temperature");
  let metricTemperature = Math.round(response.data.main.temp);
  mainTemp.innerHTML = metricTemperature;
}

function showFahrenheit(response) {
  response.preventDefault();
  let mainTemp = document.querySelector("#current-temperature");
  let metricTemperature = Math.round(response.data.main.temp);
  let fahrenheit = Math.round((metricTemperature * 9) / 5) + 32;
  mainTemp.innerHTML = fahrenheit;
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);
