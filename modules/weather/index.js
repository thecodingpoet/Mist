import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

export const getWeatherInKelvin = async location => { 
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_APP_ID}`)
    return response.data.main.temp
  } catch (error) {
    return error.response.data.message
  }
}

export const getWeatherInCelcius = async location => {
  const weatherInKelvin = await getWeatherInKelvin(location)
  const weatherInCelcius = weatherInKelvin - 273.15
  return Math.round(weatherInCelcius)
}

export const getWeatherInFahrenheit = async location => {
  const weatherInCelcius = await getWeatherInCelcius(location)
  const weatherInFahrenheit = Math.floor(weatherInCelcius * (9/5) + 32)
  return Math.round(weatherInFahrenheit)
}
