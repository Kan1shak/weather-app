// get user's approx location from ipinfo using their ipaddress
const findCoords = async () => {
    const API_KEY = "d5b015f89f6135";
    const API_URL = "https://ipinfo.io/json?token=";
    const endpoint = `${API_URL}${API_KEY}`;
    let response = await fetch(endpoint, {mode:"cors"});
    response = await response.json();
    const location = response.city;
    return location;
}

export default findCoords;