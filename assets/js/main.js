const myWeatherApi = "08ffff77c57ae5d317932419d11893df";
const url = "api.openweathermap.org/data/2.5/weather";

const searchBtn = document.querySelector(".search");
const locationOutput = document.querySelector(".location");
const tempOutput = document.querySelector(".temp");
const descOutput = document.querySelector("desc");
const feelOutput = document.querySelector(".feel");
const windOutput = document.querySelector(".wind");
const pressureOutput = document.querySelector(".pressure");
const uvOutput = document.querySelector(".uv");
const humidityOutput = document.querySelector(".humidity");

const regex = /^[a-zA-Z]+$/;
const country = "DE";

// const myWeatherZip = () => {
//     console.log("zip");
// };

searchBtn.addEventListener("click", () => {
    let location = document.querySelector(".input").value;
    console.log(location);

    // if (location === regex) {
    //     myWeatherCity();
    // } else {
    //     myWeatherZip();
    // }
    myWeatherCity(location);
});

// ! holt sich longitude und latitude vom per input und übergibt dann an nächste function

const myWeatherCity = (location) => {
    console.log("city");
    console.log(location);

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}, ${country}&limit=1&appid=${myWeatherApi}`)
        .then((response) => response.json())
        .then((data) => currentWeather(data[0].lon, data[0].lat)) //fetchWeather5Days(data[0].lon,data[0].lat))
        .catch((error) => console.log(error));
};

// ! holt sich die aktuellen wetterdaten

const currentWeather = (lon, lat) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myWeatherApi}&units=metric`)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
};

// ! holt sich die forecast für 5 tage

const fetchWeather5Days = (lon, lat) => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${myWeatherApi}&units=metric`)
        .then((response) => response.json())
        .then((data) => output(data))
        .catch((error) => console.log(error));
};

const output = (data) => {
    console.log(data.list);
    console.log(data.list[0]);
    console.log(data.list[0].main.temp);
    console.log(data.list[0].main.temp.feels_like);
    console.log(data.list[0].main.temp.temp_min);
    console.log(data.list[0].main.temp.temp_max);
    console.log(data.list[0].weather.description);
    console.log(data.list[0].clouds);
    console.log(data.list[0].wind.speed);
};

// ##############leider nicht benötigt!##################

const fahrenheit2Celsius = (fahrenheit) => {
    const celsius = (fahrenheit - 32) * (5 / 9);
    return celsius;
};
