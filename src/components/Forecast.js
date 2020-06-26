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
        <div className=''>
            { 
                dailyWeather ? dailyWeather.map((weather, index) => {
                    const icons = weather.weather[0].icon
                    const iconLink = `http://openweathermap.org/img/wn/${icons}@2x.png`
                    const convertF = Math.round(weather.temp.day * (9/5) - 459.67)
                    let convert = weather.dt 
                    const mili = convert * 1000
                    const dateObject = new Date(mili)
                    const days = dateObject.toLocaleDateString('en-US', {weekday: 'long'})
                    
                        return (
                            <>
                                <div className='flex flex-row justify-end text-gray-600 text-sm'>
                                    <div className='pt-2 pr-5'> {days} </div>
                                    <div className='pt-2 ml-8 font-bold'> {convertF}°</div>
                                    <img className='h-10 w-10 ml-2 mb-2' src={iconLink} alt='weathericons'/>
                                </div>
                            </>
                        )
                }) : "Loading..."
            }
        </div>
    )
}

export default Forecast