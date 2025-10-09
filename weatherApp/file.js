const API = '9e59e6d820dd438af0f4fb7386b27b5a';
const URL = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherCard = document.getElementById('weather-card');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');

const countryName = document.querySelector('.country');
const cityName = document.querySelector('.city');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const feelsLike = document.getElementById('feelsLike');
const weatherIcon = document.getElementById('weather-icon');

function hideElement(element) {
    element.style.display = "none";
}

function showElement (element) {
    element.style.display = "block";
}

async function getWeather(city) {
    try {
        showElement(loading)
        hideElement(weatherCard)
        hideElement(errorMessage)

        const response = await fetch(
            `${URL}?q=${city}&appid=${API}&units=metric&lang=ru`
        );

        if(!response.ok) {
            throw new Error("Город не найден :(")
        }

        const data = await response.json();

        updateWeatherUI(data)

    } catch (error) {
        showError();
        console.error("Ошибка", error);
    } finally {
        hideElement(loading)
    }
}

function updateWeatherUI(data) {
    countryName.textContent = `${data.sys.country}`;
    cityName.textContent = `${data.name}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} m/s`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;

    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    const weatherType = data.weather[0].main;

    setWeatherBackground(weatherType)
    setWeatherTheme(weatherType)
    setH1Theme(weatherType)
    setButtonTheme(weatherType)

    showElement(weatherCard)
}


function showError() {
    showElement(errorMessage)
    hideElement(weatherCard)
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city)
    }
})

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city)
        }
    }
})

window.addEventListener('load', () => {
    getWeather('Novosibirsk')
})

function setWeatherBackground(weatherType) {

    weatherCard.classList.remove(
        'weather-clear', 'weather-clouds', 'weather-rain', 
        'weather-snow', 'weather-thunderstorm', 'weather-drizzle', 'weather-mist'
    );

    switch(weatherType) {
        case 'Clear':
            weatherCard.classList.add('weather-clear');
            break;
        case 'Clouds':
            weatherCard.classList.add('weather-clouds');
            break;
        case 'Rain':
        case 'Drizzle':
            weatherCard.classList.add('weather-rain');
            break;
        case 'Snow':
            weatherCard.classList.add('weather-snow');
            break;
        case 'Thunderstorm':
            weatherCard.classList.add('weather-thunderstorm');
            break;
        case 'Mist':
        case 'Fog':
        case 'Haze':
            weatherCard.classList.add('weather-mist');
            break;
        default:
            weatherCard.style.background = 'linear-gradient(135deg, #648dc2 0%, #1b439a 100%)';
    }
}

function setWeatherTheme(weatherType) {
    const body = document.body;
    
    body.classList.remove(
        'body-clear', 'body-clouds', 'body-rain', 
        'body-snow', 'body-thunderstorm', 'body-mist'
    );
    
    switch(weatherType) {
        case 'Clear':
            body.classList.add('body-clear');
            break;
        case 'Clouds':
            body.classList.add('body-clouds');
            break;
        case 'Rain':
        case 'Drizzle':    
            body.classList.add('body-rain');
            break;
        case 'Snow':
            body.classList.add('body-snow');
            break;
        case 'Thunderstorm':
            body.classList.add('body-thunderstorm');
            break;
        case 'Mist':
        case 'Fog':
        case 'Haze':
            body.classList.add('body-mist');
            break;
        default:
            body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
}

function setH1Theme(weatherType) {
    const h1 = document.querySelector('h1');

    h1.classList.remove(
        'h1-clear', 'h1-clouds', 'h1-rain', 
        'h1-snow', 'h1-thunderstorm', 'h1-mist'
    );

    switch(weatherType) {
        case 'Clear':
            h1.classList.add('h1-clear');
            break;
        case 'Clouds':
            h1.classList.add('h1-clouds');
            break;
        case 'Rain':
        case 'Drizzle':
            h1.classList.add('h1-rain');
            break;
        case 'Snow':
            h1.classList.add('h1-snow');
            break;
        case 'Thunderstorm':
            h1.classList.add('h1-thunderstorm');
            break;
        case 'Mist':
        case 'Fog':
        case 'Haze':
            h1.classList.add('h1-mist');
            break;
        default:
            h1.style.background = 'rgba(255, 255, 255, 0.2)';
    }
}

function setButtonTheme(weatherType) {
    const button = document.getElementById('search-btn');

    button.classList.remove(
        'button-clear', 'button-clouds', 'button-rain', 
        'button-snow', 'button-thunderstorm', 'button-mist'
    );

    switch(weatherType) {
        case 'Clear':
            button.classList.add('button-clear');
            break;
        case 'Clouds':
            button.classList.add('button-clouds');
            break;
        case 'Rain':
        case 'Drizzle':
            button.classList.add('button-rain');
            break;
        case 'Snow':
            button.classList.add('button-snow');
            break;
        case 'Thunderstorm':
            button.classList.add('button-thunderstorm');
            break;
        case 'Mist':
        case 'Fog':
        case 'Haze':
            button.classList.add('button-mist');
            break;
        default:
            button.style.background = 'rgba(255, 255, 255, 0.2)';
    }
}