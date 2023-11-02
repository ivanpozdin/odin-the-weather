import { createWidget } from "./view/view.js";
import style from "./style.css";

const getCurrentHour = function () {
  const date = new Date();
  return date.getHours();
};

const printWeather = async function (city) {
  const apiKey = "7dd9a1cb233b4205a94110713232710";
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}`
    );
    const data = await response.json();
    const forecast = data.forecast.forecastday[0].hour;
    console.log(data);
    console.log(forecast);
    for (let hour = getCurrentHour(); hour < 24; hour++) {
      console.log(`at ${hour}:00 temperature= ${forecast[hour].temp_c}`);
    }
  } catch (e) {
    console.log(e);
  }
};

const showForm = function () {
  const formElement = document.createElement("form");
  const formInnerHtml = `
  <label for="city-input">
    <span>Place:</span>
    <input type="text" name="city" id="city-input" />
    <button type="submit" id="get-city-btn">ENTER</button>
  </label>
  `;
  formElement.insertAdjacentHTML("afterbegin", formInnerHtml);
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = document.getElementById("city-input").value;
    console.log(city);
    printWeather(city);
  });
  document.body.insertAdjacentElement("afterbegin", formElement);
};

// showForm();

// const getDaysWeather = async function () {
//   const apiKey = "7dd9a1cb233b4205a94110713232710";
//   const response = await fetch(
//     `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=tbilisi&days=3`
//   );
//   const data = await response.json();
//   console.log(data);
// };
// getDaysWeather();

const city = "tbilisi";
printWeather(city);

const drawWeather = async function (city) {
  const apiKey = "7dd9a1cb233b4205a94110713232710";
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}`
    );
    const data = await response.json();
    const forecast = data.forecast.forecastday[0].hour;

    const hourlyWeather = forecast.map((weather, hour) => {
      const condition = weather.condition.text;
      const icon = weather.condition.icon;
      const temperature = Math.floor(weather.temp_c);
      return {
        condition,
        icon,
        temperature,
        hour,
      };
    });
    const cityName = data.location.name;
    createWidget(cityName, getCurrentHour(), hourlyWeather);
  } catch (e) {
    console.log(e);
  }
};

drawWeather(city);
