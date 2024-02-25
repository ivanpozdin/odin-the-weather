"use strict";
(self["webpackChunkodin_the_weather"] = self["webpackChunkodin_the_weather"] || []).push([["main"],{

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/view.js */ "./src/view/view.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");


const getCurrentHour = function () {
  const date = new Date();
  return date.getHours();
};
const city = "tbilisi";
const drawWeather = async function (city) {
  const apiKey = "7dd9a1cb233b4205a94110713232710";
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`);
    const data = await response.json();
    const forecast = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour];
    const hourlyWeather = forecast.map((weather, index) => {
      const condition = weather.condition.text;
      const icon = weather.condition.icon;
      const temperature = Math.floor(weather.temp_c);
      const hour = index % 24;
      return {
        condition,
        icon,
        temperature,
        hour
      };
    });
    const daysWeather = data.forecast.forecastday.map(weather => {
      return {
        highestTemperature: Math.floor(weather.day.maxtemp_c),
        lowestTemperature: Math.floor(weather.day.mintemp_c),
        condition: weather.day.condition.text,
        icon: weather.day.condition.icon,
        weekDay: new Intl.DateTimeFormat("en-GB", {
          weekday: "short"
        }).format(new Date(weather.date))
      };
    });
    const cityName = data.location.name;
    (0,_view_view_js__WEBPACK_IMPORTED_MODULE_0__.createWidget)(cityName, getCurrentHour(), hourlyWeather, daysWeather, drawWeather);
  } catch (e) {
    console.log(e);
  }
};
drawWeather(city);

/***/ }),

/***/ "./src/view/view.js":
/*!**************************!*\
  !*** ./src/view/view.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createWidget: () => (/* binding */ createWidget)
/* harmony export */ });
/* harmony import */ var _favicon_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./favicon.svg */ "./src/view/favicon.svg");

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
  <link rel="icon" type="image/x-icon" href="${_favicon_svg__WEBPACK_IMPORTED_MODULE_0__}">
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
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (input.value === "") return;
    loader.classList.remove("hidden");
    handleSearch(input.value);
  });
  return form;
};
const createTodayGeneralSection = function (city, currentHour, hourlyWeather) {
  const highestTemperature = hourlyWeather.reduce((prevMax, curWeather) => Math.max(prevMax, curWeather.temperature), -270);
  const lowestTemperature = hourlyWeather.reduce((prevMax, curWeather) => Math.min(prevMax, curWeather.temperature), 1000);
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
  hourlyWeatherPart.forEach(weather => {
    const hourWeatherElement = document.createElement("div");
    hourWeatherElement.className = "hour-weather";
    const hourWeatherInnerHtml = `
      <div class="hour-number">${weather.hour < 10 ? "0" : ""}${weather.hour}</div>
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
  daysWeather.forEach(weather => {
    const dayHtml = `
      <div class="day-weather">
        <p class="week-day-name">${weather.weekDay}</p>
        <img src="${weather.icon}" alt="${weather.condition}">
        <p>H: <span>${weather.highestTemperature}°</span> L: <span>${weather.lowestTemperature}°</span></p>
      </div>
    `;
    daysContainer.insertAdjacentHTML("beforeend", dayHtml);
  });
  // <p class="day-weather-condition">${weather.condition}</p>
  return daysContainer;
};
function createWidget(city, currentHour, hourlyWeather, daysWeather, handleSearch) {
  setTitle("the weather...");
  downloadFont();
  setFavicon();
  const oldWidget = document.querySelector(".weather-widget");
  if (oldWidget) oldWidget.remove();
  const widget = document.createElement("div");
  widget.className = "weather-widget";
  const form = createSearch(handleSearch);
  const todayGeneralSection = createTodayGeneralSection(city, currentHour, hourlyWeather);
  const hourlySection = createHourlySection(currentHour, hourlyWeather);
  const daysSection = createDaysSection(daysWeather);
  widget.insertAdjacentElement("beforeend", form);
  widget.insertAdjacentElement("beforeend", todayGeneralSection);
  widget.insertAdjacentElement("beforeend", hourlySection);
  widget.insertAdjacentElement("beforeend", daysSection);
  document.body.insertAdjacentElement("beforeend", widget);
  widget.querySelector("#city-input").focus();
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
  font-size: 62.5%;
  box-sizing: border-box;
}
body {
  display: flex;
  justify-content: center;
  background-color: black;

  font-family: "Nunito Sans", sans-serif;
}

.weather-widget {
  padding: 2rem;
  font-size: 2rem;
  width: 30rem;
  background-color: rgb(80, 117, 185);
  color: #fff;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.today-general-section {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 0.1rem #fff solid;
}

.city-and-current-temperature * {
  margin: 0;
}
.city-and-current-temperature #current-temperature {
  font-size: 4rem;
}

.hour-number {
  color: #cbd5e1;
}

.high-low {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 1.5rem;
  gap: 0.2rem;
}

.high-low * {
  margin: 0;
}

.high-low #icon-current-weather {
  width: 4rem;
}

.today-hourly-section {
  display: flex;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 0.1rem #fff solid;
  justify-content: center;
}

.today-hourly-section .hour-weather {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.today-hourly-section .hour-weather * {
  margin: 0;
}

.days-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.days-section * {
  margin: 0;
}

.day-weather {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.day-weather p span {
  margin-right: 1rem;
}

.days-section img {
  height: 4rem;
  width: 4rem;
}

.highest-temp-days {
  font-size: 2.1rem;
  margin-top: 0.7rem;
  margin-bottom: -0.5rem;
}

.lowest-temp-days {
  font-size: 1.5rem;
}

.day-weather-condition {
  width: 5rem;
}

.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}

#get-city-btn {
  width: 3rem;
  height: 2.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;

  border-radius: 0 1rem 1rem 0;
  border: none;
}
#get-city-btn:hover {
  opacity: 0.9;
}

#get-city-btn:active {
  opacity: 0.8;
}

#get-city-btn svg {
  width: 3rem;
}

.search-form label {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-form #city-input {
  height: 2.4rem;
  margin-left: 1rem;
  border-radius: 1rem 0 0 1rem;
  border: none;
  padding-left: 1rem;
}

.search-form #city-input:focus {
  outline: 1px solid black;
}

.loader {
  border: 0.3rem solid #f3f3f3; /* Light grey */
  border-top: 0.3rem solid #3498db; /* Blue */
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.hidden {
  opacity: 0;
}
`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,gBAAgB;EAChB,sBAAsB;AACxB;AACA;EACE,aAAa;EACb,uBAAuB;EACvB,uBAAuB;;EAEvB,sCAAsC;AACxC;;AAEA;EACE,aAAa;EACb,eAAe;EACf,YAAY;EACZ,mCAAmC;EACnC,WAAW;EACX,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,oBAAoB;EACpB,gCAAgC;AAClC;;AAEA;EACE,SAAS;AACX;AACA;EACE,eAAe;AACjB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,qBAAqB;EACrB,iBAAiB;EACjB,WAAW;AACb;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;EACb,SAAS;EACT,oBAAoB;EACpB,gCAAgC;EAChC,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;EACT,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,SAAS;AACX;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;EAClB,sBAAsB;AACxB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,kEAAkE;AACpE;;AAEA;EACE,WAAW;EACX,cAAc;EACd,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,kBAAkB;;EAElB,4BAA4B;EAC5B,YAAY;AACd;AACA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,cAAc;EACd,iBAAiB;EACjB,4BAA4B;EAC5B,YAAY;EACZ,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,4BAA4B,EAAE,eAAe;EAC7C,gCAAgC,EAAE,SAAS;EAC3C,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kCAAkC;AACpC;;AAEA;EACE;IACE,uBAAuB;EACzB;EACA;IACE,yBAAyB;EAC3B;AACF;;AAEA;EACE,UAAU;AACZ","sourcesContent":[":root {\n  font-size: 62.5%;\n  box-sizing: border-box;\n}\nbody {\n  display: flex;\n  justify-content: center;\n  background-color: black;\n\n  font-family: \"Nunito Sans\", sans-serif;\n}\n\n.weather-widget {\n  padding: 2rem;\n  font-size: 2rem;\n  width: 30rem;\n  background-color: rgb(80, 117, 185);\n  color: #fff;\n  border-radius: 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.today-general-section {\n  display: flex;\n  justify-content: space-between;\n  padding-bottom: 1rem;\n  border-bottom: 0.1rem #fff solid;\n}\n\n.city-and-current-temperature * {\n  margin: 0;\n}\n.city-and-current-temperature #current-temperature {\n  font-size: 4rem;\n}\n\n.hour-number {\n  color: #cbd5e1;\n}\n\n.high-low {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  font-size: 1.5rem;\n  gap: 0.2rem;\n}\n\n.high-low * {\n  margin: 0;\n}\n\n.high-low #icon-current-weather {\n  width: 4rem;\n}\n\n.today-hourly-section {\n  display: flex;\n  gap: 1rem;\n  padding-bottom: 1rem;\n  border-bottom: 0.1rem #fff solid;\n  justify-content: center;\n}\n\n.today-hourly-section .hour-weather {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.today-hourly-section .hour-weather * {\n  margin: 0;\n}\n\n.days-section {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  justify-content: center;\n  align-items: center;\n}\n\n.days-section * {\n  margin: 0;\n}\n\n.day-weather {\n  display: flex;\n  align-items: center;\n  gap: 2rem;\n}\n\n.day-weather p span {\n  margin-right: 1rem;\n}\n\n.days-section img {\n  height: 4rem;\n  width: 4rem;\n}\n\n.highest-temp-days {\n  font-size: 2.1rem;\n  margin-top: 0.7rem;\n  margin-bottom: -0.5rem;\n}\n\n.lowest-temp-days {\n  font-size: 1.5rem;\n}\n\n.day-weather-condition {\n  width: 5rem;\n}\n\n.material-symbols-outlined {\n  font-variation-settings: \"FILL\" 0, \"wght\" 400, \"GRAD\" 0, \"opsz\" 24;\n}\n\n#get-city-btn {\n  width: 3rem;\n  height: 2.6rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-right: 1rem;\n\n  border-radius: 0 1rem 1rem 0;\n  border: none;\n}\n#get-city-btn:hover {\n  opacity: 0.9;\n}\n\n#get-city-btn:active {\n  opacity: 0.8;\n}\n\n#get-city-btn svg {\n  width: 3rem;\n}\n\n.search-form label {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.search-form #city-input {\n  height: 2.4rem;\n  margin-left: 1rem;\n  border-radius: 1rem 0 0 1rem;\n  border: none;\n  padding-left: 1rem;\n}\n\n.search-form #city-input:focus {\n  outline: 1px solid black;\n}\n\n.loader {\n  border: 0.3rem solid #f3f3f3; /* Light grey */\n  border-top: 0.3rem solid #3498db; /* Blue */\n  border-radius: 50%;\n  width: 2rem;\n  height: 2rem;\n  animation: spin 2s linear infinite;\n}\n\n@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n.hidden {\n  opacity: 0;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/view/favicon.svg":
/*!******************************!*\
  !*** ./src/view/favicon.svg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "9dff7702c4a2f25dc69e.svg";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/controller.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdDQUFnQztBQUNoQyxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sZ0ZBQWdGLFlBQVksYUFBYSxNQUFNLEtBQUssVUFBVSxZQUFZLGNBQWMsYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksV0FBVyxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFB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SztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdGhlLXdlYXRoZXIvLi9zcmMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9vZGluLXRoZS13ZWF0aGVyLy4vc3JjL3ZpZXcvdmlldy5qcyIsIndlYnBhY2s6Ly9vZGluLXRoZS13ZWF0aGVyLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9vZGluLXRoZS13ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9vZGluLXRoZS13ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10aGUtd2VhdGhlci8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9vZGluLXRoZS13ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL29kaW4tdGhlLXdlYXRoZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL29kaW4tdGhlLXdlYXRoZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10aGUtd2VhdGhlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9vZGluLXRoZS13ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10aGUtd2VhdGhlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVdpZGdldCB9IGZyb20gXCIuL3ZpZXcvdmlldy5qc1wiO1xuaW1wb3J0IHN0eWxlIGZyb20gXCIuL3N0eWxlLmNzc1wiO1xuXG5jb25zdCBnZXRDdXJyZW50SG91ciA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gIHJldHVybiBkYXRlLmdldEhvdXJzKCk7XG59O1xuXG5jb25zdCBjaXR5ID0gXCJ0YmlsaXNpXCI7XG5cbmNvbnN0IGRyYXdXZWF0aGVyID0gYXN5bmMgZnVuY3Rpb24gKGNpdHkpIHtcbiAgY29uc3QgYXBpS2V5ID0gXCI3ZGQ5YTFjYjIzM2I0MjA1YTk0MTEwNzEzMjMyNzEwXCI7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT0ke2FwaUtleX0mcT0ke2NpdHl9JmRheXM9M2BcbiAgICApO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICBjb25zdCBmb3JlY2FzdCA9IFtcbiAgICAgIC4uLmRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cixcbiAgICAgIC4uLmRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uaG91cixcbiAgICBdO1xuXG4gICAgY29uc3QgaG91cmx5V2VhdGhlciA9IGZvcmVjYXN0Lm1hcCgod2VhdGhlciwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGNvbmRpdGlvbiA9IHdlYXRoZXIuY29uZGl0aW9uLnRleHQ7XG4gICAgICBjb25zdCBpY29uID0gd2VhdGhlci5jb25kaXRpb24uaWNvbjtcbiAgICAgIGNvbnN0IHRlbXBlcmF0dXJlID0gTWF0aC5mbG9vcih3ZWF0aGVyLnRlbXBfYyk7XG4gICAgICBjb25zdCBob3VyID0gaW5kZXggJSAyNDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbmRpdGlvbixcbiAgICAgICAgaWNvbixcbiAgICAgICAgdGVtcGVyYXR1cmUsXG4gICAgICAgIGhvdXIsXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgY29uc3QgZGF5c1dlYXRoZXIgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5Lm1hcCgod2VhdGhlcikgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaGlnaGVzdFRlbXBlcmF0dXJlOiBNYXRoLmZsb29yKHdlYXRoZXIuZGF5Lm1heHRlbXBfYyksXG4gICAgICAgIGxvd2VzdFRlbXBlcmF0dXJlOiBNYXRoLmZsb29yKHdlYXRoZXIuZGF5Lm1pbnRlbXBfYyksXG4gICAgICAgIGNvbmRpdGlvbjogd2VhdGhlci5kYXkuY29uZGl0aW9uLnRleHQsXG4gICAgICAgIGljb246IHdlYXRoZXIuZGF5LmNvbmRpdGlvbi5pY29uLFxuICAgICAgICB3ZWVrRGF5OiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChcImVuLUdCXCIsIHtcbiAgICAgICAgICB3ZWVrZGF5OiBcInNob3J0XCIsXG4gICAgICAgIH0pLmZvcm1hdChuZXcgRGF0ZSh3ZWF0aGVyLmRhdGUpKSxcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICBjb25zdCBjaXR5TmFtZSA9IGRhdGEubG9jYXRpb24ubmFtZTtcbiAgICBjcmVhdGVXaWRnZXQoXG4gICAgICBjaXR5TmFtZSxcbiAgICAgIGdldEN1cnJlbnRIb3VyKCksXG4gICAgICBob3VybHlXZWF0aGVyLFxuICAgICAgZGF5c1dlYXRoZXIsXG4gICAgICBkcmF3V2VhdGhlclxuICAgICk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgfVxufTtcblxuZHJhd1dlYXRoZXIoY2l0eSk7XG4iLCJpbXBvcnQgZmF2aWNvbiBmcm9tIFwiLi9mYXZpY29uLnN2Z1wiO1xuXG5jb25zdCBzZXRUaXRsZSA9IGZ1bmN0aW9uICh0aXRsZSkge1xuICBkb2N1bWVudC50aXRsZSA9IHRpdGxlO1xufTtcbmNvbnN0IGRvd25sb2FkRm9udCA9IGZ1bmN0aW9uICgpIHtcbiAgZG9jdW1lbnQuc3R5bGUgPSBgQGltcG9ydFxuICB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9TnVuaXRvK1NhbnM6aXRhbCxvcHN6LHdnaHRAMCw2Li4xMiwyMDAuLjEwMDA7MSw2Li4xMiwyMDAuLjEwMDAmZGlzcGxheT1zd2FwJylcbiAgPHN0eWxlPmA7XG59O1xuY29uc3Qgc2V0RmF2aWNvbiA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgZmF2aWNvbkh0bWwgPSBgXG4gIDxsaW5rIHJlbD1cImljb25cIiB0eXBlPVwiaW1hZ2UveC1pY29uXCIgaHJlZj1cIiR7ZmF2aWNvbn1cIj5cbiAgYDtcbiAgZG9jdW1lbnQuaGVhZC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgZmF2aWNvbkh0bWwpO1xufTtcblxuY29uc3QgY3JlYXRlU2VhcmNoID0gZnVuY3Rpb24gKGhhbmRsZVNlYXJjaCkge1xuICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gIGZvcm0uY2xhc3NOYW1lID0gXCJzZWFyY2gtZm9ybVwiO1xuICBjb25zdCBmb3JtSW5uZXJIdG1sID0gYFxuICA8bGFiZWwgZm9yPVwiY2l0eS1pbnB1dFwiPlxuICAgIDxzcGFuPlBsYWNlOjwvc3Bhbj5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiY2l0eVwiIGlkPVwiY2l0eS1pbnB1dFwiIC8+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJnZXQtY2l0eS1idG5cIj5cbiAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgLTk2MCA5NjAgOTYwXCIgd2lkdGg9XCIyNFwiPjxwYXRoIGQ9XCJNNzg0LTEyMCA1MzItMzcycS0zMCAyNC02OSAzOHQtODMgMTRxLTEwOSAwLTE4NC41LTc1LjVUMTIwLTU4MHEwLTEwOSA3NS41LTE4NC41VDM4MC04NDBxMTA5IDAgMTg0LjUgNzUuNVQ2NDAtNTgwcTAgNDQtMTQgODN0LTM4IDY5bDI1MiAyNTItNTYgNTZaTTM4MC00MDBxNzUgMCAxMjcuNS01Mi41VDU2MC01ODBxMC03NS01Mi41LTEyNy41VDM4MC03NjBxLTc1IDAtMTI3LjUgNTIuNVQyMDAtNTgwcTAgNzUgNTIuNSAxMjcuNVQzODAtNDAwWlwiLz48L3N2Zz5cbiAgICA8L2J1dHRvbj5cbiAgICA8ZGl2IGNsYXNzPVwibG9hZGVyIGhpZGRlblwiPjwvZGl2PiBcbiAgPC9sYWJlbD5cbiAgYDtcbiAgZm9ybS5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmJlZ2luXCIsIGZvcm1Jbm5lckh0bWwpO1xuICBjb25zdCBpbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcihcIiNjaXR5LWlucHV0XCIpO1xuICBjb25zdCBsb2FkZXIgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoXCIubG9hZGVyXCIpO1xuICBmb3JtLnF1ZXJ5U2VsZWN0b3IoXCIjZ2V0LWNpdHktYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaWYgKGlucHV0LnZhbHVlID09PSBcIlwiKSByZXR1cm47XG4gICAgbG9hZGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgaGFuZGxlU2VhcmNoKGlucHV0LnZhbHVlKTtcbiAgfSk7XG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoaW5wdXQudmFsdWUgPT09IFwiXCIpIHJldHVybjtcbiAgICBsb2FkZXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICBoYW5kbGVTZWFyY2goaW5wdXQudmFsdWUpO1xuICB9KTtcbiAgcmV0dXJuIGZvcm07XG59O1xuXG5jb25zdCBjcmVhdGVUb2RheUdlbmVyYWxTZWN0aW9uID0gZnVuY3Rpb24gKGNpdHksIGN1cnJlbnRIb3VyLCBob3VybHlXZWF0aGVyKSB7XG4gIGNvbnN0IGhpZ2hlc3RUZW1wZXJhdHVyZSA9IGhvdXJseVdlYXRoZXIucmVkdWNlKFxuICAgIChwcmV2TWF4LCBjdXJXZWF0aGVyKSA9PiBNYXRoLm1heChwcmV2TWF4LCBjdXJXZWF0aGVyLnRlbXBlcmF0dXJlKSxcbiAgICAtMjcwXG4gICk7XG5cbiAgY29uc3QgbG93ZXN0VGVtcGVyYXR1cmUgPSBob3VybHlXZWF0aGVyLnJlZHVjZShcbiAgICAocHJldk1heCwgY3VyV2VhdGhlcikgPT4gTWF0aC5taW4ocHJldk1heCwgY3VyV2VhdGhlci50ZW1wZXJhdHVyZSksXG4gICAgMTAwMFxuICApO1xuXG4gIGNvbnN0IGN1cnJlbnRUZW1wZXJhdHVyZSA9IGhvdXJseVdlYXRoZXJbY3VycmVudEhvdXJdLnRlbXBlcmF0dXJlO1xuXG4gIGNvbnN0IHRvZGF5U2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRvZGF5U2VjdGlvbi5jbGFzc05hbWUgPSBcInRvZGF5LWdlbmVyYWwtc2VjdGlvblwiO1xuICBjb25zdCB3ZWF0aGVyQ29uZGl0aW9uID0gaG91cmx5V2VhdGhlcltjdXJyZW50SG91cl0uY29uZGl0aW9uO1xuICBjb25zdCBpY29uUGF0aCA9IGhvdXJseVdlYXRoZXJbY3VycmVudEhvdXJdLmljb247XG4gIGNvbnN0IHRvZGF5SW5uZXJIdG1sID0gYFxuICAgIDxkaXYgY2xhc3M9XCJjaXR5LWFuZC1jdXJyZW50LXRlbXBlcmF0dXJlXCI+XG4gICAgICAgICAgICA8cD4ke2NpdHl9PC9wPlxuICAgICAgICAgICAgPHAgaWQ9XCJjdXJyZW50LXRlbXBlcmF0dXJlXCI+JHtjdXJyZW50VGVtcGVyYXR1cmV9wrA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImhpZ2gtbG93XCI+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIGlkPVwiaWNvbi1jdXJyZW50LXdlYXRoZXJcIlxuICAgICAgICAgICAgICBzcmM9XCIke2ljb25QYXRofVwiXG4gICAgICAgICAgICAgIGFsdD1cIiR7d2VhdGhlckNvbmRpdGlvbn1cIlxuICAgICAgICAgICAgICBzcmNzZXQ9XCJcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxwIGlkPVwiY3VycmVudC13ZWF0aGVyLWNvbmRpdGlvblwiPiR7d2VhdGhlckNvbmRpdGlvbn08L3A+XG4gICAgICAgICAgICA8cD5IOiA8c3Bhbj4ke2hpZ2hlc3RUZW1wZXJhdHVyZX3CsDwvc3Bhbj4gTDogPHNwYW4+JHtsb3dlc3RUZW1wZXJhdHVyZX3CsDwvc3Bhbj48L3A+XG4gICAgPC9kaXY+XG4gIGA7XG4gIHRvZGF5U2VjdGlvbi5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmJlZ2luXCIsIHRvZGF5SW5uZXJIdG1sKTtcbiAgcmV0dXJuIHRvZGF5U2VjdGlvbjtcbn07XG5cbmNvbnN0IGNyZWF0ZUhvdXJseVNlY3Rpb24gPSBmdW5jdGlvbiAoY3VycmVudEhvdXIsIGhvdXJseVdlYXRoZXIpIHtcbiAgY29uc3QgaG91cmx5U2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGhvdXJseVNlY3Rpb24uY2xhc3NOYW1lID0gXCJ0b2RheS1ob3VybHktc2VjdGlvblwiO1xuXG4gIGNvbnN0IHVwcGVyQm91bmRIb3VyID0gY3VycmVudEhvdXIgKyA0O1xuICBjb25zdCBob3VybHlXZWF0aGVyUGFydCA9IGhvdXJseVdlYXRoZXIuc2xpY2UoY3VycmVudEhvdXIsIHVwcGVyQm91bmRIb3VyKTtcblxuICBob3VybHlXZWF0aGVyUGFydC5mb3JFYWNoKCh3ZWF0aGVyKSA9PiB7XG4gICAgY29uc3QgaG91cldlYXRoZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBob3VyV2VhdGhlckVsZW1lbnQuY2xhc3NOYW1lID0gXCJob3VyLXdlYXRoZXJcIjtcbiAgICBjb25zdCBob3VyV2VhdGhlcklubmVySHRtbCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJob3VyLW51bWJlclwiPiR7d2VhdGhlci5ob3VyIDwgMTAgPyBcIjBcIiA6IFwiXCJ9JHtcbiAgICAgIHdlYXRoZXIuaG91clxuICAgIH08L2Rpdj5cbiAgICAgICAgPGltZyBzcmM9XCIke3dlYXRoZXIuaWNvbn1cIiBhbHQ9XCIke3dlYXRoZXIuY29uZGl0aW9ufVwiIHNyY3NldD1cIlwiIC8+XG4gICAgICA8cCBjbGFzcz1cImhvdXItdGVtcGVyYXR1cmVcIj4ke3dlYXRoZXIudGVtcGVyYXR1cmV9wrA8L3A+XG4gICAgYDtcbiAgICBob3VyV2VhdGhlckVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJiZWdpblwiLCBob3VyV2VhdGhlcklubmVySHRtbCk7XG4gICAgaG91cmx5U2VjdGlvbi5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgaG91cldlYXRoZXJFbGVtZW50KTtcbiAgfSk7XG4gIHJldHVybiBob3VybHlTZWN0aW9uO1xufTtcblxuY29uc3QgY3JlYXRlRGF5c1NlY3Rpb24gPSBmdW5jdGlvbiAoZGF5c1dlYXRoZXIpIHtcbiAgY29uc3QgZGF5c0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGRheXNDb250YWluZXIuY2xhc3NOYW1lID0gXCJkYXlzLXNlY3Rpb25cIjtcblxuICBkYXlzV2VhdGhlci5mb3JFYWNoKCh3ZWF0aGVyKSA9PiB7XG4gICAgY29uc3QgZGF5SHRtbCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJkYXktd2VhdGhlclwiPlxuICAgICAgICA8cCBjbGFzcz1cIndlZWstZGF5LW5hbWVcIj4ke3dlYXRoZXIud2Vla0RheX08L3A+XG4gICAgICAgIDxpbWcgc3JjPVwiJHt3ZWF0aGVyLmljb259XCIgYWx0PVwiJHt3ZWF0aGVyLmNvbmRpdGlvbn1cIj5cbiAgICAgICAgPHA+SDogPHNwYW4+JHt3ZWF0aGVyLmhpZ2hlc3RUZW1wZXJhdHVyZX3CsDwvc3Bhbj4gTDogPHNwYW4+JHt3ZWF0aGVyLmxvd2VzdFRlbXBlcmF0dXJlfcKwPC9zcGFuPjwvcD5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gICAgZGF5c0NvbnRhaW5lci5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgZGF5SHRtbCk7XG4gIH0pO1xuICAvLyA8cCBjbGFzcz1cImRheS13ZWF0aGVyLWNvbmRpdGlvblwiPiR7d2VhdGhlci5jb25kaXRpb259PC9wPlxuICByZXR1cm4gZGF5c0NvbnRhaW5lcjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXaWRnZXQoXG4gIGNpdHksXG4gIGN1cnJlbnRIb3VyLFxuICBob3VybHlXZWF0aGVyLFxuICBkYXlzV2VhdGhlcixcbiAgaGFuZGxlU2VhcmNoXG4pIHtcbiAgc2V0VGl0bGUoXCJ0aGUgd2VhdGhlci4uLlwiKTtcbiAgZG93bmxvYWRGb250KCk7XG4gIHNldEZhdmljb24oKTtcbiAgY29uc3Qgb2xkV2lkZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLXdpZGdldFwiKTtcbiAgaWYgKG9sZFdpZGdldCkgb2xkV2lkZ2V0LnJlbW92ZSgpO1xuICBjb25zdCB3aWRnZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB3aWRnZXQuY2xhc3NOYW1lID0gXCJ3ZWF0aGVyLXdpZGdldFwiO1xuXG4gIGNvbnN0IGZvcm0gPSBjcmVhdGVTZWFyY2goaGFuZGxlU2VhcmNoKTtcblxuICBjb25zdCB0b2RheUdlbmVyYWxTZWN0aW9uID0gY3JlYXRlVG9kYXlHZW5lcmFsU2VjdGlvbihcbiAgICBjaXR5LFxuICAgIGN1cnJlbnRIb3VyLFxuICAgIGhvdXJseVdlYXRoZXJcbiAgKTtcblxuICBjb25zdCBob3VybHlTZWN0aW9uID0gY3JlYXRlSG91cmx5U2VjdGlvbihjdXJyZW50SG91ciwgaG91cmx5V2VhdGhlcik7XG5cbiAgY29uc3QgZGF5c1NlY3Rpb24gPSBjcmVhdGVEYXlzU2VjdGlvbihkYXlzV2VhdGhlcik7XG5cbiAgd2lkZ2V0Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBmb3JtKTtcbiAgd2lkZ2V0Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCB0b2RheUdlbmVyYWxTZWN0aW9uKTtcbiAgd2lkZ2V0Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBob3VybHlTZWN0aW9uKTtcbiAgd2lkZ2V0Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBkYXlzU2VjdGlvbik7XG4gIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHdpZGdldCk7XG4gIHdpZGdldC5xdWVyeVNlbGVjdG9yKFwiI2NpdHktaW5wdXRcIikuZm9jdXMoKTtcbn1cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGA6cm9vdCB7XG4gIGZvbnQtc2l6ZTogNjIuNSU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5ib2R5IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xuXG4gIGZvbnQtZmFtaWx5OiBcIk51bml0byBTYW5zXCIsIHNhbnMtc2VyaWY7XG59XG5cbi53ZWF0aGVyLXdpZGdldCB7XG4gIHBhZGRpbmc6IDJyZW07XG4gIGZvbnQtc2l6ZTogMnJlbTtcbiAgd2lkdGg6IDMwcmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoODAsIDExNywgMTg1KTtcbiAgY29sb3I6ICNmZmY7XG4gIGJvcmRlci1yYWRpdXM6IDFyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMXJlbTtcbn1cblxuLnRvZGF5LWdlbmVyYWwtc2VjdGlvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgcGFkZGluZy1ib3R0b206IDFyZW07XG4gIGJvcmRlci1ib3R0b206IDAuMXJlbSAjZmZmIHNvbGlkO1xufVxuXG4uY2l0eS1hbmQtY3VycmVudC10ZW1wZXJhdHVyZSAqIHtcbiAgbWFyZ2luOiAwO1xufVxuLmNpdHktYW5kLWN1cnJlbnQtdGVtcGVyYXR1cmUgI2N1cnJlbnQtdGVtcGVyYXR1cmUge1xuICBmb250LXNpemU6IDRyZW07XG59XG5cbi5ob3VyLW51bWJlciB7XG4gIGNvbG9yOiAjY2JkNWUxO1xufVxuXG4uaGlnaC1sb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xuICBnYXA6IDAuMnJlbTtcbn1cblxuLmhpZ2gtbG93ICoge1xuICBtYXJnaW46IDA7XG59XG5cbi5oaWdoLWxvdyAjaWNvbi1jdXJyZW50LXdlYXRoZXIge1xuICB3aWR0aDogNHJlbTtcbn1cblxuLnRvZGF5LWhvdXJseS1zZWN0aW9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAxcmVtO1xuICBwYWRkaW5nLWJvdHRvbTogMXJlbTtcbiAgYm9yZGVyLWJvdHRvbTogMC4xcmVtICNmZmYgc29saWQ7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4udG9kYXktaG91cmx5LXNlY3Rpb24gLmhvdXItd2VhdGhlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi50b2RheS1ob3VybHktc2VjdGlvbiAuaG91ci13ZWF0aGVyICoge1xuICBtYXJnaW46IDA7XG59XG5cbi5kYXlzLXNlY3Rpb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDFyZW07XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uZGF5cy1zZWN0aW9uICoge1xuICBtYXJnaW46IDA7XG59XG5cbi5kYXktd2VhdGhlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMnJlbTtcbn1cblxuLmRheS13ZWF0aGVyIHAgc3BhbiB7XG4gIG1hcmdpbi1yaWdodDogMXJlbTtcbn1cblxuLmRheXMtc2VjdGlvbiBpbWcge1xuICBoZWlnaHQ6IDRyZW07XG4gIHdpZHRoOiA0cmVtO1xufVxuXG4uaGlnaGVzdC10ZW1wLWRheXMge1xuICBmb250LXNpemU6IDIuMXJlbTtcbiAgbWFyZ2luLXRvcDogMC43cmVtO1xuICBtYXJnaW4tYm90dG9tOiAtMC41cmVtO1xufVxuXG4ubG93ZXN0LXRlbXAtZGF5cyB7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xufVxuXG4uZGF5LXdlYXRoZXItY29uZGl0aW9uIHtcbiAgd2lkdGg6IDVyZW07XG59XG5cbi5tYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHtcbiAgZm9udC12YXJpYXRpb24tc2V0dGluZ3M6IFwiRklMTFwiIDAsIFwid2dodFwiIDQwMCwgXCJHUkFEXCIgMCwgXCJvcHN6XCIgMjQ7XG59XG5cbiNnZXQtY2l0eS1idG4ge1xuICB3aWR0aDogM3JlbTtcbiAgaGVpZ2h0OiAyLjZyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tcmlnaHQ6IDFyZW07XG5cbiAgYm9yZGVyLXJhZGl1czogMCAxcmVtIDFyZW0gMDtcbiAgYm9yZGVyOiBub25lO1xufVxuI2dldC1jaXR5LWJ0bjpob3ZlciB7XG4gIG9wYWNpdHk6IDAuOTtcbn1cblxuI2dldC1jaXR5LWJ0bjphY3RpdmUge1xuICBvcGFjaXR5OiAwLjg7XG59XG5cbiNnZXQtY2l0eS1idG4gc3ZnIHtcbiAgd2lkdGg6IDNyZW07XG59XG5cbi5zZWFyY2gtZm9ybSBsYWJlbCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uc2VhcmNoLWZvcm0gI2NpdHktaW5wdXQge1xuICBoZWlnaHQ6IDIuNHJlbTtcbiAgbWFyZ2luLWxlZnQ6IDFyZW07XG4gIGJvcmRlci1yYWRpdXM6IDFyZW0gMCAwIDFyZW07XG4gIGJvcmRlcjogbm9uZTtcbiAgcGFkZGluZy1sZWZ0OiAxcmVtO1xufVxuXG4uc2VhcmNoLWZvcm0gI2NpdHktaW5wdXQ6Zm9jdXMge1xuICBvdXRsaW5lOiAxcHggc29saWQgYmxhY2s7XG59XG5cbi5sb2FkZXIge1xuICBib3JkZXI6IDAuM3JlbSBzb2xpZCAjZjNmM2YzOyAvKiBMaWdodCBncmV5ICovXG4gIGJvcmRlci10b3A6IDAuM3JlbSBzb2xpZCAjMzQ5OGRiOyAvKiBCbHVlICovXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgd2lkdGg6IDJyZW07XG4gIGhlaWdodDogMnJlbTtcbiAgYW5pbWF0aW9uOiBzcGluIDJzIGxpbmVhciBpbmZpbml0ZTtcbn1cblxuQGtleWZyYW1lcyBzcGluIHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICB9XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG4gIH1cbn1cblxuLmhpZGRlbiB7XG4gIG9wYWNpdHk6IDA7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxnQkFBZ0I7RUFDaEIsc0JBQXNCO0FBQ3hCO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLHVCQUF1Qjs7RUFFdkIsc0NBQXNDO0FBQ3hDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGVBQWU7RUFDZixZQUFZO0VBQ1osbUNBQW1DO0VBQ25DLFdBQVc7RUFDWCxtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG9CQUFvQjtFQUNwQixnQ0FBZ0M7QUFDbEM7O0FBRUE7RUFDRSxTQUFTO0FBQ1g7QUFDQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixxQkFBcUI7RUFDckIsaUJBQWlCO0VBQ2pCLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGFBQWE7RUFDYixTQUFTO0VBQ1Qsb0JBQW9CO0VBQ3BCLGdDQUFnQztFQUNoQyx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsU0FBUztFQUNULHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxTQUFTO0FBQ1g7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGtFQUFrRTtBQUNwRTs7QUFFQTtFQUNFLFdBQVc7RUFDWCxjQUFjO0VBQ2QsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsa0JBQWtCOztFQUVsQiw0QkFBNEI7RUFDNUIsWUFBWTtBQUNkO0FBQ0E7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxpQkFBaUI7RUFDakIsNEJBQTRCO0VBQzVCLFlBQVk7RUFDWixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSx3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSw0QkFBNEIsRUFBRSxlQUFlO0VBQzdDLGdDQUFnQyxFQUFFLFNBQVM7RUFDM0Msa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxZQUFZO0VBQ1osa0NBQWtDO0FBQ3BDOztBQUVBO0VBQ0U7SUFDRSx1QkFBdUI7RUFDekI7RUFDQTtJQUNFLHlCQUF5QjtFQUMzQjtBQUNGOztBQUVBO0VBQ0UsVUFBVTtBQUNaXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjpyb290IHtcXG4gIGZvbnQtc2l6ZTogNjIuNSU7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5ib2R5IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcblxcbiAgZm9udC1mYW1pbHk6IFxcXCJOdW5pdG8gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxufVxcblxcbi53ZWF0aGVyLXdpZGdldCB7XFxuICBwYWRkaW5nOiAycmVtO1xcbiAgZm9udC1zaXplOiAycmVtO1xcbiAgd2lkdGg6IDMwcmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDgwLCAxMTcsIDE4NSk7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJvcmRlci1yYWRpdXM6IDFyZW07XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMXJlbTtcXG59XFxuXFxuLnRvZGF5LWdlbmVyYWwtc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgcGFkZGluZy1ib3R0b206IDFyZW07XFxuICBib3JkZXItYm90dG9tOiAwLjFyZW0gI2ZmZiBzb2xpZDtcXG59XFxuXFxuLmNpdHktYW5kLWN1cnJlbnQtdGVtcGVyYXR1cmUgKiB7XFxuICBtYXJnaW46IDA7XFxufVxcbi5jaXR5LWFuZC1jdXJyZW50LXRlbXBlcmF0dXJlICNjdXJyZW50LXRlbXBlcmF0dXJlIHtcXG4gIGZvbnQtc2l6ZTogNHJlbTtcXG59XFxuXFxuLmhvdXItbnVtYmVyIHtcXG4gIGNvbG9yOiAjY2JkNWUxO1xcbn1cXG5cXG4uaGlnaC1sb3cge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIGdhcDogMC4ycmVtO1xcbn1cXG5cXG4uaGlnaC1sb3cgKiB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi5oaWdoLWxvdyAjaWNvbi1jdXJyZW50LXdlYXRoZXIge1xcbiAgd2lkdGg6IDRyZW07XFxufVxcblxcbi50b2RheS1ob3VybHktc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAxcmVtO1xcbiAgcGFkZGluZy1ib3R0b206IDFyZW07XFxuICBib3JkZXItYm90dG9tOiAwLjFyZW0gI2ZmZiBzb2xpZDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4udG9kYXktaG91cmx5LXNlY3Rpb24gLmhvdXItd2VhdGhlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi50b2RheS1ob3VybHktc2VjdGlvbiAuaG91ci13ZWF0aGVyICoge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4uZGF5cy1zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiAxcmVtO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uZGF5cy1zZWN0aW9uICoge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4uZGF5LXdlYXRoZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDJyZW07XFxufVxcblxcbi5kYXktd2VhdGhlciBwIHNwYW4ge1xcbiAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xcbn1cXG5cXG4uZGF5cy1zZWN0aW9uIGltZyB7XFxuICBoZWlnaHQ6IDRyZW07XFxuICB3aWR0aDogNHJlbTtcXG59XFxuXFxuLmhpZ2hlc3QtdGVtcC1kYXlzIHtcXG4gIGZvbnQtc2l6ZTogMi4xcmVtO1xcbiAgbWFyZ2luLXRvcDogMC43cmVtO1xcbiAgbWFyZ2luLWJvdHRvbTogLTAuNXJlbTtcXG59XFxuXFxuLmxvd2VzdC10ZW1wLWRheXMge1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxufVxcblxcbi5kYXktd2VhdGhlci1jb25kaXRpb24ge1xcbiAgd2lkdGg6IDVyZW07XFxufVxcblxcbi5tYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHtcXG4gIGZvbnQtdmFyaWF0aW9uLXNldHRpbmdzOiBcXFwiRklMTFxcXCIgMCwgXFxcIndnaHRcXFwiIDQwMCwgXFxcIkdSQURcXFwiIDAsIFxcXCJvcHN6XFxcIiAyNDtcXG59XFxuXFxuI2dldC1jaXR5LWJ0biB7XFxuICB3aWR0aDogM3JlbTtcXG4gIGhlaWdodDogMi42cmVtO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1hcmdpbi1yaWdodDogMXJlbTtcXG5cXG4gIGJvcmRlci1yYWRpdXM6IDAgMXJlbSAxcmVtIDA7XFxuICBib3JkZXI6IG5vbmU7XFxufVxcbiNnZXQtY2l0eS1idG46aG92ZXIge1xcbiAgb3BhY2l0eTogMC45O1xcbn1cXG5cXG4jZ2V0LWNpdHktYnRuOmFjdGl2ZSB7XFxuICBvcGFjaXR5OiAwLjg7XFxufVxcblxcbiNnZXQtY2l0eS1idG4gc3ZnIHtcXG4gIHdpZHRoOiAzcmVtO1xcbn1cXG5cXG4uc2VhcmNoLWZvcm0gbGFiZWwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLnNlYXJjaC1mb3JtICNjaXR5LWlucHV0IHtcXG4gIGhlaWdodDogMi40cmVtO1xcbiAgbWFyZ2luLWxlZnQ6IDFyZW07XFxuICBib3JkZXItcmFkaXVzOiAxcmVtIDAgMCAxcmVtO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZy1sZWZ0OiAxcmVtO1xcbn1cXG5cXG4uc2VhcmNoLWZvcm0gI2NpdHktaW5wdXQ6Zm9jdXMge1xcbiAgb3V0bGluZTogMXB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG4ubG9hZGVyIHtcXG4gIGJvcmRlcjogMC4zcmVtIHNvbGlkICNmM2YzZjM7IC8qIExpZ2h0IGdyZXkgKi9cXG4gIGJvcmRlci10b3A6IDAuM3JlbSBzb2xpZCAjMzQ5OGRiOyAvKiBCbHVlICovXFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICB3aWR0aDogMnJlbTtcXG4gIGhlaWdodDogMnJlbTtcXG4gIGFuaW1hdGlvbjogc3BpbiAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcblxcbkBrZXlmcmFtZXMgc3BpbiB7XFxuICAwJSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICB9XFxufVxcblxcbi5oaWRkZW4ge1xcbiAgb3BhY2l0eTogMDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJjcmVhdGVXaWRnZXQiLCJzdHlsZSIsImdldEN1cnJlbnRIb3VyIiwiZGF0ZSIsIkRhdGUiLCJnZXRIb3VycyIsImNpdHkiLCJkcmF3V2VhdGhlciIsImFwaUtleSIsInJlc3BvbnNlIiwiZmV0Y2giLCJkYXRhIiwianNvbiIsImZvcmVjYXN0IiwiZm9yZWNhc3RkYXkiLCJob3VyIiwiaG91cmx5V2VhdGhlciIsIm1hcCIsIndlYXRoZXIiLCJpbmRleCIsImNvbmRpdGlvbiIsInRleHQiLCJpY29uIiwidGVtcGVyYXR1cmUiLCJNYXRoIiwiZmxvb3IiLCJ0ZW1wX2MiLCJkYXlzV2VhdGhlciIsImhpZ2hlc3RUZW1wZXJhdHVyZSIsImRheSIsIm1heHRlbXBfYyIsImxvd2VzdFRlbXBlcmF0dXJlIiwibWludGVtcF9jIiwid2Vla0RheSIsIkludGwiLCJEYXRlVGltZUZvcm1hdCIsIndlZWtkYXkiLCJmb3JtYXQiLCJjaXR5TmFtZSIsImxvY2F0aW9uIiwibmFtZSIsImUiLCJjb25zb2xlIiwibG9nIiwiZmF2aWNvbiIsInNldFRpdGxlIiwidGl0bGUiLCJkb2N1bWVudCIsImRvd25sb2FkRm9udCIsInNldEZhdmljb24iLCJmYXZpY29uSHRtbCIsImhlYWQiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJjcmVhdGVTZWFyY2giLCJoYW5kbGVTZWFyY2giLCJmb3JtIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImZvcm1Jbm5lckh0bWwiLCJpbnB1dCIsInF1ZXJ5U2VsZWN0b3IiLCJsb2FkZXIiLCJhZGRFdmVudExpc3RlbmVyIiwidmFsdWUiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJwcmV2ZW50RGVmYXVsdCIsImNyZWF0ZVRvZGF5R2VuZXJhbFNlY3Rpb24iLCJjdXJyZW50SG91ciIsInJlZHVjZSIsInByZXZNYXgiLCJjdXJXZWF0aGVyIiwibWF4IiwibWluIiwiY3VycmVudFRlbXBlcmF0dXJlIiwidG9kYXlTZWN0aW9uIiwid2VhdGhlckNvbmRpdGlvbiIsImljb25QYXRoIiwidG9kYXlJbm5lckh0bWwiLCJjcmVhdGVIb3VybHlTZWN0aW9uIiwiaG91cmx5U2VjdGlvbiIsInVwcGVyQm91bmRIb3VyIiwiaG91cmx5V2VhdGhlclBhcnQiLCJzbGljZSIsImZvckVhY2giLCJob3VyV2VhdGhlckVsZW1lbnQiLCJob3VyV2VhdGhlcklubmVySHRtbCIsImluc2VydEFkamFjZW50RWxlbWVudCIsImNyZWF0ZURheXNTZWN0aW9uIiwiZGF5c0NvbnRhaW5lciIsImRheUh0bWwiLCJvbGRXaWRnZXQiLCJ3aWRnZXQiLCJ0b2RheUdlbmVyYWxTZWN0aW9uIiwiZGF5c1NlY3Rpb24iLCJib2R5IiwiZm9jdXMiXSwic291cmNlUm9vdCI6IiJ9