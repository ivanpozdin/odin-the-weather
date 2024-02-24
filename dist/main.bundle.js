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
  gap: 3rem;
  justify-content: center;
}

.days-section * {
  margin: 0;
}

.day-weather {
  display: flex;
  flex-direction: column;
  align-items: center;
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
`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,gBAAgB;EAChB,sBAAsB;AACxB;AACA;EACE,aAAa;EACb,uBAAuB;EACvB,uBAAuB;;EAEvB,sCAAsC;AACxC;;AAEA;EACE,aAAa;EACb,eAAe;EACf,YAAY;EACZ,mCAAmC;EACnC,WAAW;EACX,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,oBAAoB;EACpB,gCAAgC;AAClC;;AAEA;EACE,SAAS;AACX;AACA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,qBAAqB;EACrB,iBAAiB;EACjB,WAAW;AACb;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;EACb,SAAS;EACT,oBAAoB;EACpB,gCAAgC;EAChC,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,aAAa;EACb,SAAS;EACT,uBAAuB;AACzB;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;EAClB,sBAAsB;AACxB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,kEAAkE;AACpE;;AAEA;EACE,WAAW;EACX,cAAc;EACd,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,kBAAkB;;EAElB,4BAA4B;EAC5B,YAAY;AACd;AACA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,cAAc;EACd,iBAAiB;EACjB,4BAA4B;EAC5B,YAAY;EACZ,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,4BAA4B,EAAE,eAAe;EAC7C,gCAAgC,EAAE,SAAS;EAC3C,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kCAAkC;AACpC;;AAEA;EACE;IACE,uBAAuB;EACzB;EACA;IACE,yBAAyB;EAC3B;AACF;;AAEA;EACE,UAAU;AACZ","sourcesContent":[":root {\n  font-size: 62.5%;\n  box-sizing: border-box;\n}\nbody {\n  display: flex;\n  justify-content: center;\n  background-color: black;\n\n  font-family: \"Nunito Sans\", sans-serif;\n}\n\n.weather-widget {\n  padding: 2rem;\n  font-size: 2rem;\n  width: 30rem;\n  background-color: rgb(80, 117, 185);\n  color: #fff;\n  border-radius: 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.today-general-section {\n  display: flex;\n  justify-content: space-between;\n  padding-bottom: 1rem;\n  border-bottom: 0.1rem #fff solid;\n}\n\n.city-and-current-temperature * {\n  margin: 0;\n}\n.city-and-current-temperature #current-temperature {\n  font-size: 4rem;\n}\n\n.high-low {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  font-size: 1.5rem;\n  gap: 0.2rem;\n}\n\n.high-low * {\n  margin: 0;\n}\n\n.high-low #icon-current-weather {\n  width: 4rem;\n}\n\n.today-hourly-section {\n  display: flex;\n  gap: 1rem;\n  padding-bottom: 1rem;\n  border-bottom: 0.1rem #fff solid;\n  justify-content: center;\n}\n\n.today-hourly-section .hour-weather {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.today-hourly-section .hour-weather * {\n  margin: 0;\n}\n\n.days-section {\n  display: flex;\n  gap: 3rem;\n  justify-content: center;\n}\n\n.days-section * {\n  margin: 0;\n}\n\n.day-weather {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.highest-temp-days {\n  font-size: 2.1rem;\n  margin-top: 0.7rem;\n  margin-bottom: -0.5rem;\n}\n\n.lowest-temp-days {\n  font-size: 1.5rem;\n}\n\n.day-weather-condition {\n  width: 5rem;\n}\n\n.material-symbols-outlined {\n  font-variation-settings: \"FILL\" 0, \"wght\" 400, \"GRAD\" 0, \"opsz\" 24;\n}\n\n#get-city-btn {\n  width: 3rem;\n  height: 2.6rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-right: 1rem;\n\n  border-radius: 0 1rem 1rem 0;\n  border: none;\n}\n#get-city-btn:hover {\n  opacity: 0.9;\n}\n\n#get-city-btn:active {\n  opacity: 0.8;\n}\n\n#get-city-btn svg {\n  width: 3rem;\n}\n\n.search-form label {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.search-form #city-input {\n  height: 2.4rem;\n  margin-left: 1rem;\n  border-radius: 1rem 0 0 1rem;\n  border: none;\n  padding-left: 1rem;\n}\n\n.search-form #city-input:focus {\n  outline: 1px solid black;\n}\n\n.loader {\n  border: 0.3rem solid #f3f3f3; /* Light grey */\n  border-top: 0.3rem solid #3498db; /* Blue */\n  border-radius: 50%;\n  width: 2rem;\n  height: 2rem;\n  animation: spin 2s linear infinite;\n}\n\n@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n.hidden {\n  opacity: 0;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0NBQWdDO0FBQ2hDLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTyxnRkFBZ0YsWUFBWSxhQUFhLE1BQU0sS0FBSyxVQUFVLFlBQVksY0FBYyxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxXQUFXLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEs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Q0EscUJBQXFCLDZCQUE2QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ25GYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNqQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRoZS13ZWF0aGVyLy4vc3JjL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10aGUtd2VhdGhlci8uL3NyYy92aWV3L3ZpZXcuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10aGUtd2VhdGhlci8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vb2Rpbi10aGUtd2VhdGhlci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10aGUtd2VhdGhlci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL29kaW4tdGhlLXdlYXRoZXIvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vb2Rpbi10aGUtd2VhdGhlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9vZGluLXRoZS13ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9vZGluLXRoZS13ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL29kaW4tdGhlLXdlYXRoZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10aGUtd2VhdGhlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL29kaW4tdGhlLXdlYXRoZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVXaWRnZXQgfSBmcm9tIFwiLi92aWV3L3ZpZXcuanNcIjtcbmltcG9ydCBzdHlsZSBmcm9tIFwiLi9zdHlsZS5jc3NcIjtcblxuY29uc3QgZ2V0Q3VycmVudEhvdXIgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICByZXR1cm4gZGF0ZS5nZXRIb3VycygpO1xufTtcblxuY29uc3QgY2l0eSA9IFwidGJpbGlzaVwiO1xuXG5jb25zdCBkcmF3V2VhdGhlciA9IGFzeW5jIGZ1bmN0aW9uIChjaXR5KSB7XG4gIGNvbnN0IGFwaUtleSA9IFwiN2RkOWExY2IyMzNiNDIwNWE5NDExMDcxMzIzMjcxMFwiO1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9JHthcGlLZXl9JnE9JHtjaXR5fSZkYXlzPTNgXG4gICAgKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgY29uc3QgZm9yZWNhc3QgPSBbXG4gICAgICAuLi5kYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXIsXG4gICAgICAuLi5kYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzFdLmhvdXIsXG4gICAgXTtcblxuICAgIGNvbnN0IGhvdXJseVdlYXRoZXIgPSBmb3JlY2FzdC5tYXAoKHdlYXRoZXIsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBjb25kaXRpb24gPSB3ZWF0aGVyLmNvbmRpdGlvbi50ZXh0O1xuICAgICAgY29uc3QgaWNvbiA9IHdlYXRoZXIuY29uZGl0aW9uLmljb247XG4gICAgICBjb25zdCB0ZW1wZXJhdHVyZSA9IE1hdGguZmxvb3Iod2VhdGhlci50ZW1wX2MpO1xuICAgICAgY29uc3QgaG91ciA9IGluZGV4ICUgMjQ7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb25kaXRpb24sXG4gICAgICAgIGljb24sXG4gICAgICAgIHRlbXBlcmF0dXJlLFxuICAgICAgICBob3VyLFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGRheXNXZWF0aGVyID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheS5tYXAoKHdlYXRoZXIpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhpZ2hlc3RUZW1wZXJhdHVyZTogTWF0aC5mbG9vcih3ZWF0aGVyLmRheS5tYXh0ZW1wX2MpLFxuICAgICAgICBsb3dlc3RUZW1wZXJhdHVyZTogTWF0aC5mbG9vcih3ZWF0aGVyLmRheS5taW50ZW1wX2MpLFxuICAgICAgICBjb25kaXRpb246IHdlYXRoZXIuZGF5LmNvbmRpdGlvbi50ZXh0LFxuICAgICAgICBpY29uOiB3ZWF0aGVyLmRheS5jb25kaXRpb24uaWNvbixcbiAgICAgICAgd2Vla0RheTogbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoXCJlbi1HQlwiLCB7XG4gICAgICAgICAgd2Vla2RheTogXCJzaG9ydFwiLFxuICAgICAgICB9KS5mb3JtYXQobmV3IERhdGUod2VhdGhlci5kYXRlKSksXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgY29uc3QgY2l0eU5hbWUgPSBkYXRhLmxvY2F0aW9uLm5hbWU7XG4gICAgY3JlYXRlV2lkZ2V0KFxuICAgICAgY2l0eU5hbWUsXG4gICAgICBnZXRDdXJyZW50SG91cigpLFxuICAgICAgaG91cmx5V2VhdGhlcixcbiAgICAgIGRheXNXZWF0aGVyLFxuICAgICAgZHJhd1dlYXRoZXJcbiAgICApO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG4gIH1cbn07XG5cbmRyYXdXZWF0aGVyKGNpdHkpO1xuIiwiaW1wb3J0IGZhdmljb24gZnJvbSBcIi4vZmF2aWNvbi5zdmdcIjtcblxuY29uc3Qgc2V0VGl0bGUgPSBmdW5jdGlvbiAodGl0bGUpIHtcbiAgZG9jdW1lbnQudGl0bGUgPSB0aXRsZTtcbn07XG5jb25zdCBkb3dubG9hZEZvbnQgPSBmdW5jdGlvbiAoKSB7XG4gIGRvY3VtZW50LnN0eWxlID0gYEBpbXBvcnRcbiAgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PU51bml0bytTYW5zOml0YWwsb3Bzeix3Z2h0QDAsNi4uMTIsMjAwLi4xMDAwOzEsNi4uMTIsMjAwLi4xMDAwJmRpc3BsYXk9c3dhcCcpXG4gIDxzdHlsZT5gO1xufTtcbmNvbnN0IHNldEZhdmljb24gPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGZhdmljb25IdG1sID0gYFxuICA8bGluayByZWw9XCJpY29uXCIgdHlwZT1cImltYWdlL3gtaWNvblwiIGhyZWY9XCIke2Zhdmljb259XCI+XG4gIGA7XG4gIGRvY3VtZW50LmhlYWQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGZhdmljb25IdG1sKTtcbn07XG5cbmNvbnN0IGNyZWF0ZVNlYXJjaCA9IGZ1bmN0aW9uIChoYW5kbGVTZWFyY2gpIHtcbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICBmb3JtLmNsYXNzTmFtZSA9IFwic2VhcmNoLWZvcm1cIjtcbiAgY29uc3QgZm9ybUlubmVySHRtbCA9IGBcbiAgPGxhYmVsIGZvcj1cImNpdHktaW5wdXRcIj5cbiAgICA8c3Bhbj5QbGFjZTo8L3NwYW4+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImNpdHlcIiBpZD1cImNpdHktaW5wdXRcIiAvPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGlkPVwiZ2V0LWNpdHktYnRuXCI+XG4gICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIC05NjAgOTYwIDk2MFwiIHdpZHRoPVwiMjRcIj48cGF0aCBkPVwiTTc4NC0xMjAgNTMyLTM3MnEtMzAgMjQtNjkgMzh0LTgzIDE0cS0xMDkgMC0xODQuNS03NS41VDEyMC01ODBxMC0xMDkgNzUuNS0xODQuNVQzODAtODQwcTEwOSAwIDE4NC41IDc1LjVUNjQwLTU4MHEwIDQ0LTE0IDgzdC0zOCA2OWwyNTIgMjUyLTU2IDU2Wk0zODAtNDAwcTc1IDAgMTI3LjUtNTIuNVQ1NjAtNTgwcTAtNzUtNTIuNS0xMjcuNVQzODAtNzYwcS03NSAwLTEyNy41IDUyLjVUMjAwLTU4MHEwIDc1IDUyLjUgMTI3LjVUMzgwLTQwMFpcIi8+PC9zdmc+XG4gICAgPC9idXR0b24+XG4gICAgPGRpdiBjbGFzcz1cImxvYWRlciBoaWRkZW5cIj48L2Rpdj4gXG4gIDwvbGFiZWw+XG4gIGA7XG4gIGZvcm0uaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJiZWdpblwiLCBmb3JtSW5uZXJIdG1sKTtcbiAgY29uc3QgaW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoXCIjY2l0eS1pbnB1dFwiKTtcbiAgY29uc3QgbG9hZGVyID0gZm9ybS5xdWVyeVNlbGVjdG9yKFwiLmxvYWRlclwiKTtcbiAgZm9ybS5xdWVyeVNlbGVjdG9yKFwiI2dldC1jaXR5LWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChpbnB1dC52YWx1ZSA9PT0gXCJcIikgcmV0dXJuO1xuICAgIGxvYWRlci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIGhhbmRsZVNlYXJjaChpbnB1dC52YWx1ZSk7XG4gIH0pO1xuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKGlucHV0LnZhbHVlID09PSBcIlwiKSByZXR1cm47XG4gICAgbG9hZGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgaGFuZGxlU2VhcmNoKGlucHV0LnZhbHVlKTtcbiAgfSk7XG4gIHJldHVybiBmb3JtO1xufTtcblxuY29uc3QgY3JlYXRlVG9kYXlHZW5lcmFsU2VjdGlvbiA9IGZ1bmN0aW9uIChjaXR5LCBjdXJyZW50SG91ciwgaG91cmx5V2VhdGhlcikge1xuICBjb25zdCBoaWdoZXN0VGVtcGVyYXR1cmUgPSBob3VybHlXZWF0aGVyLnJlZHVjZShcbiAgICAocHJldk1heCwgY3VyV2VhdGhlcikgPT4gTWF0aC5tYXgocHJldk1heCwgY3VyV2VhdGhlci50ZW1wZXJhdHVyZSksXG4gICAgLTI3MFxuICApO1xuXG4gIGNvbnN0IGxvd2VzdFRlbXBlcmF0dXJlID0gaG91cmx5V2VhdGhlci5yZWR1Y2UoXG4gICAgKHByZXZNYXgsIGN1cldlYXRoZXIpID0+IE1hdGgubWluKHByZXZNYXgsIGN1cldlYXRoZXIudGVtcGVyYXR1cmUpLFxuICAgIDEwMDBcbiAgKTtcblxuICBjb25zdCBjdXJyZW50VGVtcGVyYXR1cmUgPSBob3VybHlXZWF0aGVyW2N1cnJlbnRIb3VyXS50ZW1wZXJhdHVyZTtcblxuICBjb25zdCB0b2RheVNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0b2RheVNlY3Rpb24uY2xhc3NOYW1lID0gXCJ0b2RheS1nZW5lcmFsLXNlY3Rpb25cIjtcbiAgY29uc3Qgd2VhdGhlckNvbmRpdGlvbiA9IGhvdXJseVdlYXRoZXJbY3VycmVudEhvdXJdLmNvbmRpdGlvbjtcbiAgY29uc3QgaWNvblBhdGggPSBob3VybHlXZWF0aGVyW2N1cnJlbnRIb3VyXS5pY29uO1xuICBjb25zdCB0b2RheUlubmVySHRtbCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwiY2l0eS1hbmQtY3VycmVudC10ZW1wZXJhdHVyZVwiPlxuICAgICAgICAgICAgPHA+JHtjaXR5fTwvcD5cbiAgICAgICAgICAgIDxwIGlkPVwiY3VycmVudC10ZW1wZXJhdHVyZVwiPiR7Y3VycmVudFRlbXBlcmF0dXJlfcKwPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaWdoLWxvd1wiPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBpZD1cImljb24tY3VycmVudC13ZWF0aGVyXCJcbiAgICAgICAgICAgICAgc3JjPVwiJHtpY29uUGF0aH1cIlxuICAgICAgICAgICAgICBhbHQ9XCIke3dlYXRoZXJDb25kaXRpb259XCJcbiAgICAgICAgICAgICAgc3Jjc2V0PVwiXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8cCBpZD1cImN1cnJlbnQtd2VhdGhlci1jb25kaXRpb25cIj4ke3dlYXRoZXJDb25kaXRpb259PC9wPlxuICAgICAgICAgICAgPHA+SDogPHNwYW4+JHtoaWdoZXN0VGVtcGVyYXR1cmV9wrA8L3NwYW4+IEw6IDxzcGFuPiR7bG93ZXN0VGVtcGVyYXR1cmV9wrA8L3NwYW4+PC9wPlxuICAgIDwvZGl2PlxuICBgO1xuICB0b2RheVNlY3Rpb24uaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJiZWdpblwiLCB0b2RheUlubmVySHRtbCk7XG4gIHJldHVybiB0b2RheVNlY3Rpb247XG59O1xuXG5jb25zdCBjcmVhdGVIb3VybHlTZWN0aW9uID0gZnVuY3Rpb24gKGN1cnJlbnRIb3VyLCBob3VybHlXZWF0aGVyKSB7XG4gIGNvbnN0IGhvdXJseVNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBob3VybHlTZWN0aW9uLmNsYXNzTmFtZSA9IFwidG9kYXktaG91cmx5LXNlY3Rpb25cIjtcblxuICBjb25zdCB1cHBlckJvdW5kSG91ciA9IGN1cnJlbnRIb3VyICsgNDtcbiAgY29uc3QgaG91cmx5V2VhdGhlclBhcnQgPSBob3VybHlXZWF0aGVyLnNsaWNlKGN1cnJlbnRIb3VyLCB1cHBlckJvdW5kSG91cik7XG5cbiAgaG91cmx5V2VhdGhlclBhcnQuZm9yRWFjaCgod2VhdGhlcikgPT4ge1xuICAgIGNvbnN0IGhvdXJXZWF0aGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgaG91cldlYXRoZXJFbGVtZW50LmNsYXNzTmFtZSA9IFwiaG91ci13ZWF0aGVyXCI7XG4gICAgY29uc3QgaG91cldlYXRoZXJJbm5lckh0bWwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwiaG91ci1udW1iZXJcIj4ke3dlYXRoZXIuaG91ciA8IDEwID8gXCIwXCIgOiBcIlwifSR7XG4gICAgICB3ZWF0aGVyLmhvdXJcbiAgICB9PC9kaXY+XG4gICAgICAgIDxpbWcgc3JjPVwiJHt3ZWF0aGVyLmljb259XCIgYWx0PVwiJHt3ZWF0aGVyLmNvbmRpdGlvbn1cIiBzcmNzZXQ9XCJcIiAvPlxuICAgICAgPHAgY2xhc3M9XCJob3VyLXRlbXBlcmF0dXJlXCI+JHt3ZWF0aGVyLnRlbXBlcmF0dXJlfcKwPC9wPlxuICAgIGA7XG4gICAgaG91cldlYXRoZXJFbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcImFmdGVyYmVnaW5cIiwgaG91cldlYXRoZXJJbm5lckh0bWwpO1xuICAgIGhvdXJseVNlY3Rpb24uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGhvdXJXZWF0aGVyRWxlbWVudCk7XG4gIH0pO1xuICByZXR1cm4gaG91cmx5U2VjdGlvbjtcbn07XG5cbmNvbnN0IGNyZWF0ZURheXNTZWN0aW9uID0gZnVuY3Rpb24gKGRheXNXZWF0aGVyKSB7XG4gIGNvbnN0IGRheXNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBkYXlzQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwiZGF5cy1zZWN0aW9uXCI7XG4gIGRheXNXZWF0aGVyLmZvckVhY2goKHdlYXRoZXIpID0+IHtcbiAgICBjb25zdCBkYXlIdG1sID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImRheS13ZWF0aGVyXCI+XG4gICAgICAgIDxwIGNsYXNzPVwid2Vlay1kYXktbmFtZVwiPiR7d2VhdGhlci53ZWVrRGF5fTwvcD5cbiAgICAgICAgPHAgY2xhc3M9XCJoaWdoZXN0LXRlbXAtZGF5c1wiPiR7d2VhdGhlci5oaWdoZXN0VGVtcGVyYXR1cmV9wrA8L3A+XG4gICAgICAgIDxpbWcgc3JjPVwiJHt3ZWF0aGVyLmljb259XCIgYWx0PVwiJHt3ZWF0aGVyLmNvbmRpdGlvbn1cIj5cbiAgICAgICAgPHAgY2xhc3M9XCJsb3dlc3QtdGVtcC1kYXlzXCI+JHt3ZWF0aGVyLmxvd2VzdFRlbXBlcmF0dXJlfcKwPC9wPlxuICAgICAgICBcbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gICAgZGF5c0NvbnRhaW5lci5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgZGF5SHRtbCk7XG4gIH0pO1xuICAvLyA8cCBjbGFzcz1cImRheS13ZWF0aGVyLWNvbmRpdGlvblwiPiR7d2VhdGhlci5jb25kaXRpb259PC9wPlxuICByZXR1cm4gZGF5c0NvbnRhaW5lcjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXaWRnZXQoXG4gIGNpdHksXG4gIGN1cnJlbnRIb3VyLFxuICBob3VybHlXZWF0aGVyLFxuICBkYXlzV2VhdGhlcixcbiAgaGFuZGxlU2VhcmNoXG4pIHtcbiAgc2V0VGl0bGUoXCJ0aGUgd2VhdGhlci4uLlwiKTtcbiAgZG93bmxvYWRGb250KCk7XG4gIHNldEZhdmljb24oKTtcbiAgY29uc3Qgb2xkV2lkZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLXdpZGdldFwiKTtcbiAgaWYgKG9sZFdpZGdldCkgb2xkV2lkZ2V0LnJlbW92ZSgpO1xuICBjb25zdCB3aWRnZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB3aWRnZXQuY2xhc3NOYW1lID0gXCJ3ZWF0aGVyLXdpZGdldFwiO1xuXG4gIGNvbnN0IGZvcm0gPSBjcmVhdGVTZWFyY2goaGFuZGxlU2VhcmNoKTtcblxuICBjb25zdCB0b2RheUdlbmVyYWxTZWN0aW9uID0gY3JlYXRlVG9kYXlHZW5lcmFsU2VjdGlvbihcbiAgICBjaXR5LFxuICAgIGN1cnJlbnRIb3VyLFxuICAgIGhvdXJseVdlYXRoZXJcbiAgKTtcblxuICBjb25zdCBob3VybHlTZWN0aW9uID0gY3JlYXRlSG91cmx5U2VjdGlvbihjdXJyZW50SG91ciwgaG91cmx5V2VhdGhlcik7XG5cbiAgY29uc3QgZGF5c1NlY3Rpb24gPSBjcmVhdGVEYXlzU2VjdGlvbihkYXlzV2VhdGhlcik7XG5cbiAgd2lkZ2V0Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBmb3JtKTtcbiAgd2lkZ2V0Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCB0b2RheUdlbmVyYWxTZWN0aW9uKTtcbiAgd2lkZ2V0Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBob3VybHlTZWN0aW9uKTtcbiAgd2lkZ2V0Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBkYXlzU2VjdGlvbik7XG4gIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHdpZGdldCk7XG4gIHdpZGdldC5xdWVyeVNlbGVjdG9yKFwiI2NpdHktaW5wdXRcIikuZm9jdXMoKTtcbn1cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGA6cm9vdCB7XG4gIGZvbnQtc2l6ZTogNjIuNSU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5ib2R5IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xuXG4gIGZvbnQtZmFtaWx5OiBcIk51bml0byBTYW5zXCIsIHNhbnMtc2VyaWY7XG59XG5cbi53ZWF0aGVyLXdpZGdldCB7XG4gIHBhZGRpbmc6IDJyZW07XG4gIGZvbnQtc2l6ZTogMnJlbTtcbiAgd2lkdGg6IDMwcmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoODAsIDExNywgMTg1KTtcbiAgY29sb3I6ICNmZmY7XG4gIGJvcmRlci1yYWRpdXM6IDFyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMXJlbTtcbn1cblxuLnRvZGF5LWdlbmVyYWwtc2VjdGlvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgcGFkZGluZy1ib3R0b206IDFyZW07XG4gIGJvcmRlci1ib3R0b206IDAuMXJlbSAjZmZmIHNvbGlkO1xufVxuXG4uY2l0eS1hbmQtY3VycmVudC10ZW1wZXJhdHVyZSAqIHtcbiAgbWFyZ2luOiAwO1xufVxuLmNpdHktYW5kLWN1cnJlbnQtdGVtcGVyYXR1cmUgI2N1cnJlbnQtdGVtcGVyYXR1cmUge1xuICBmb250LXNpemU6IDRyZW07XG59XG5cbi5oaWdoLWxvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgZm9udC1zaXplOiAxLjVyZW07XG4gIGdhcDogMC4ycmVtO1xufVxuXG4uaGlnaC1sb3cgKiB7XG4gIG1hcmdpbjogMDtcbn1cblxuLmhpZ2gtbG93ICNpY29uLWN1cnJlbnQtd2VhdGhlciB7XG4gIHdpZHRoOiA0cmVtO1xufVxuXG4udG9kYXktaG91cmx5LXNlY3Rpb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDFyZW07XG4gIHBhZGRpbmctYm90dG9tOiAxcmVtO1xuICBib3JkZXItYm90dG9tOiAwLjFyZW0gI2ZmZiBzb2xpZDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi50b2RheS1ob3VybHktc2VjdGlvbiAuaG91ci13ZWF0aGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnRvZGF5LWhvdXJseS1zZWN0aW9uIC5ob3VyLXdlYXRoZXIgKiB7XG4gIG1hcmdpbjogMDtcbn1cblxuLmRheXMtc2VjdGlvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogM3JlbTtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5kYXlzLXNlY3Rpb24gKiB7XG4gIG1hcmdpbjogMDtcbn1cblxuLmRheS13ZWF0aGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmhpZ2hlc3QtdGVtcC1kYXlzIHtcbiAgZm9udC1zaXplOiAyLjFyZW07XG4gIG1hcmdpbi10b3A6IDAuN3JlbTtcbiAgbWFyZ2luLWJvdHRvbTogLTAuNXJlbTtcbn1cblxuLmxvd2VzdC10ZW1wLWRheXMge1xuICBmb250LXNpemU6IDEuNXJlbTtcbn1cblxuLmRheS13ZWF0aGVyLWNvbmRpdGlvbiB7XG4gIHdpZHRoOiA1cmVtO1xufVxuXG4ubWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB7XG4gIGZvbnQtdmFyaWF0aW9uLXNldHRpbmdzOiBcIkZJTExcIiAwLCBcIndnaHRcIiA0MDAsIFwiR1JBRFwiIDAsIFwib3BzelwiIDI0O1xufVxuXG4jZ2V0LWNpdHktYnRuIHtcbiAgd2lkdGg6IDNyZW07XG4gIGhlaWdodDogMi42cmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xuXG4gIGJvcmRlci1yYWRpdXM6IDAgMXJlbSAxcmVtIDA7XG4gIGJvcmRlcjogbm9uZTtcbn1cbiNnZXQtY2l0eS1idG46aG92ZXIge1xuICBvcGFjaXR5OiAwLjk7XG59XG5cbiNnZXQtY2l0eS1idG46YWN0aXZlIHtcbiAgb3BhY2l0eTogMC44O1xufVxuXG4jZ2V0LWNpdHktYnRuIHN2ZyB7XG4gIHdpZHRoOiAzcmVtO1xufVxuXG4uc2VhcmNoLWZvcm0gbGFiZWwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLnNlYXJjaC1mb3JtICNjaXR5LWlucHV0IHtcbiAgaGVpZ2h0OiAyLjRyZW07XG4gIG1hcmdpbi1sZWZ0OiAxcmVtO1xuICBib3JkZXItcmFkaXVzOiAxcmVtIDAgMCAxcmVtO1xuICBib3JkZXI6IG5vbmU7XG4gIHBhZGRpbmctbGVmdDogMXJlbTtcbn1cblxuLnNlYXJjaC1mb3JtICNjaXR5LWlucHV0OmZvY3VzIHtcbiAgb3V0bGluZTogMXB4IHNvbGlkIGJsYWNrO1xufVxuXG4ubG9hZGVyIHtcbiAgYm9yZGVyOiAwLjNyZW0gc29saWQgI2YzZjNmMzsgLyogTGlnaHQgZ3JleSAqL1xuICBib3JkZXItdG9wOiAwLjNyZW0gc29saWQgIzM0OThkYjsgLyogQmx1ZSAqL1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIHdpZHRoOiAycmVtO1xuICBoZWlnaHQ6IDJyZW07XG4gIGFuaW1hdGlvbjogc3BpbiAycyBsaW5lYXIgaW5maW5pdGU7XG59XG5cbkBrZXlmcmFtZXMgc3BpbiB7XG4gIDAlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgfVxuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xuICB9XG59XG5cbi5oaWRkZW4ge1xuICBvcGFjaXR5OiAwO1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsZ0JBQWdCO0VBQ2hCLHNCQUFzQjtBQUN4QjtBQUNBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtFQUN2Qix1QkFBdUI7O0VBRXZCLHNDQUFzQztBQUN4Qzs7QUFFQTtFQUNFLGFBQWE7RUFDYixlQUFlO0VBQ2YsWUFBWTtFQUNaLG1DQUFtQztFQUNuQyxXQUFXO0VBQ1gsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsU0FBUztBQUNYOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixvQkFBb0I7RUFDcEIsZ0NBQWdDO0FBQ2xDOztBQUVBO0VBQ0UsU0FBUztBQUNYO0FBQ0E7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixxQkFBcUI7RUFDckIsaUJBQWlCO0VBQ2pCLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGFBQWE7RUFDYixTQUFTO0VBQ1Qsb0JBQW9CO0VBQ3BCLGdDQUFnQztFQUNoQyx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGFBQWE7RUFDYixTQUFTO0VBQ1QsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsU0FBUztBQUNYOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGtFQUFrRTtBQUNwRTs7QUFFQTtFQUNFLFdBQVc7RUFDWCxjQUFjO0VBQ2QsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsa0JBQWtCOztFQUVsQiw0QkFBNEI7RUFDNUIsWUFBWTtBQUNkO0FBQ0E7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxpQkFBaUI7RUFDakIsNEJBQTRCO0VBQzVCLFlBQVk7RUFDWixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSx3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSw0QkFBNEIsRUFBRSxlQUFlO0VBQzdDLGdDQUFnQyxFQUFFLFNBQVM7RUFDM0Msa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxZQUFZO0VBQ1osa0NBQWtDO0FBQ3BDOztBQUVBO0VBQ0U7SUFDRSx1QkFBdUI7RUFDekI7RUFDQTtJQUNFLHlCQUF5QjtFQUMzQjtBQUNGOztBQUVBO0VBQ0UsVUFBVTtBQUNaXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjpyb290IHtcXG4gIGZvbnQtc2l6ZTogNjIuNSU7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5ib2R5IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcblxcbiAgZm9udC1mYW1pbHk6IFxcXCJOdW5pdG8gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxufVxcblxcbi53ZWF0aGVyLXdpZGdldCB7XFxuICBwYWRkaW5nOiAycmVtO1xcbiAgZm9udC1zaXplOiAycmVtO1xcbiAgd2lkdGg6IDMwcmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDgwLCAxMTcsIDE4NSk7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJvcmRlci1yYWRpdXM6IDFyZW07XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMXJlbTtcXG59XFxuXFxuLnRvZGF5LWdlbmVyYWwtc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgcGFkZGluZy1ib3R0b206IDFyZW07XFxuICBib3JkZXItYm90dG9tOiAwLjFyZW0gI2ZmZiBzb2xpZDtcXG59XFxuXFxuLmNpdHktYW5kLWN1cnJlbnQtdGVtcGVyYXR1cmUgKiB7XFxuICBtYXJnaW46IDA7XFxufVxcbi5jaXR5LWFuZC1jdXJyZW50LXRlbXBlcmF0dXJlICNjdXJyZW50LXRlbXBlcmF0dXJlIHtcXG4gIGZvbnQtc2l6ZTogNHJlbTtcXG59XFxuXFxuLmhpZ2gtbG93IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICBnYXA6IDAuMnJlbTtcXG59XFxuXFxuLmhpZ2gtbG93ICoge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4uaGlnaC1sb3cgI2ljb24tY3VycmVudC13ZWF0aGVyIHtcXG4gIHdpZHRoOiA0cmVtO1xcbn1cXG5cXG4udG9kYXktaG91cmx5LXNlY3Rpb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMXJlbTtcXG4gIHBhZGRpbmctYm90dG9tOiAxcmVtO1xcbiAgYm9yZGVyLWJvdHRvbTogMC4xcmVtICNmZmYgc29saWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLnRvZGF5LWhvdXJseS1zZWN0aW9uIC5ob3VyLXdlYXRoZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4udG9kYXktaG91cmx5LXNlY3Rpb24gLmhvdXItd2VhdGhlciAqIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuLmRheXMtc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAzcmVtO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5kYXlzLXNlY3Rpb24gKiB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi5kYXktd2VhdGhlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5oaWdoZXN0LXRlbXAtZGF5cyB7XFxuICBmb250LXNpemU6IDIuMXJlbTtcXG4gIG1hcmdpbi10b3A6IDAuN3JlbTtcXG4gIG1hcmdpbi1ib3R0b206IC0wLjVyZW07XFxufVxcblxcbi5sb3dlc3QtdGVtcC1kYXlzIHtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbn1cXG5cXG4uZGF5LXdlYXRoZXItY29uZGl0aW9uIHtcXG4gIHdpZHRoOiA1cmVtO1xcbn1cXG5cXG4ubWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB7XFxuICBmb250LXZhcmlhdGlvbi1zZXR0aW5nczogXFxcIkZJTExcXFwiIDAsIFxcXCJ3Z2h0XFxcIiA0MDAsIFxcXCJHUkFEXFxcIiAwLCBcXFwib3BzelxcXCIgMjQ7XFxufVxcblxcbiNnZXQtY2l0eS1idG4ge1xcbiAgd2lkdGg6IDNyZW07XFxuICBoZWlnaHQ6IDIuNnJlbTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBtYXJnaW4tcmlnaHQ6IDFyZW07XFxuXFxuICBib3JkZXItcmFkaXVzOiAwIDFyZW0gMXJlbSAwO1xcbiAgYm9yZGVyOiBub25lO1xcbn1cXG4jZ2V0LWNpdHktYnRuOmhvdmVyIHtcXG4gIG9wYWNpdHk6IDAuOTtcXG59XFxuXFxuI2dldC1jaXR5LWJ0bjphY3RpdmUge1xcbiAgb3BhY2l0eTogMC44O1xcbn1cXG5cXG4jZ2V0LWNpdHktYnRuIHN2ZyB7XFxuICB3aWR0aDogM3JlbTtcXG59XFxuXFxuLnNlYXJjaC1mb3JtIGxhYmVsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5zZWFyY2gtZm9ybSAjY2l0eS1pbnB1dCB7XFxuICBoZWlnaHQ6IDIuNHJlbTtcXG4gIG1hcmdpbi1sZWZ0OiAxcmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMXJlbSAwIDAgMXJlbTtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBhZGRpbmctbGVmdDogMXJlbTtcXG59XFxuXFxuLnNlYXJjaC1mb3JtICNjaXR5LWlucHV0OmZvY3VzIHtcXG4gIG91dGxpbmU6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLmxvYWRlciB7XFxuICBib3JkZXI6IDAuM3JlbSBzb2xpZCAjZjNmM2YzOyAvKiBMaWdodCBncmV5ICovXFxuICBib3JkZXItdG9wOiAwLjNyZW0gc29saWQgIzM0OThkYjsgLyogQmx1ZSAqL1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgd2lkdGg6IDJyZW07XFxuICBoZWlnaHQ6IDJyZW07XFxuICBhbmltYXRpb246IHNwaW4gMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHNwaW4ge1xcbiAgMCUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gIH1cXG4gIDEwMCUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcbiAgfVxcbn1cXG5cXG4uaGlkZGVuIHtcXG4gIG9wYWNpdHk6IDA7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsiY3JlYXRlV2lkZ2V0Iiwic3R5bGUiLCJnZXRDdXJyZW50SG91ciIsImRhdGUiLCJEYXRlIiwiZ2V0SG91cnMiLCJjaXR5IiwiZHJhd1dlYXRoZXIiLCJhcGlLZXkiLCJyZXNwb25zZSIsImZldGNoIiwiZGF0YSIsImpzb24iLCJmb3JlY2FzdCIsImZvcmVjYXN0ZGF5IiwiaG91ciIsImhvdXJseVdlYXRoZXIiLCJtYXAiLCJ3ZWF0aGVyIiwiaW5kZXgiLCJjb25kaXRpb24iLCJ0ZXh0IiwiaWNvbiIsInRlbXBlcmF0dXJlIiwiTWF0aCIsImZsb29yIiwidGVtcF9jIiwiZGF5c1dlYXRoZXIiLCJoaWdoZXN0VGVtcGVyYXR1cmUiLCJkYXkiLCJtYXh0ZW1wX2MiLCJsb3dlc3RUZW1wZXJhdHVyZSIsIm1pbnRlbXBfYyIsIndlZWtEYXkiLCJJbnRsIiwiRGF0ZVRpbWVGb3JtYXQiLCJ3ZWVrZGF5IiwiZm9ybWF0IiwiY2l0eU5hbWUiLCJsb2NhdGlvbiIsIm5hbWUiLCJlIiwiY29uc29sZSIsImxvZyIsImZhdmljb24iLCJzZXRUaXRsZSIsInRpdGxlIiwiZG9jdW1lbnQiLCJkb3dubG9hZEZvbnQiLCJzZXRGYXZpY29uIiwiZmF2aWNvbkh0bWwiLCJoZWFkIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiY3JlYXRlU2VhcmNoIiwiaGFuZGxlU2VhcmNoIiwiZm9ybSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJmb3JtSW5uZXJIdG1sIiwiaW5wdXQiLCJxdWVyeVNlbGVjdG9yIiwibG9hZGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsInZhbHVlIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwicHJldmVudERlZmF1bHQiLCJjcmVhdGVUb2RheUdlbmVyYWxTZWN0aW9uIiwiY3VycmVudEhvdXIiLCJyZWR1Y2UiLCJwcmV2TWF4IiwiY3VyV2VhdGhlciIsIm1heCIsIm1pbiIsImN1cnJlbnRUZW1wZXJhdHVyZSIsInRvZGF5U2VjdGlvbiIsIndlYXRoZXJDb25kaXRpb24iLCJpY29uUGF0aCIsInRvZGF5SW5uZXJIdG1sIiwiY3JlYXRlSG91cmx5U2VjdGlvbiIsImhvdXJseVNlY3Rpb24iLCJ1cHBlckJvdW5kSG91ciIsImhvdXJseVdlYXRoZXJQYXJ0Iiwic2xpY2UiLCJmb3JFYWNoIiwiaG91cldlYXRoZXJFbGVtZW50IiwiaG91cldlYXRoZXJJbm5lckh0bWwiLCJpbnNlcnRBZGphY2VudEVsZW1lbnQiLCJjcmVhdGVEYXlzU2VjdGlvbiIsImRheXNDb250YWluZXIiLCJkYXlIdG1sIiwib2xkV2lkZ2V0Iiwid2lkZ2V0IiwidG9kYXlHZW5lcmFsU2VjdGlvbiIsImRheXNTZWN0aW9uIiwiYm9keSIsImZvY3VzIl0sInNvdXJjZVJvb3QiOiIifQ==