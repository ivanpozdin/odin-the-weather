const createTodayGeneralSection = function (city, currentHour, hourlyWeather) {
  const highestTemperature = hourlyWeather.reduce(
    (prevMax, curWeather) => Math.max(prevMax, curWeather.temperature),
    -270
  );

  const lowestTemperature = hourlyWeather.reduce(
    (prevMax, curWeather) => Math.min(prevMax, curWeather.temperature),
    1000
  );

  const currentTemperature = hourlyWeather[currentHour].temperature;

  const todaySection = document.createElement("div");
  todaySection.className = "today-general-section";
  const weatherCondition = hourlyWeather[currentHour].condition;
  const iconPath = hourlyWeather[currentHour].icon;
  const todayInnerHtml = `
    <div class="city-and-current-temperature">
            <p>${city}</p>
            <p id="current-temperature">${currentTemperature}°</p>
          </div>
          <div class="high-low">
            <img
              id="icon-current-weather"
              src="http:${iconPath}"
              alt="${weatherCondition}"
              srcset=""
            />
            <p id="current-weather-condition">${weatherCondition}</p>
            <p>H: <span>${highestTemperature}°</span> L: <span>${lowestTemperature}°</span></p>
    </div>
  `;
  todaySection.insertAdjacentHTML("afterbegin", todayInnerHtml);
  return todaySection;
};

const createHourlySection = function (currentHour, hourlyWeather) {
  const hourlySection = document.createElement("div");
  hourlySection.className = "today-hourly-section";

  const upperBoundHour = currentHour + 7;
  const hourlyWeatherPart = hourlyWeather.slice(currentHour, upperBoundHour);

  hourlyWeatherPart.forEach((weather) => {
    const hourWeatherElement = document.createElement("div");
    hourWeatherElement.className = "hour-weather";
    const hourWeatherInnerHtml = `
      <div class="hour-number">${weather.hour < 10 ? "0" : ""}${
      weather.hour
    }</div>
        <img src="http:${weather.icon}" alt="${weather.icon}" srcset="" />
      <p class="hour-temperature">${weather.temperature}°</p>
    `;
    hourWeatherElement.insertAdjacentHTML("afterbegin", hourWeatherInnerHtml);
    hourlySection.insertAdjacentElement("beforeend", hourWeatherElement);
  });
  return hourlySection;
};

export function createWidget(city, currentHour, hourlyWeather) {
  const widget = document.createElement("div");
  widget.className = "weather-widget";

  const todayGeneralSection = createTodayGeneralSection(
    city,
    currentHour,
    hourlyWeather
  );

  const hourlySection = createHourlySection(currentHour, hourlyWeather);
  widget.insertAdjacentElement("afterbegin", todayGeneralSection);
  widget.insertAdjacentElement("beforeend", hourlySection);
  document.body.insertAdjacentElement("beforeend", widget);
}
