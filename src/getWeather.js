import addSeconds from 'date-fns/addSeconds'
import delpoyToast from './toast';
import { showLoadingSpinner, removeLoadingSpinner } from './displayController';

const weatherApi = (() =>{
    const API_KEY = 'a669c41a379a2268b8a899d5ae1e5b3f';
    const API_URL = 'https://api.openweathermap.org/data/2.5/';
    const UNITS = 'metric';
    let coordinates;
    async function getWeather(coords) {
        const endpoint = `${API_URL}weather?lat=${coords.lat}&lon=${coords.lon}&units=${UNITS}&appid=${API_KEY}`;
        let response = await fetch(endpoint, {mode: "cors"});
        response = await response.json();
        return response;
    }

    async function getCoords(location='london'){
        const endpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;
        let response = await fetch(endpoint, {mode:"cors"});
        response = await response.json();
        if (response.length === 0) {
            throw new Error('Location not found');
        }
        coordinates = {
            lat:response[0].lat, 
            lon:response[0].lon,
            name:response[0].name,
            country:response[0].country,
            state:response[0].state,
            };
        return coordinates;
    };

    async function getPollution(coords){
        const endpoint = `${API_URL}air_pollution?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`;
        let response = await fetch(endpoint, {mode:"cors"});
        response = await response.json();
        return response;
    }

    function cleanResponse(weather,pollution){
        const adjustTimeZone = (date,timezone) => {
            const dateAdjusted = addSeconds(addSeconds(date,timezone),date.getTimezoneOffset() * 60);
            return dateAdjusted;
        }
        const coordinatesClean = weather.coord;
        const weatherCondition = weather.weather[0];
        const mainData = weather.main;
        const locationClean = `${coordinates.name},${coordinates.country}`;
        const {country} = weather.sys;
        const {timezone} = weather;
        const dateAdjusted = adjustTimeZone(new Date(),timezone);
        const sunrise = adjustTimeZone(new Date(weather.sys.sunrise * 1000),timezone);
        const sunset = adjustTimeZone(new Date(weather.sys.sunset * 1000),timezone);
        const {aqi} = pollution.list[0].main;
        const rainChance = weather.clouds.all; 
        return {
            coords : coordinatesClean,
            weatherCondition,
            mainData,
            date: dateAdjusted,
            locationClean,
            country,
            timezone,
            sunrise,
            sunset,
            aqi,
            rainChance,
        }
    }

    const getWeatherData = async (location) => {
        // eslint-disable-next-line no-useless-catch
        try {
            showLoadingSpinner();
            const coords = await getCoords(location);
            const weather = getWeather(coords);
            const pollution = getPollution(coords);
            return Promise.all([weather,pollution]).then((values) => cleanResponse(values[0],values[1]));
        } catch (error) {
            delpoyToast('Location not found!', 'error');
            removeLoadingSpinner();
            throw error;
        }
    }
    return {getWeatherData};
})();
    

export default weatherApi;