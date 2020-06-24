import React, { useEffect, useState } from 'react'

const Forecast = ({ lat, lon }) => {

    const API_KEY = process.env.REACT_APP_API_KEY

    const apicall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units='imperial'&exclude=minutely,hourly&appid=${API_KEY}`

    const [dailyWeather, setDailyWeather] = useState([])

    useEffect(() => {
        fetch(apicall)
        .then(response => response.json())
        .then(data => {
            setDailyWeather(data.daily)
        })

    },[apicall])

    return (
        <div>
            { 
                dailyWeather ? dailyWeather.map(weather => {
                    console.log(weather)
                    let convert = weather.dt 
                    const mili = convert * 1000
                    const dateObject = new Date(mili)
                    const days = dateObject.toLocaleDateString('en-US', {weekday: 'long'})
                    console.log(days)
                    return (
                        <div key={Math.random()}> {days} </div>
                    )
                }) : "Loading..."
            }
        </div>
    )
}

export default Forecast