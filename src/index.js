/* eslint-disable no-console */
import './style.css';
import weatherApi from './getWeather';

const data = weatherApi.getWeatherData('Niagra');
data.then((response) => {
    console.log(response);
});