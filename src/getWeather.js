import addSeconds from 'date-fns/addSeconds'

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
        const endpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;
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
        const coordinatesClean = weather.coord;
        const weatherCondition = weather.weather[0];
        const mainData = weather.main;
        const locationClean = `${coordinates.name},${coordinates.country}`;
        const {country} = weather.sys;
        const {timezone} = weather;
        const date = new Date();
        const dateAdjusted = addSeconds(addSeconds(date,timezone),date.getTimezoneOffset() * 60);
        const {sunrise} = weather.sys;
        const {sunset} = weather.sys;
        const  {aqi} = pollution.list[0].main;
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
            aqi
        }
    }

    const getWeatherData = async (location) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const coords = await getCoords(location);
            const weather = getWeather(coords);
            const pollution = getPollution(coords);
            return Promise.all([weather,pollution]).then((values) => cleanResponse(values[0],values[1]));
        } catch (error) {
            throw error;
        }
    }
    return {getWeatherData};
})();
    

export default weatherApi;