const apiKey = 'b19addc5eb8a34a78630929ba78aaf39';

const cityInput = document.querySelector('#city-name');
const searchButton = document.querySelector('#search-button');

//Create a container element for the forecast data
const forecastContainer = document.createElement('div');
forecastContainer.id = 'forecast-container';
document.body.appendChild(forecastContainer);

// Create an array to hold the city names and a function to add new city names to the array
const cityHistory = [];

function addCityToHistory(city) {
  cityHistory.push(city);
}

searchButton.addEventListener('click', () => {
  // Remove the current weather data from the page
  const container = document.querySelector('#current-weather-container');
  if (container) {
    container.remove();
  }

  // Perform the search and display the new weather data
  const city = cityInput.value;
  addCityToHistory(city);

  const apiEndpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
      // Extract the relevant weather data from the API response
      const currentTemperature = data.list[0].main.temp;
      const currentWindSpeed = data.list[0].wind.speed;
      const currentHumidity = data.list[0].main.humidity;
      const currentTimeZone = data.city.timezone;
      const iconCode = data.list[0].weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

      // Create the container element for the current weather data
      const container = document.createElement('div');
      container.id = 'current-weather-container';

      // Create the DOM elements for the current weather data
      const cityNameElement = document.createElement('h2');
      cityNameElement.textContent = `${city}`;
      container.appendChild(cityNameElement);

      const dateElement = document.createElement('h3');
      const today = new Date();
      const month = today.getMonth();
      const date = today.getDate();
      const year = today.getFullYear();
      dateElement.textContent = `${month}/${date}/${year}`;
      container.appendChild(dateElement);

      const iconElement = document.createElement('img');
      iconElement.src = iconUrl;
      container.appendChild(iconElement);

      const temperatureElement = document.createElement('p');
      temperatureElement.textContent = `Temperature: ${currentTemperature} C`;
      container.appendChild(temperatureElement);
      const windElement = document.createElement('p');
      windElement.textContent = `Wind: ${currentWindSpeed} mph`;
      container.appendChild(windElement);
      const humidityElement = document.createElement('p');
      humidityElement.textContent = `Humidity: ${currentHumidity}%`;
      container.appendChild(humidityElement);
      const timeZoneElement = document.createElement('p');
      timeZoneElement.textContent = `Time Zone: ${currentTimeZone}`;
      container.appendChild(timeZoneElement);

      // Append the container element to the body of the page
      document.body.appendChild(container);

      // Get the forecast data for the next 5 days
      const forecastData = data.list.slice(1, 6);

      // Clear the forecast list
      const forecastContainer = document.querySelector('#forecast-container');
      while (forecastContainer.firstChild) {
        forecastContainer.removeChild(forecastContainer.firstChild);
      }

      // Add a forecast item for each day
      const forecastList = document.createElement('ul');
      forecastData.forEach(day => {
        const forecastItem = document.createElement('li');

        // Extract the forecast data for the day
        const forecastDate = day.dt_txt;
        const forecastIconCode = day.weather[0].icon;
        const forecastIconUrl = `http://openweathermap.org/img/wn/${forecastIconCode}@2x.png`;
        const forecastTemperature = day.main.temp;
        const forecastWindSpeed = day.wind.speed;
        const forecastHumidity = day.main.humidity;

        // Create the DOM elements for the forecast data
        const forecastDateElement = document.createElement('h4');
        forecastDateElement.textContent = forecastDate;
        forecastItem.appendChild(forecastDateElement);

        const forecastIconElement = document.createElement('img');
        forecastIconElement.src = forecastIconUrl;
        forecastItem.appendChild(forecastIconElement);

        const forecastTemperatureElement = document.createElement('p');
        forecastTemperatureElement.textContent = `Temperature: ${forecastTemperature} C`;
        forecastItem.appendChild(forecastTemperatureElement);

        const forecastWindElement = document.createElement('p');
        forecastWindElement.textContent = `Wind: ${forecastWindSpeed} mph`;
        forecastItem.appendChild(forecastWindElement);

        const forecastHumidityElement = document.createElement('p');
        forecastHumidityElement.textContent = `Humidity: ${forecastHumidity}%`;
        forecastItem.appendChild(forecastHumidityElement);

        forecastList.appendChild(forecastItem);
      });
      forecastContainer.appendChild(forecastList);

      // Create a div element to hold the city history list
      const historyContainer = document.createElement('div');
      historyContainer.id = 'history-container';
      document.body.appendChild(historyContainer);

      // Create the city history list
      const cityHistoryList = document.createElement('ul');
      cityHistory.forEach(city => {
        const cityHistoryItem = document.createElement('li');
        cityHistoryItem.textContent = city;
        cityHistoryList.appendChild(cityHistoryItem);
      });
      historyContainer.appendChild(cityHistoryList);
    });
});