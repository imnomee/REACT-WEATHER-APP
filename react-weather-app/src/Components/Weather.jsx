import './Weather.css';
import clear from '../assets/clear.png';
import cloud from '../assets/cloud.png';
import drizzle from '../assets/drizzle.png';
import humidity from '../assets/humidity.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';
import wind from '../assets/wind.png';
import { useEffect, useRef, useState } from 'react';

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);
    const allIcons = {
        '01d': clear,
        '01n': clear,
        '02d': cloud,
        '02n': cloud,
        '03d': cloud,
        '03n': cloud,
        '04d': drizzle,
        '04n': drizzle,
        '09d': rain,
        '09n': rain,
        '10d': rain,
        '10n': rain,
        '13d': snow,
        '13n': snow,
    };
    const search = async (city = 'Rawalpindi') => {
        if (city === '' || !city) {
            alert('Enter City Name:');
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
                import.meta.env.VITE_API_KEY
            }`;
            const response = await fetch(url);
            if (!response.ok) {
                alert(response.status);
                return;
            }
            const data = await response.json();
            const icon = allIcons[data.weather[0].icon] || clear;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temp: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            });
            inputRef.current.value = '';
        } catch (err) {
            console.log(err);
            setWeatherData(false);
        }
    };
    useEffect(() => {
        search();
    }, []);

    return (
        <div className="weather">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search City..."
                    ref={inputRef}
                />
                <i
                    className="fa-solid fa-magnifying-glass search-icon"
                    onClick={() => search(inputRef.current.value)}></i>
            </div>
            {weatherData ? (
                <>
                    <img
                        src={weatherData.icon}
                        alt={weatherData.icon}
                        className="weather-icon"
                    />
                    <p className="temperature">{weatherData.temp}°c</p>
                    <p className="location">{weatherData.location}</p>
                    <div className="weather-data">
                        <div className="col">
                            <img src={humidity} alt="humidity" />
                            <div>
                                <p>{weatherData.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind} alt="wind" />
                            <div>
                                <p>{weatherData.windSpeed} Km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Weather;
