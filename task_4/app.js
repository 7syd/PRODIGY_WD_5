document.getElementById('fetch-weather').addEventListener('click', async () => {
    const locationInput = document.getElementById('location-input');
    const locationName = locationInput.value.trim();

    if (locationName) {
        const apiKey = '8b0b184b55c4eefeffa98c05bf50c561';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === '404') {
                alert('Location not found. Please try again.');
                return;
            }

            displayWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('An error occurred while fetching the weather data. Please try again.');
        }
    } else {
        alert('Please enter a location.');
    }
});

function displayWeatherData(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('temperature').textContent = data.main.temp.toFixed(1);
    document.getElementById('feels-like').textContent = data.main.feels_like.toFixed(1);
    document.getElementById('conditions').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind').textContent = data.wind.speed.toFixed(1);

    const windDegrees = data.wind.deg;
    const windDirection = getWindDirection(windDegrees);
    document.getElementById('wind-direction').textContent = windDirection;

    const sunriseTimestamp = data.sys.sunrise;
    const sunriseTime = formatTime(sunriseTimestamp);
    document.getElementById('sunrise').textContent = sunriseTime;

    const sunsetTimestamp = data.sys.sunset;
    const sunsetTime = formatTime(sunsetTimestamp);
    document.getElementById('sunset').textContent = sunsetTime;
}

function getWindDirection(degrees) {
    const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
    const index = Math.round((degrees / 45) % 8);
    return directions[index];
}

function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}