import axios from 'axios';

export const getTime = async (location) => {
  try {
    const coordinates = await getCoordinates(location);
    const { lng, lat } = coordinates.data.results[0].geometry.location;
    return await getLocalTime(lng, lat);
  } catch (error) {
    return error.response.data.status;
  }
}

const getCoordinates = async (location) => {
  return await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyCVN0JPNWyFKvKukP43GHkDQmveWIOUn40`);
}

const getTimezone = async (lng, lat, timestamp) => {
  return await axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=AIzaSyCVN0JPNWyFKvKukP43GHkDQmveWIOUn40`);
}

const getLocalTime = async (lng, lat) => {
  const targetDate = new Date();
  const timestamp = targetDate.getTime()/1000 + targetDate.getTimezoneOffset() * 60;
  const timezone = await getTimezone(lng, lat, timestamp);
  const offsets = timezone.data.dstOffset * 1000 + timezone.data.rawOffset * 1000;
  const localTime = new Date(timestamp * 1000 + offsets);
  return localTime.toLocaleString();
}
