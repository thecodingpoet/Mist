import  { getWeatherInCelcius, getWeatherInFahrenheit } from './modules/weather';
import { getTime } from './modules/time';

const main = () => {
  const locations = ['lagos', 'New York', 'Pittsburgh', 'Tokyo', 'Berlin', 'Ontario'];
  console.log('Fetching...\n');
  locations.forEach(async (location) => {
    const weatherInCelcius = await getWeatherInCelcius(location);
    const weatherInFahrenheit = await getWeatherInFahrenheit(location);
    const time = await getTime(location);
    console.log(`The temperature at ${location} is ${weatherInCelcius} celcius and ${weatherInFahrenheit} fahrenheit`)
    console.log(`The time is ${time} \n`)
  });
}

main();
