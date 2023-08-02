import format from "date-fns/format";

// Container for the weather data
const weatherContainer = document.querySelector('.weather-container');

const updateWeather = (data) => {
    // Clearing weather container
    weatherContainer.textContent = '';

    // Creating heading
    const location = document.createElement('h2');
    location.classList.add('location');
    location.textContent = `${data.locationClean}`;
    // Creating current time
    const currentTime = document.createElement('h3');
    currentTime.classList.add('current-time');
    currentTime.textContent = `${format(data.date,'EEEE, d MMMM yyyy HH:mm')}`;
    // creating div for heading and current time
    const heading = document.createElement('div');
    heading.classList.add('heading');
    // appending heading and current time to heading div
    heading.appendChild(location);
    heading.appendChild(currentTime);

    // Creating weather condition
    const weatherCondition = document.createElement('h3');
    weatherCondition.classList.add('weather-condition');
    weatherCondition.textContent = `${data.weatherCondition.description.toUpperCase()}`;
    // Creating weather icon
    const weatherIcon = document.createElement('img');
    weatherIcon.classList.add('weather-icon');
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weatherCondition.icon}.png`;
    // Creating temperature
    const temperature = document.createElement('h2');
    temperature.classList.add('temperature');
    temperature.textContent = `${Math.round(data.mainData.temp)}°C`;
    // Creating feels like
    const feelsLike = document.createElement('h3');
    feelsLike.classList.add('feels-like');
    feelsLike.textContent = `Feels like: ${Math.round(data.mainData.feels_like)}°C`;

    // creating container for weather basic data
    const weatherBasicData = document.createElement('div');
    weatherBasicData.classList.add('weather-basic-data');
    // appending weather basic data to weather container
    weatherBasicData.appendChild(weatherCondition);
    weatherBasicData.appendChild(weatherIcon);
    weatherBasicData.appendChild(temperature);
    weatherBasicData.appendChild(feelsLike);

    // create container for more weather data
    const moreWeatherData = document.createElement('div');
    moreWeatherData.classList.add('more-weather-data');

    // create function to create box with weather data
    const createWeatherBox = (title,value,unit) => {
        const box = document.createElement('div');
        box.classList.add('box');
        const boxTitle = document.createElement('h4');
        boxTitle.classList.add('box-title');
        boxTitle.textContent = title;
        const boxValue = document.createElement('h3');
        boxValue.classList.add('box-value');
        boxValue.textContent = `${value}${unit}`;
        box.appendChild(boxTitle);
        box.appendChild(boxValue);
        return box;
    }

    // create humidity box
    const humidityBox = createWeatherBox('Humidity',data.mainData.humidity,'%');
    // create pressure box
    const pressureBox = createWeatherBox('Pressure',data.mainData.pressure,'mBar');
    // create sunrise box
    const sunriseBox = createWeatherBox('Sunrise',format(data.sunrise,'HH:mm'),'');
    // create sunset box
    const sunsetBox = createWeatherBox('Sunset',format(data.sunset,'HH:mm'),'');
    // create air quality box
    const airQualityBox = createWeatherBox('AQI',data.aqi,'');
    // create max temperature box
    const maxTempBox = createWeatherBox('Max',Math.round(data.mainData.temp_max),'°C');
    // create min temperature box
    const minTempBox = createWeatherBox('Min',Math.round(data.mainData.temp_min),'°C');
    // create rain chance box
    const rainChanceBox = createWeatherBox('Rain Chance',`${data.rainChance}%`,'');

    // appending boxes to more weather data container
    moreWeatherData.appendChild(humidityBox);
    moreWeatherData.appendChild(pressureBox);
    moreWeatherData.appendChild(maxTempBox);
    moreWeatherData.appendChild(minTempBox);
    moreWeatherData.appendChild(sunriseBox);
    moreWeatherData.appendChild(sunsetBox);
    moreWeatherData.appendChild(rainChanceBox);
    moreWeatherData.appendChild(airQualityBox);

    // appending heading, weather basic data and more weather data to weather container
    weatherContainer.appendChild(heading);
    weatherContainer.appendChild(weatherBasicData);
    weatherContainer.appendChild(moreWeatherData);
}

export default updateWeather;