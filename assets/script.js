const apiKey = 'b19addc5eb8a34a78630929ba78aaf39';

const cityInput = document.querySelector('#city-name');
const searchButton = document.querySelector('#search-button');

// Create a container element for the forecast data
const forecastContainer = document.createElement('div');
forecastContainer.id = 'forecast-container';
document.body.appendChild(forecastContainer);

// Create an array to hold the city names and a function to add new city names to the array
let cityHistory = [];

function addCityToHistory(city) {
  // Remove the city from the array if it is already in the array
  if (cityHistory.includes(city)) {
    cityHistory = cityHistory.filter(item => item !== city);
  }

  // If the array is already at maximum capacity, remove the oldest item
  if (cityHistory.length >= 5) {
    cityHistory.pop();
  }

  // Add the city to the beginning of the array
  cityHistory.unshift(city);

  // Update the city history display
  updateCityHistoryList();
}

function updateCityHistoryList() {
  // Get the city history list element
  const cityHistoryList = document.querySelector('#city-history-list');

  // Clear the list before adding new items
  cityHistoryList.innerHTML = '';

  // Loop through the cityHistory array
  for (let i = 0; i < cityHistory.length; i++) {
    // Create a new list item for the city
    const cityListItem = document.createElement('li');
    cityListItem.textContent = cityHistory[i];

    // Add a click event listener to the list item
    cityListItem.addEventListener('click', () => {
      // Update the value of the city input field
      cityInput.value = cityHistory[i];

      // Perform the search
      searchButton.click();
    });

    cityHistoryList.appendChild(cityListItem);
  }
}

// Check if there is stored data in localStorage
if (localStorage.getItem('cityHistory')) {
  // If there is, retrieve it and assign it to the cityHistory array
  cityHistory = JSON.parse(localStorage.getItem('cityHistory'));

  // Update the city history display
  updateCityHistoryList();
}

// Add a click event listener to the search button
searchButton.addEventListener('click', () => {
  // Remove the current weather data from the page
  const container = document.querySelector('#current-weather-container');
  if (container) {
    container.remove();
  }

  // Perform the search and display the new weather data
  const city = cityInput.value;
  addCityToHistory(city);

  // Store the updated cityHistory array in localStorage
  localStorage.setItem('cityHistory', JSON.stringify(cityHistory));

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

      // Append the container element to the body of the page
      document.body.insertBefore(container, forecastContainer);

      // Add the current weather data to the container element
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

  // Add the rest of the current weather data to the container element
  const windElement = document.createElement('p');
  windElement.textContent = `Wind: ${currentWindSpeed} mph`;
  container.appendChild(windElement);
  const humidityElement = document.createElement('p');
  humidityElement.textContent = `Humidity: ${currentHumidity}%`;
  container.appendChild(humidityElement);
  const timeZoneElement = document.createElement('p');
  timeZoneElement.textContent = `Time Zone: ${currentTimeZone}`;
  container.appendChild(timeZoneElement);

  // Get the forecast data for the next 5 days
  const forecastData = data.list.slice(1, 6);

  // Clear the forecast list
  while (forecastContainer.firstChild) {
    forecastContainer.removeChild(forecastContainer.firstChild);
  }

  // Add a forecast item for each day
  forecastData.forEach(day => {
    // Extract the relevant forecast data from the API response
    const forecastTemperature = day.main.temp;
    const forecastWindSpeed = day.wind.speed;
    const forecastHumidity = day.main.humidity;
    const forecastTime = day.dt_txt;
    const forecastIconCode = day.weather[0].icon;
    const forecastIconUrl = `http://openweathermap.org/img/wn/${forecastIconCode}@2x.png`;

    // Create the forecast item element
    const forecastItem = document.createElement('div');
    forecastItem.classList.add('forecast-item');

    // Add the forecast data to the forecast item element
    const forecastTimeElement = document.createElement('p');
    forecastTimeElement.textContent = forecastTime;
    forecastItem.appendChild(forecastTimeElement);

    const forecastIconElement = document.createElement('img');
    forecastIconElement.src = forecastIconUrl;
    forecastItem.appendChild(forecastIconElement);

    const forecastTemperatureElement = document.createElement('p');
    forecastTemperatureElement.textContent = `Temperature: ${forecastTemperature} C`;
    forecastItem.appendChild(forecastTemperatureElement);

    // Add the rest of the forecast data to the forecast item element
    const forecastWindElement = document.createElement('p');
    forecastWindElement.textContent = `Wind: ${forecastWindSpeed} mph`;
    forecastItem.appendChild(forecastWindElement);
const forecastHumidityElement = document.createElement('p');
forecastHumidityElement.textContent = `Humidity: ${forecastHumidity}%`;
forecastItem.appendChild(forecastHumidityElement);
    // Append the forecast item element to the forecast container element
    forecastContainer.appendChild(forecastItem);
  });
});
});