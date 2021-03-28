import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.min.css'

import Weather from './components/Weather'
import SearchForm from './components/SearchForm'
import {useState} from 'react'

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [temperature, setTemperature] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [icon, setIcon] = useState('');

  const weatherIcons = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog"
  }

  const getWeatherIcon = (weatherIcons, weatherId) => {
    switch(true) {
      case weatherId >= 200 && weatherId <= 232:
        setIcon(weatherIcons.Thunderstorm);
        break;
      case weatherId >= 300 && weatherId <= 321:
        setIcon(weatherIcons.Drizzle);
        break;
      case weatherId >= 500 && weatherId <= 531:
        setIcon(weatherIcons.Rain);
        break;
      case weatherId >= 600 && weatherId <= 622:
        setIcon(weatherIcons.Snow);
        break;
      case weatherId >= 701 && weatherId <= 781:
        setIcon(weatherIcons.Atmosphere);
        break;
      case weatherId === 800:
        setIcon(weatherIcons.Clear);
        break;
      default:
        setIcon(weatherIcons.Clouds);
    }
  }

  const getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if(city && country) {
      const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`)
    
      const response = await apiCall.json();
      
      setStatus(response.cod);

      if(response.cod === "404") {
        return;
      }

      setCity(response.name);
      setCountry(response.sys.country);
      setTemperature(response.main.temp);
      setDescription(response.weather[0].description);
      getWeatherIcon(weatherIcons, response.weather[0].id);
    } else {
      setCity('');
      setCountry('');
      showError();
    }
  }

  const showError = () => {
    const errorMessage = (status === "404") ? 'Invalid city/country code entered. Please try again. ' : 'Please enter a city and country code.';
    
    return (
      <div className="text-center alert alert-danger my-3">
          {errorMessage}
      </div>
    )
  }

  return (
    
    <div className="App">
      <div className="container">
          <div className="row justify-content-center">
            <div className="col-8 weather-col">
              <h1 className="py-2 text-center weather-title">Weather Tracker</h1>
              <SearchForm onSearch={getWeather} />
              {status === 200 ? <Weather 
                city={city} 
                country={country}
                temperature={temperature}
                description={description}
                status={status}
                weatherIcon={icon}
                /> : showError()}
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
