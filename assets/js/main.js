const myWeatherApi = "08ffff77c57ae5d317932419d11893df";
const url = "api.openweathermap.org/data/2.5/weather";

const searchBtn = document.querySelector(".fa-magnifying-glass");
const moreBtn = document.querySelector(".more");

const form = document.querySelector("form");

const topOutput = document.querySelector(".top");
const date = document.querySelector(".date");
const locationOutput = document.querySelector(".location");
const tempOutput = document.querySelector(".temp");
const country = document.querySelector(".country");
const weather = document.querySelector(".weather");

const descOutput = document.querySelector("desc");
const feelOutput = document.querySelector(".feel");
const windOutput = document.querySelector(".wind");
const pressureOutput = document.querySelector(".pressure");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");

const more = document.querySelector(".moreDiv");

const fiveDays = document.querySelector(".fiveDays");
const day1 = document.querySelector(".day1");
const day2 = document.querySelector(".day2");
const day3 = document.querySelector(".day3");
const day4 = document.querySelector(".day4");
const day5 = document.querySelector(".day5");

// EventListener für search button
const startCity = "Berlin";

form.addEventListener("submit", (event) => {
    event.preventDefault();
    fiveDays.style.display = "none";
    let location = document.querySelector(".input").value;
    if (isNaN(location) === false) {
        alert();
        return;
    } else {
        // console.log(location);
        myWeatherCity(location);
    }
});

// Eventlistener für 5 days button

moreBtn.addEventListener("click", () => {
    fiveDays.style.display = "block ";
});

// ! holt sich longitude und latitude von input und übergibt dann an nächste function

const myWeatherCity = (location) => {
    // console.log("city");
    // console.log(location);

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${myWeatherApi}`)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);

            if (data.length === 0) {
                alert("Invalid input");
                return;
            }
            currentWeather(data[0].lon, data[0].lat);
        }) //fetchWeather5Days(data[0].lon,data[0].lat))
        .catch((error) => console.log(error));
};
myWeatherCity(startCity);

// ! holt sich die aktuellen wetterdaten

const currentWeather = (lon, lat) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myWeatherApi}&units=metric`)
        .then((response) => response.json())
        .then((data) => {
            output(data);
            console.log(data);
        })
        .catch((error) => console.log(error));

    fetchWeather5Days(lon, lat);
};

// ! holt sich die forecast für 5 tage

const fetchWeather5Days = (lon, lat) => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${myWeatherApi}&units=metric`)
        .then((response) => response.json())
        .then((data) => outputForecast(data)) //

        .catch((error) => console.log(error));
};

const outputForecast = (data) => {
    console.log(data);
    day1.innerHTML = `
    
    ${calcSunriseSet(data.list[7].dt).toLocaleDateString("en", optionsDay)} Temperature: ${Math.round(data.list[7].main.temp)}°C
    `;
    day2.innerHTML = `
    ${calcSunriseSet(data.list[15].dt).toLocaleDateString("en", optionsDay)} Temperature: ${Math.round(data.list[15].main.temp)}°C
    `;
    day3.innerHTML = `
    ${calcSunriseSet(data.list[23].dt).toLocaleDateString("en", optionsDay)} Temperature: ${Math.round(data.list[23].main.temp)}°C
    `;
    day4.innerHTML = `
    ${calcSunriseSet(data.list[31].dt).toLocaleDateString("en", optionsDay)} Temperature: ${Math.round(data.list[31].main.temp)}°C
    `;
    day5.innerHTML = `
    ${calcSunriseSet(data.list[39].dt).toLocaleDateString("en", optionsDay)} Temperature: ${Math.round(data.list[39].main.temp)}°C
    `;
};

const iconURLPre = `https://openweathermap.org/img/wn/`;
const iconURLPost = "@2x.png";

const output = (data) => {
    date.innerHTML = `${calcSunriseSet(data.dt).toLocaleDateString("en", options)}`;
    topOutput.innerHTML = ` <img src="${iconURLPre}${data.weather[0].icon}${iconURLPost}">`;
    weather.innerHTML = `${data.weather[0].description}`;
    country.innerHTML = `${data.sys.country}`;
    tempOutput.innerHTML = `${Math.round(data.main.temp)}°C`;
    feelOutput.innerHTML = `Feels like: ${Math.round(data.main.feels_like)}°C`;
    sunrise.innerHTML = `Sunrise: ${calcSunriseSet(data.sys.sunrise).toLocaleTimeString("en")}`;
    sunset.innerHTML = `Sunset: ${calcSunriseSet(data.sys.sunset).toLocaleTimeString("en")}`;
    windOutput.innerHTML = `Wind: ${data.wind.speed}m/s`;
    cloudOutput.innerHTML = `Clouds: ${data.clouds.all}%`;
    humidityOutput.innerHTML = `Humidity: ${data.main.humidity}%`;
    pressureOutput.innerHTML = `Pressure: ${data.main.pressure}hPa`;
    moreBtn.style.display = "block";
};

const calcSunriseSet = (time) => {
    let result = new Date(time * 1000);
    return result;
};
// ###########################
const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
};
// #############################
const optionsDay = {
    weekday: "long",
};
