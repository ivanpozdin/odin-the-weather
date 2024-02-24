import favicon from "./favicon.svg";

const setTitle = function (title) {
  document.title = title;
};
const downloadFont = function () {
  document.style = `@import
  url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap')
  <style>`;
};
const setFavicon = function () {
  const faviconHtml = `
  <link rel="icon" type="image/x-icon" href="${favicon}">
  `;
  document.head.insertAdjacentHTML("beforeend", faviconHtml);
};

const createSearch = function (handleSearch) {
  const form = document.createElement("form");
  form.className = "search-form";
  const formInnerHtml = `
  <label for="city-input">
    <span>Place:</span>
    <input type="text" name="city" id="city-input" />
    <button type="button" id="get-city-btn">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
    </button>
    <div class="loader hidden"></div> 
  </label>
  `;
  form.insertAdjacentHTML("afterbegin", formInnerHtml);
  const input = form.querySelector("#city-input");
  const loader = form.querySelector(".loader");
  form.querySelector("#get-city-btn").addEventListener("click", () => {
    if (input.value === "") return;
    loader.classList.remove("hidden");
    handleSearch(input.value);
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value === "") return;
    loader.classList.remove("hidden");
    handleSearch(input.value);
  });
  return form;
};

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
              src="${iconPath}"
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

  const upperBoundHour = currentHour + 4;
  const hourlyWeatherPart = hourlyWeather.slice(currentHour, upperBoundHour);

  hourlyWeatherPart.forEach((weather) => {
    const hourWeatherElement = document.createElement("div");
    hourWeatherElement.className = "hour-weather";
    const hourWeatherInnerHtml = `
      <div class="hour-number">${weather.hour < 10 ? "0" : ""}${
      weather.hour
    }</div>
        <img src="${weather.icon}" alt="${weather.condition}" srcset="" />
      <p class="hour-temperature">${weather.temperature}°</p>
    `;
    hourWeatherElement.insertAdjacentHTML("afterbegin", hourWeatherInnerHtml);
    hourlySection.insertAdjacentElement("beforeend", hourWeatherElement);
  });
  return hourlySection;
};

const createDaysSection = function (daysWeather) {
  const daysContainer = document.createElement("div");
  daysContainer.className = "days-section";
  daysWeather.forEach((weather) => {
    const dayHtml = `
      <div class="day-weather">
        <p class="week-day-name">${weather.weekDay}</p>
        <p class="highest-temp-days">${weather.highestTemperature}°</p>
        <img src="${weather.icon}" alt="${weather.condition}">
        <p class="lowest-temp-days">${weather.lowestTemperature}°</p>
        
      </div>
    `;
    daysContainer.insertAdjacentHTML("beforeend", dayHtml);
  });
  // <p class="day-weather-condition">${weather.condition}</p>
  return daysContainer;
};

export function createWidget(
  city,
  currentHour,
  hourlyWeather,
  daysWeather,
  handleSearch
) {
  setTitle("the weather...");
  downloadFont();
  setFavicon();
  const oldWidget = document.querySelector(".weather-widget");
  if (oldWidget) oldWidget.remove();
  const widget = document.createElement("div");
  widget.className = "weather-widget";

  const form = createSearch(handleSearch);

  const todayGeneralSection = createTodayGeneralSection(
    city,
    currentHour,
    hourlyWeather
  );

  const hourlySection = createHourlySection(currentHour, hourlyWeather);

  const daysSection = createDaysSection(daysWeather);

  widget.insertAdjacentElement("beforeend", form);
  widget.insertAdjacentElement("beforeend", todayGeneralSection);
  widget.insertAdjacentElement("beforeend", hourlySection);
  widget.insertAdjacentElement("beforeend", daysSection);
  document.body.insertAdjacentElement("beforeend", widget);
  widget.querySelector("#city-input").focus();
}
