import { createWidget } from "./view/view.js";
import style from "./style.css";

const getCurrentHour = function () {
  const date = new Date();
  return date.getHours();
};

const city = "tbilisi";

const drawWeather = async function (city) {
  const apiKey = "7dd9a1cb233b4205a94110713232710";
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`
    );
    const data = await response.json();

    const forecast = [
      ...data.forecast.forecastday[0].hour,
      ...data.forecast.forecastday[1].hour,
    ];

    const hourlyWeather = forecast.map((weather, index) => {
      const condition = weather.condition.text;
      const icon = weather.condition.icon;
      const temperature = Math.floor(weather.temp_c);
      const hour = index % 24;
      return {
        condition,
        icon,
        temperature,
        hour,
      };
    });

    const daysWeather = data.forecast.forecastday.map((weather) => {
      return {
        highestTemperature: Math.floor(weather.day.maxtemp_c),
        lowestTemperature: Math.floor(weather.day.mintemp_c),
        condition: weather.day.condition.text,
        icon: weather.day.condition.icon,
        weekDay: new Intl.DateTimeFormat("en-GB", {
          weekday: "short",
        }).format(new Date(weather.date)),
      };
    });

    const cityName = data.location.name;
    createWidget(
      cityName,
      getCurrentHour(),
      hourlyWeather,
      daysWeather,
      drawWeather
    );
  } catch (e) {
    console.log(e);
  }
};

drawWeather(city);
