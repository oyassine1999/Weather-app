const apiKey = 'b19addc5eb8a34a78630929ba78aaf39';

const cityInput = document.querySelector('#city-name');
const searchButton = document.querySelector('#search-button');

// Create a container element for the forecast data
const forecastContainer = document.createElement('div');
forecastContainer.id = 'forecast-container';
document.body.appendChild(forecastContainer);

// Create an array to hold the city names and a function to add new city names to the array
const cityHistory = [];

function addCityToHistory(city) {
  // Only add the city if it's not already in the array
  if (!cityHistory.includes(city)) {
    cityHistory.unshift(city);
  }

  // Keep the array limited to a maximum of 5 items
  if (cityHistory.length > 5) {
    cityHistory.pop();
  }
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

        // Add the forecast data to the list item
        forecastItem.innerHTML = `
          <div>${forecastDate}</div>
          <img src="${forecastIconUrl}"/>
          <div>Temperature: ${forecastTemperature} C</div>
          <div>Wind: ${forecastWindSpeed} mph</div>
          <div>Humidity: ${forecastHumidity}%</div>
        `;

        // Append the list item to the forecast list
        forecastList.appendChild(forecastItem);
      });

      // Append the forecast list to the forecast container
      forecastContainer.appendChild(forecastList);
    });

  // Update the history list
  const historyList = document.querySelector('#city-history-list');
  while (historyList.firstChild) {
    historyList.removeChild(historyList.firstChild);
  }
  cityHistory.forEach(city => {
    const listItem = document.createElement('li');
    listItem.textContent = city;
    historyList.appendChild(listItem);
  });
});

const historyList = document.querySelector('#city-history-list');
historyList.addEventListener('click', event => {
  // Check if the clicked element is a list item
  if (event.target.tagName === 'LI') {
    // Get the city name from the list item
    const city = event.target.textContent;

    // Update the city input field and perform the search
    cityInput.value = city;
    searchButton.click();
  }
});