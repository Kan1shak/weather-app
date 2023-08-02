/* eslint-disable no-console */
import './style.css';
import weatherApi from './getWeather';
import updateWeather from './displayController';

const initialData = weatherApi.getWeatherData('Sao Paulo');
initialData.then((response) => {
    updateWeather(response);
});

// event listener for search button
const searchButton = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');
searchButton.addEventListener('click',() => {
    const data = weatherApi.getWeatherData(searchInput.value);
    data.then((response) => {
        updateWeather(response);
    });
});

// event listener for enter key
searchInput.addEventListener('keyup',(event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchButton.click();
    }
}
);