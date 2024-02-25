const myWeatherApi = "08ffff77c57ae5d317932419d11893df";
const url = "api.openweathermap.org/data/2.5/weather";

const wrapper = document.querySelector(".wrapper");

const searchBtn = document.querySelector(".fa-magnifying-glass");
const moreBtn = document.querySelector(".more");

const innerContainer = document.querySelector(".innerContainer");
const form = document.querySelector("form");

const topOutput = document.querySelector(".top");
const date = document.querySelector(".date");
const locationOutput = document.querySelector(".location");
const tempOutput = document.querySelector(".temp");
const country = document.querySelector(".country");
const weather = document.querySelector(".weather");
const city = document.querySelector(".city");

const descOutput = document.querySelector("desc");
const feelOutput = document.querySelector(".feel");
const windOutput = document.querySelector(".wind");
const pressureOutput = document.querySelector(".pressure");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const minMax = document.querySelector(".minMax");
const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");
const minTemp = document.querySelector(".minTemp");
const maxTemp = document.querySelector(".maxTemp");

const more = document.querySelector(".moreDiv");

const fiveDays = document.querySelector(".fiveDays");
const day1 = document.querySelector(".day1");
const day2 = document.querySelector(".day2");
const day3 = document.querySelector(".day3");
const day4 = document.querySelector(".day4");
const day5 = document.querySelector(".day5");

// EventListener für search button
const startCity = "Oedheim";

form.addEventListener("submit", (event) => {
    event.preventDefault();
    fiveDays.style.display = "none";
    let location = document.querySelector(".input").value;

    if (isNaN(location) === false) {
        alert();
        return;
    } else {
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
        })
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
    
    <h2>${calcSunriseSet(data.list[7].dt).toLocaleDateString("en", optionsDay)} </h2> <img src="${iconURLPre}${data.list[7].weather[0].icon}${iconURLPost}">  <h3>${Math.round(data.list[7].main.temp)}°C </h3> 
    `;
    day2.innerHTML = `
    <h2>${calcSunriseSet(data.list[15].dt).toLocaleDateString("en", optionsDay)}</h2> <img src="${iconURLPre}${data.list[15].weather[0].icon}${iconURLPost}"> <h3>${Math.round(data.list[15].main.temp)}°C</h3>  
    `;
    day3.innerHTML = `
    <h2>${calcSunriseSet(data.list[23].dt).toLocaleDateString("en", optionsDay)}</h2> <img src="${iconURLPre}${data.list[23].weather[0].icon}${iconURLPost}"> <h3>${Math.round(data.list[23].main.temp)}°C</h3>  
    `;
    day4.innerHTML = `
    <h2>${calcSunriseSet(data.list[31].dt).toLocaleDateString("en", optionsDay)}</h2> <img src="${iconURLPre}${data.list[31].weather[0].icon}${iconURLPost}"> <h3>${Math.round(data.list[31].main.temp)}°C</h3>  
    `;
    day5.innerHTML = `
    <h2>${calcSunriseSet(data.list[39].dt).toLocaleDateString("en", optionsDay)}</h2> <img src="${iconURLPre}${data.list[39].weather[0].icon}${iconURLPost}"> <h3>${Math.round(data.list[39].main.temp)}°C</h3>  
    `;
};

const iconURLPre = `https://openweathermap.org/img/wn/`;
const iconURLPost = "@2x.png";

const output = (data) => {
    date.innerHTML = `${calcSunriseSet(data.dt).toLocaleDateString("en", options)} | ${calcSunriseSetLocaleTime(data.dt, data.timezone)}`;
    topOutput.innerHTML = ` <img src="${iconURLPre}${data.weather[0].icon}${iconURLPost}">`;
    weather.innerHTML = `${data.weather[0].description}`;
    city.innerHTML = `${data.name}`;
    country.innerHTML = `${data.sys.country}`;
    tempOutput.innerHTML = `${Math.round(data.main.temp)}°C`;
    feelOutput.innerHTML = `Feels like: <span class=feelsLike>${Math.round(data.main.feels_like)}°C</span>`;
    minTemp.innerHTML = `<h3><i class="fa-solid fa-temperature-arrow-down"></i> ${Math.round(data.main.temp_min)}°C </h3>`;
    maxTemp.innerHTML = `<h3><i class="fa-solid fa-temperature-arrow-up"></i> ${Math.round(data.main.temp_max)}°C</h3>`;
    sunrise.innerHTML = ` <i class="fa-regular fa-sun"></i> <i class="fa-solid fa-arrow-up"></i> ${calcSunriseSetLocaleTime(data.sys.sunrise, data.timezone)}`;
    sunset.innerHTML = ` <i class="fa-regular fa-sun"></i> <i class="fa-solid fa-arrow-down"></i> ${calcSunriseSetLocaleTime(data.sys.sunset, data.timezone)}`;
    windOutput.innerHTML = `<i class="fa-solid fa-wind"></i>  ${Math.round(data.wind.speed) * 3.6} km/h`;
    cloudOutput.innerHTML = `<i class="fa-solid fa-cloud"></i>  ${data.clouds.all}%`;
    humidityOutput.innerHTML = `<i class="fa-solid fa-droplet"></i>  ${data.main.humidity}%`;
    pressureOutput.innerHTML = `<i class="fa-solid fa-gauge-high"></i>  ${data.main.pressure} hPa`;
    moreBtn.style.display = "block";
    // innerContainer.innerHTML += `<p class="footer">&copy; Michael Gee - not a designer, but a programmer</p>`;
};

const calcSunriseSet = (time) => {
    let result = new Date(time * 1000);
    return result;
};

const calcSunriseSetLocaleTime = (time, timeZone) => {
    let localResult = new Date((time + timeZone) * 1000);
    let hours = localResult.getUTCHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = localResult.getUTCMinutes();
    if (minutes < 10) {
        minutes = `${minutes}0`;
    }
    let seconds = localResult.getUTCSeconds();
    if (seconds < 10) {
        seconds = `${seconds}0`;
    }
    let final = `${hours}:${minutes}:${seconds}`;
    return final;
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
// ###########################

// function capitalize(word) {
//     const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
//     return capitalizedWord;
// }
