import React, { useState, useEffect } from 'react';
import Forecast from './components/Forecast'
import CurrentWeather from './components/CurrentWeather'
import './styles/app.css'

const App = () => {

  const API_KEY = process.env.REACT_APP_API_KEY

  const [weatherInfo, setWeatherInfo] = useState({
    lat: undefined,
    lon: undefined,
    tempC: undefined,
    tempF: undefined,
    city: undefined,
    country: undefined,
    description: undefined,
  })

  const [coords, setCoords] = useState({})

  useEffect(() => {
    if (navigator.geolocation){
      getPosition()
          .then((position) => {
              getWeather(position.coords.latitude, position.coords.longitude)
              setCoords({
                lat: position.coords.latitude,
                lon: position.coords.longitude
              })
          })
          .catch((err) => {
              getWeather(40.71,-74.01)
          })
    } else {
        alert('Geolocation not available')
    }
  }, [])

  const getPosition = (options) => {
    return new Promise(function (resolve,reject) { 
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
    })
  }

  const getWeather = async (lat, lon) => {
    const apicall = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${API_KEY}`
    )
    const data = await apicall.json()
    setWeatherInfo({
      lat: lat,
      lon: lon,
      tempC: Math.round(data.main.temp),
      tempF: Math.floor(data.main.temp * 1.8 + 32),
      city: data.name,
      country: data.sys.country,
      description: data.weather[0].main
    }) 
  }

  const { lat, lon, tempC, tempF, city, country, description } = weatherInfo
  

  console.log(coords)


  let weatherData = weatherInfo ? (
    <>
      <div className='flex flex-wrap justify-center items-center text-center '>
        <div className='pt-4 min-h-screen text-red-900'>
          <div className='flex flex-col'>
            <div className='border border-red-500 relative p-12 text-center'>
              <CurrentWeather 
                lat={lat}
                lon={lon}
                tempC={tempC}
                tempF={tempF}
                city={city}
                country={country}
                description={description}
              />
            </div>
            <div className='border border-red-500 bg-white p-12'>
              <Forecast 
                lat={lat}
                lon={lon}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  ) : <> </>
  return (
    <div>
      {weatherData}
    </div>
  );
}

export default App;
