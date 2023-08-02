import format from "date-fns/format";

// Container for the weather data
const weatherContainer = document.querySelector('.weather-container');

function selectImage (weatherCondition,aqi) {
    if (aqi > 4) {
        return 'smoke';
    }
    switch (weatherCondition) {
        case 'clear sky':
            return 'clearsky';
        case 'few clouds':
            return 'partlycloudy';
        case 'scattered clouds':
            return 'partlycloudy';
        case 'broken clouds':
            return 'cloudy';
        case "overcast clouds":
            return 'cloudy';
        case 'shower rain':
            return 'drizzle';
        case 'rain':
            return 'rain';
        case 'light rain':
            return 'drizzle';
        case 'moderate rain':
            return 'drizzle';
        case 'heavy intensity rain':
            return 'rain';
        case 'very heavy rain':
            return 'rain';
        case 'extreme rain':
            return 'rain';
        case 'freezing rain':
            return 'sleet';
        case 'light intensity shower rain':
            return 'drizzle';
        case 'heavy intensity shower rain':
            return 'rain';
        case 'ragged shower rain':
            return 'rain';
        case 'thunderstorm with light rain':
            return 'thunderstorm';
        case 'thunderstorm with rain':
            return 'thunderstorm';
        case 'thunderstorm with heavy rain':
            return 'thunderstorm';
        case 'light thunderstorm':
            return 'thunderstorm';
        case 'thunderstorm':
            return 'thunderstorm';
        case 'snow':
            return 'snow';
        case 'mist':
            return 'mist';
        case 'haze':
            return 'haze';
        default:
            return 'clearsky';
    }
}
function createImage (src) {
    const img = document.createElement('img');
    img.classList.add('bg-image');
    img.src = `./images/${src}.jpg`;
    return img;
}
const updateBg = (newImage) => {
    const imgContainer = document.querySelector('.bg-container');
    function switchImage(){
        try {
            document.querySelector('.previous').remove();
        } catch (error) {
            // console.log('No previous image');
        }   
        const prevImage = imgContainer.querySelector('.bg-image')
        imgContainer.appendChild(newImage);
        prevImage.style.zIndex = 1;

        prevImage.classList.add('fade-out');
        prevImage.classList.add('previous');

    };
    if (imgContainer.childElementCount >= 1) {
        switchImage(newImage);
    } else {
        imgContainer.appendChild(newImage);
    }
}

const showLoadingSpinner = () => {
        // Clearing weather container
        weatherContainer.textContent = '';
        // Show the loading spinner
        const loadingSpinner = document.querySelector('.lds-ring');
        loadingSpinner.style.display = 'inline-block';
}

const removeLoadingSpinner = () => {
    // Hide the loading spinner
    const loadingSpinner = document.querySelector('.lds-ring');
    loadingSpinner.style.display = 'none';
}

const updateWeather = async (data) => {
    // function to capitalize first letter of a string
    const capitalize = s => s && s[0].toUpperCase() + s.slice(1);
    // Loading background image
    const newImage = createImage(selectImage(data.weatherCondition.description,data.aqi));
    const imageLoaded = new Promise((resolve) => {
        newImage.addEventListener('load', () => {
            resolve();
        })
    });
    // Wait for the image to load before updating the weather data
    await imageLoaded;
    // update background image
    updateBg(newImage);
    // Convert country code to country name
    const regionNames = new Intl.DisplayNames(
        ['en'], {type: 'region'}
      );

    // Creating heading
    const location = document.createElement('h2');
    location.classList.add('location');
    const locationSplitted = data.locationClean.split(',');
    location.textContent = `${locationSplitted[0]}, ${regionNames.of(locationSplitted[1])}`;
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
    weatherCondition.textContent = `${data.weatherCondition.description.split(' ').map(capitalize).join(' ')}`;
    // Creating weather icon
    const weatherIcon = document.createElement('img');
    weatherIcon.classList.add('weather-icon');
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weatherCondition.icon}@4x.png`;    
    // Creating temperature
    const temperature = document.createElement('h2');
    temperature.classList.add('temperature');
    temperature.textContent = `${Math.round(data.mainData.temp)}°C`;
    // creating container for weather icon and temperature
    const tempIconContainer = document.createElement('div');
    tempIconContainer.classList.add('temp-icon-container');
    tempIconContainer.appendChild(weatherIcon);
    tempIconContainer.appendChild(temperature);
    // Creating feels like
    const feelsLike = document.createElement('h3');
    feelsLike.classList.add('feels-like');
    feelsLike.textContent = `Feels like: ${Math.round(data.mainData.feels_like)}°C`;

    // creating container for weather basic data
    const weatherBasicData = document.createElement('div');
    weatherBasicData.classList.add('weather-basic-data');
    // appending weather basic data to weather container
    weatherBasicData.appendChild(tempIconContainer);
    weatherBasicData.appendChild(weatherCondition);
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
    // Hide the loading spinner
    removeLoadingSpinner();
}

export default updateWeather;
export {showLoadingSpinner, removeLoadingSpinner};