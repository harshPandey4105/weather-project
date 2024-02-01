import React, { useState } from 'react';
import './App.css';
const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const API_KEY = '6e57a628da7bd09a8256b2aab4901757';
    const API_URL = 'https://api.openweathermap.org/data/2.5/weather?';

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`${API_URL}units=metric&q=${city}&appid=${API_KEY}`);
            const data = await response.json();

            if (response.ok) {
                setWeatherData(data);
            } else {
                console.error('Error fetching weather data:', data.message);
                setWeatherData(null);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error.message);
            setWeatherData(null);
        }
    };

    return (
        <div className='weather-section'>
            <h2>Weather App</h2>
            
                <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder='Enter City'
                />
                <button onClick={fetchWeatherData}>Get</button>
            

            {weatherData && (
                <div>
                    <h3>Weather in {weatherData.name}, {weatherData.sys.country}</h3>
                    <p>Temperature: {weatherData.main.temp} &#8451;</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
