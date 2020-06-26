import React from 'react'

const CurrentWeather = ({ lat, lon, tempC, tempF, city, country, description }) => {
    return (
        <>
            <p className='text-center text-md uppercase absolute top-0 left-0 right-0 ml-auto mr-auto pt-2'>{city}, {country}</p>
            <p className='text-2xl font-bold'>{tempF}°</p>
            <p>{description}</p>
        </>
    )
}

export default CurrentWeather