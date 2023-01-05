const apiKey = 'b19addc5eb8a34a78630929ba78aaf39';

const cityInput = document.querySelector('#city-name');
const searchButton = document.querySelector('#search-button');

// Create a container element for the forecast data
const forecastContainer = document.createElement('div');
forecastContainer.id = 'forecast-container';
document.body.appendChild(forecastContainer);

searchButton.addEventListener('click', () => {
  // Get the city name from the input field
  const city = cityInput.value;

  const apiEndpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  // Make the API request
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

      // Update the DOM elements with the current weather data
      const cityNameElement = document.createElement('h2');
      cityNameElement.textContent = `${city}`;
      document.body.appendChild(cityNameElement);

      const dateElement = document.createElement('h3');
      const today = new Date();
      const month = today.getMonth();
      const date = today.getDate();
      const year = today.getFullYear();
      dateElement.textContent = `${month}/${date}/${year}`;
      document.body.appendChild(dateElement);

      const iconElement = document.createElement('img');
      iconElement.src = iconUrl;
      document.body.appendChild(iconElement);

      const temperatureElement = document.createElement('p');
      temperatureElement.textContent = `Temperature: ${currentTemperature} C`;
      document.body.appendChild(temperatureElement);
      const windElement = document.createElement('p');
      windElement.textContent = `Wind: ${currentWindSpeed} mph`;
      document.body.appendChild(windElement);
      const humidityElement = document.createElement('p');
      humidityElement.textContent = `Humidity: ${currentHumidity}%`;
      document.body.appendChild(humidityElement);
      const timeZoneElement = document.createElement('p');
      timeZoneElement.textContent = `Time Zone: ${currentTimeZone}`;
      document.body.appendChild(timeZoneElement);

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
});
});

