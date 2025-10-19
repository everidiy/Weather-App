const API = '9e59e6d820dd438af0f4fb7386b27b5a';
const URLaddress = 'https://api.openweathermap.org/data/2.5/weather';


const cityInput = document.getElementById('city-input');
const searchBt = document.getElementById('search-btn');
const loading = document.getElementById('loading');
const errorMsg = document.getElementById('error-message');
const weatherCard = document.getElementById('weather-card');


const country = document.querySelector(".country");
const city = document.querySelector(".city");
const temp = document.querySelector(".temperature");
const description = document.querySelector(".weather-description");
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const feelsLike = document.getElementById('feelsLike');


const icon = document.getElementById("weather-icon");


function hideElement(elem) {
    elem.style.display = "none";
}
function showElement(elem) {
    elem.style.display = "block";
}
function showError() {
    hideElement(weatherCard)
    showElement(errorMsg)
}


searchBt.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city)
    }
})
cityInput.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city)
        }
    }
})

async function getWeather(city) {
    try {
        showElement(loading);
        hideElement(weatherCard);
        hideElement(errorMsg);

        const response = await fetch(`${URLaddress}?q=${city}&appid=${API}&units=metric`);

        if (!response.ok) {
            throw new Error('City not found :(')
        }

        const data = await response.json();

        if (data.cod && data.cod !== 200) {
            throw new Error(data.message || 'City not found :(')
        }

        updateUIData(data)
    } catch (error) {
        showError()
        console.log(error);
    } finally {
        hideElement(loading)
    }
}

function updateUIData(data) {
    country.textContent = `${data.sys.country}`;
    city.textContent = `${data.name}`;
    temp.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = `${data.weather[0].description}`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} m/s`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;

    const iconCode = data.weather[0].icon;
    icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    icon.alt = data.weather[0].description;

    const weatherType = data.weather[0].main;
    setWeatherTheme(weatherType)

    showElement(weatherCard)
}

window.addEventListener('DOMContentLoaded', () => {
    getWeather('Novosibirsk')
});

function setWeatherTheme(type) {
    const themes = {
        'Clear': { class: 'clear', types: ['Clear'] },
        'Rain': { class: 'rain', types: ['Rain', 'Drizzle'] },
        'Snow': { class: 'snow', types: ['Snow'] },
        'Clouds': { class: 'clouds', types: ['Clouds'] },
        'Mist': { class: 'mist', types: ['Mist', 'Haze', 'Fog'] },
        'Thunderstorm': { class: 'thunderstorm', types: ['Thunderstorm'] }
    }

    const elements = [
        { element: document.body, prefix: 'body' }, 
        { element: weatherCard, prefix: 'weather' }, 
        { element: document.querySelector("h1"), prefix: 'h1' }, 
        { element: document.getElementById('search-btn'), prefix: 'button' }
    ]

    const theme = Object.entries(themes).find(([_, config]) =>
        config.types.includes(type)
    );

    elements.forEach(({ element, prefix }) => {
        if (!element) return;

        Object.values(themes).forEach(config => {
            element.classList.remove(`${prefix}-${config.class}`)
        })

        if (theme) {
            const [_, themeConfig] = theme;
            element.classList.add(`${prefix}-${themeConfig.class}`)
        }
    })
}
