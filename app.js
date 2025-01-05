// API key (OpenWeather)
const apiKey = "b1b15e88fa797225412429c1c50c122a1";

// Function to fetch weather data
async function fetchWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
      throw new Error("City not found"); // Error handling if city is not valid
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error); // Print error message if there is an issue
    return null; // Return null if error occurs
  }
}

// Function to display weather data on the webpage
async function getWeather() {
  const city = document.getElementById("city").value; // Get city name from input field
  const weatherData = await fetchWeather(city); // Fetch weather data for the city

  const weatherInfoDiv = document.getElementById("weather-info");

  if (weatherData) {
    // Display weather data
    weatherInfoDiv.innerHTML = `
      <h3>Weather in ${weatherData.name}</h3>
      <p>Temperature: ${weatherData.main.temp}°C</p>
      <p>Weather: ${weatherData.weather[0].description}</p>
      <p>Humidity: ${weatherData.main.humidity}%</p>
    `;
  } else {
    // Display error message if data is null
    weatherInfoDiv.innerHTML = `<p>Could not fetch weather data. Please try again.</p>`;
  }
}
