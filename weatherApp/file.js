const API = '9e59e6d820dd438af0f4fb7386b27b5a';
const URL = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById("city-input");
const btnSearch = document.getElementById("search-btn");
const weatherCard = document.getElementById("weather-card");
const loading = document.getElementById("loading");
const errorMsg = document.getElementById("error-message");

const countryBlock = document.querySelector('.country');
const cityBlock = document.querySelector('.city');
const temperatureBlock = document.querySelector('.temperature');
const descriptionBlock = document.querySelector('.weather-description');
const iconBlock = document.getElementById('weather-icon');
const humidityBlock = document.getElementById('humidity');
const windBlock = document.getElementById('wind');
const feelsLikeBlock = document.getElementById('feelsLike');

async function getWeather(city) {
    try {
        showElement(loading)
        hideElement(weatherCard)
        hideElement(errorMsg)

        const response = await fetch(`${URL}?q=${city}&appid=${API}&units=metric`)

        if (!response.ok) {
            throw new Error("City not found :(")
        }

        const data = await response.json();

        updateUIData(data)
    } catch (error) {
        showError(errorMsg)
        console.log(error);
    } finally {
        hideElement(loading)
    }
}

function updateUIData(data) {
    countryBlock.textContent = `${data.sys.country}`;
    cityBlock.textContent = `${data.name}`;
    temperatureBlock.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionBlock.textContent = `${data.weather[0].description}`;
    humidityBlock.textContent = `${data.main.humidity}%`;
    windBlock.textContent = `${data.wind.speed} m/s`;
    feelsLikeBlock.textContent = `${Math.round(data.main.feels_like)}°C`;

    const iconCode = data.weather[0].icon;
    iconBlock.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconBlock.aly = data.weather[0].description;

    const weatherType = data.weather[0].main;
    setWeatherTheme(weatherType)

    showElement(weatherCard)
}

function hideElement(elem) {
    return elem.style.display = "none";
}

function showElement(elem) {
    return elem.style.display = "block";
}

function showError() {
    showElement(errorMsg)
    hideElement(weatherCard)
}

btnSearch.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city)
    }
})

cityInput.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city)
        }
    }
})

window.addEventListener('DOMContentLoaded', () => {
    getWeather('Novosibirsk')
})

const weatherThemes = {
    'Clear': { class: 'clear', types: ['Clear'] },
    'Clouds': { class: 'clouds', types: ['Clouds'] },
    'Rain': { class: 'rain', types: ['Rain', 'Drizzle'] },
    'Snow': { class: 'snow', types: ['Snow'] },
    'Thunderstorm': { class: 'thunderstorm', types: ['Thunderstorm'] },
    'Mist': { class: 'mist', types: ['Mist', 'Fog', 'Haze'] }
};

function setWeatherTheme(type) {
    const elements = [
        { element: weatherCard, prefix: 'weather'},
        { element: document.body, prefix: 'body'},
        { element: document.getElementById('search-btn'), prefix: 'button'},
        { element: document.querySelector('h1'), prefix: 'h1'}
    ]

    const theme = Object.entries(weatherThemes).find(([_, config]) => 
        config.types.includes(type)
    );

    elements.forEach(({ element, prefix }) => {
        if (!element) return;

        Object.values(weatherThemes).forEach(config => {
            element.classList.remove(`${prefix}-${config.class}`);
        });

        if (theme) {
            const [_, themeConfig] = theme;
            element.classList.add(`${prefix}-${themeConfig.class}`);
        } 
    })
}
