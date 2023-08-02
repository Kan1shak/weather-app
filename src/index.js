/* eslint-disable no-console */
import './style.css';
import weatherApi from './getWeather';
import updateWeather from './displayController';
import delpoyToast from './toast';
import findCoords from './ipApi';

async function intialWeather() {
    let approxLoc;
    try {
        approxLoc = await findCoords();
    }
    catch (error) {
        // if ipinfo fails, default to 
        approxLoc = 'Bhopal';
    }
    const initialData = await weatherApi.getWeatherData(approxLoc);
    updateWeather(initialData);
}

// event listener for search button
const searchButton = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');
searchButton.addEventListener('click',() => {
    if (searchInput.value !== ''){
        const data = weatherApi.getWeatherData(searchInput.value);
        data.then((response) => {
            updateWeather(response);
        });
    } else {
        delpoyToast('Please enter a location!', 'error');
    }
});

// event listener for enter key
searchInput.addEventListener('keyup',(event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchButton.click();
    }
}
);

// load initial weather based on user's location
intialWeather();